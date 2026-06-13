import { NextResponse } from "next/server";
import { z } from "zod";

const intakeSchema = z.object({
  businessName: z.string().min(1).max(500),
  yourName: z.string().min(1).max(500),
  email: z.string().email().max(500),
  industry: z.string().min(1).max(500),
  revenue: z.string().min(1).max(500),
  painPoint: z.string().min(1).max(5000),
  usingAI: z.string().min(1).max(500),
  referral: z.string().min(1).max(500),
  selectedTier: z.string().min(1).max(500),
});

export async function POST(req: Request) {
  // Content-Type validation
  const contentType = req.headers.get("content-type") || "";
  if (contentType.split(";")[0].trim() !== "application/json") {
    return NextResponse.json(
      { error: "Unsupported Media Type. Expected application/json." },
      { status: 415 }
    );
  }

  // Body-size guard (reject payloads larger than 20KB)
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (isNaN(contentLength) || contentLength > 20480) {
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 }
      );
    }
  }

  try {
    const body = await req.json();
    const result = intakeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    // SCAFFOLD — Roadmap Phase 4: Server-side Supabase client attaches here.
    // Use the SUPABASE_SECRET_KEY (server-only key, never exposed) to insert data
    // into the lead intake table.

    return NextResponse.json(
      {
        status: "success",
        message: "Intake received. Supabase integration added in next session.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }
}
