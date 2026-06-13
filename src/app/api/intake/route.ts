import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      status: "success",
      message: "Intake received. Supabase integration added in next session.",
    },
    { status: 200 }
  );
}
