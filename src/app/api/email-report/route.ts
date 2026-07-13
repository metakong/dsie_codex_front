import { NextResponse } from "next/server";
import { z } from "zod";

const emailReportSchema = z.object({
  email: z.string().email().max(320),
  report: z.string().min(1).max(20_000),
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

  // Body-size guard
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "Failed to read request body." }, { status: 400 });
  }
  if (rawBody.length > 25_000) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = emailReportSchema.safeParse(parsedBody);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip")?.trim() || "127.0.0.1";
    const jungleApiUrl = process.env.JUNGLE_API_URL || "http://127.0.0.1:8000";

    if (!process.env.JUNGLE_SECRET_KEY) {
      console.warn("[email-report route] JUNGLE_SECRET_KEY is not set — running unauthenticated");
    }

    const response = await fetch(`${jungleApiUrl}/v1/email-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-jungle-secret": process.env.JUNGLE_SECRET_KEY || "",
        "x-forwarded-for": clientIp,
      },
      body: JSON.stringify(result.data),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorBody: string;
      try {
        JSON.parse(errorText);
        errorBody = errorText;
      } catch {
        errorBody = JSON.stringify({ error: errorText || "Upstream error." });
      }
      return new Response(errorBody, {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in email-report proxy:", err);
    return NextResponse.json(
      { error: "Internal Server Error or Upstream Connection Failure" },
      { status: 500 }
    );
  }
}
