import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { INTEREST_VALUES } from "@/lib/plans";

const intakeSchema = z.object({
  contactName: z.string().trim().min(2, "Name is required").max(100),
  companyName: z.string().trim().min(2, "Company name is required").max(120),
  email: z.email("Valid email required").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  interest: z.enum(INTEREST_VALUES),
  crewSize: z.number().int().min(1).max(500),
  paperworkHours: z.number().min(0).max(80),
  disconnectedApps: z.number().int().min(0).max(20),
  estimatedMonthlyCost: z.number().min(0).max(1_000_000),
});

const newReferenceId = () => `DSIE-${Date.now().toString(36).toUpperCase()}`;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Malformed payload" }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field. Pretend success, drop the bot.
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
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "unknown",
    ip: req.headers.get("cf-connecting-ip") || "unknown",
  };

  // TODO: deliver leads somewhere durable (email, CRM, or Cloudflare D1). Today they only reach Worker logs.
  console.log("[DSIE INTAKE]:", JSON.stringify(lead));

  return NextResponse.json({ success: true, referenceId });
}
