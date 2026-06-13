import { NextResponse } from "next/server";
import { defaultRateLimitStore, getClientIp } from "@/lib/rateLimit";
import { z } from "zod";

const demoSchema = z.object({
  businessType: z.string().min(1).max(500),
  painPoint: z.string().min(1).max(500),
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

  // Body-size guard (reject payloads larger than 10KB)
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (isNaN(contentLength) || contentLength > 10240) {
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 }
      );
    }
  }

  try {
    const body = await req.json();
    const result = demoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const rateLimitResult = await defaultRateLimitStore.check(ip);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: "Come back tomorrow for another free analysis" },
        { status: 429 }
      );
    }

    // SCAFFOLD — Roadmap Phase 3: Claude agent chain 0→4 attaches here (per MODELS.md).
    // Agents 0-3 model: claude-haiku-4-5-20251001
    // Agent 4 model: claude-sonnet-4-6
    return NextResponse.json(
      {
        status: "endpoint_pending",
        message: "Demo API connection built in next session",
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
