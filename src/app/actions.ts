"use server";

import { z } from "zod";
import { headers } from "next/headers";

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

type IntakeFormState = { success: boolean; message: string } | null;

export async function submitIntake(prevState: IntakeFormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  // Zod validation
  const result = intakeSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form input. Please verify your fields.",
    };
  }

  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || headersList.get("x-real-ip")?.trim() || "127.0.0.1";

    const jungleUrl = `${process.env.JUNGLE_API_URL || "http://127.0.0.1:8000"}/v1/intake`;
    if (!process.env.JUNGLE_SECRET_KEY) {
      console.warn("[actions] JUNGLE_SECRET_KEY is not set — running unauthenticated");
    }

    const response = await fetch(jungleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-jungle-secret": process.env.JUNGLE_SECRET_KEY || "",
        "x-forwarded-for": clientIp,
      },
      body: JSON.stringify(result.data),
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      const resData = await response.json();
      return {
        success: true,
        message: resData.message || "Intake received successfully.",
      };
    } else {
      let errorMessage = "Something went wrong.";
      try {
        const resData = await response.json();
        errorMessage = resData.message || resData.error || errorMessage;
      } catch {
        // Fallback
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (err) {
    console.error("Error submitting intake to Jungle API:", err);
    return {
      success: false,
      message: "Failed to submit. Please try again.",
    };
  }
}
