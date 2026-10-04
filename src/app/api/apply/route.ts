import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateTotalMonthlyCost, sanitizeSelectedModules } from "@/lib/plans";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

/**
 * Accessor for Cloudflare runtime environment bindings via OpenNext
 */
export function getRequestContext() {
  try {
    return getCloudflareContext();
  } catch {
    return null;
  }
}

/**
 * Securely retrieve the Webhook URL from Cloudflare Worker bindings or environment variables
 */
function getGoogleWebhookUrl(env?: CloudflareEnv): string | undefined {
  return env?.GOOGLE_WEBHOOK_URL || process.env.GOOGLE_WEBHOOK_URL;
}

const applySchema = z
  .object({
    contactName: z.string().trim().min(2, "Name is required").max(100),
    companyName: z.string().trim().min(2, "Company name is required").max(120),
    email: z.string().email("Valid email required").max(200),
    phone: z.string().trim().max(30).optional().default(""),
    bottleneck: z.string().trim().min(3, "Operational bottleneck description is required").max(1000),
    attribution: z.string().trim().min(2, "Referral source is required").max(200),
    selectedModules: z.array(z.string()).min(1, "At least Base Retainer must be selected"),
    estimatedMonthlyCost: z.number().min(0).max(1_000_000),
    crewSize: z.number().int().min(1).max(500).optional(),
    paperworkHours: z.number().min(0).max(80).optional(),
    disconnectedApps: z.number().int().min(0).max(20).optional(),
    website: z.string().optional(),
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
  );

const generateReferenceId = () => `DSIE-${Date.now().toString(36).toUpperCase()}`;

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    // Honeypot check
    if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
      return NextResponse.json({ success: true, referenceId: generateReferenceId() }, { status: 200 });
    }

    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: z.flattenError(parsed.error).fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const referenceId = generateReferenceId();
    const sanitizedModules = sanitizeSelectedModules(data.selectedModules);
    const calculatedTotal = calculateTotalMonthlyCost(data.selectedModules);
    const timestamp = new Date().toISOString();

    // Retrieve Cloudflare context & bindings
    const cfContext = getRequestContext();
    const env = cfContext?.env;

    // 1. D1 Database Execution: Persist application payload
    if (env?.DB) {
      await env.DB.prepare(
        `INSERT INTO audit_applications (
          reference_id, contact_name, company_name, email, phone, bottleneck, attribution, selected_modules, total_cost, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          referenceId,
          data.contactName,
          data.companyName,
          data.email,
          data.phone || "",
          data.bottleneck,
          data.attribution,
          JSON.stringify(sanitizedModules),
          calculatedTotal,
          timestamp
        )
        .run();
    }

    // 2. Google Apps Script Webhook Execution
    const webhookUrl = getGoogleWebhookUrl(env);
    if (!webhookUrl) {
      throw new Error("GOOGLE_WEBHOOK_URL is not configured in environment or Cloudflare bindings.");
    }

    const webhookPayload = {
      referenceId,
      contactName: data.contactName,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone || "",
      bottleneck: data.bottleneck,
      attribution: data.attribution,
      selectedModules: sanitizedModules,
      estimatedTotal: calculatedTotal,
      estimatedMonthlyCost: calculatedTotal,
      crewSize: data.crewSize,
      paperworkHours: data.paperworkHours,
      disconnectedApps: data.disconnectedApps,
      timestamp,
    };

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
      redirect: "follow",
    });

    if (!webhookRes.ok) {
      throw new Error(`Google Webhook returned HTTP status ${webhookRes.status}`);
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Application submitted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DSIE APPLY ERROR]:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown API error" 
    }, { status: 500 });
  }
}
