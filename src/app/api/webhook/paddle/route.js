import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { BillingService } from "@/lib/services/billing";

export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("paddle-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing paddle-signature header" }, { status: 400 });
    }
    const result = await BillingService.handleWebhook(body, signature);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Paddle webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
