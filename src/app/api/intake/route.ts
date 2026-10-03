import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateTotalMonthlyCost, sanitizeSelectedModules } from "@/lib/plans";

const intakeSchema = z
  .object({
    contactName: z.string().trim().min(2, "Name is required").max(100),
    companyName: z.string().trim().min(2, "Company name is required").max(120),
    email: z.string().email("Valid email required").max(200),
    phone: z.string().trim().max(30).optional().default(""),
    selectedModules: z.array(z.string()).min(1, "At least Base Retainer must be selected"),
    crewSize: z.number().int().min(1).max(500),
    paperworkHours: z.number().min(0).max(80),
    disconnectedApps: z.number().int().min(0).max(20),
    estimatedMonthlyCost: z.number().min(0).max(1_000_000),
    interest: z.string().optional(),
  })
  .refine(
    (data) => {
      const sanitized = sanitizeSelectedModules(data.selectedModules);
      return sanitized.includes("base-retainer");
    },
    {
      message: "Base Access Retainer ($99/mo) is required.",
      path: ["selectedModules"],
    }
  )
  .refine(
    (data) => {
      const expectedCost = calculateTotalMonthlyCost(data.selectedModules);
      return Math.abs(data.estimatedMonthlyCost - expectedCost) <= 5;
    },
    {
      message: "Monthly total does not match selected modules.",
      path: ["estimatedMonthlyCost"],
    }
  );

const newReferenceId = () => `DSIE-${Date.now().toString(36).toUpperCase()}`;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Malformed payload" }, { status: 400 });
  }

  // Honeypot check
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ success: true, referenceId: newReferenceId() });
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  const referenceId = newReferenceId();
  const lead = {
    referenceId,
    ...parsed.data,
    sanitizedModules: sanitizeSelectedModules(parsed.data.selectedModules),
    calculatedTotal: calculateTotalMonthlyCost(parsed.data.selectedModules),
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "unknown",
    ip: req.headers.get("cf-connecting-ip") || "unknown",
  };

  console.log("[DSIE INTAKE - MODULAR LEAD]:", JSON.stringify(lead));

  return NextResponse.json({ success: true, referenceId });
}
