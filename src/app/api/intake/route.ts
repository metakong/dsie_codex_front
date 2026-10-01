import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const auditIntakeSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  headcount: z.number().min(1),
  primarySoftware: z.string().min(2),
  weeklyHuddleHours: z.number().min(0),
  calculatedLeakage: z.number(),
  frictionScore: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = auditIntakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    // Edge-ready ingest: Ready for Cloudflare D1 / Basin integration
    const telemetryPayload = {
      ...parsed.data,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "unknown",
      ip: req.headers.get("cf-connecting-ip") || "127.0.0.1",
    };

    console.log("[DSIE INTAKE TELEMETRY]:", JSON.stringify(telemetryPayload));

    return NextResponse.json({
      success: true,
      message: "Diagnostic telemetry ingested. Fiduciary audit generated.",
      auditId: `DSIE-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Malformed payload" },
      { status: 500 }
    );
  }
}
