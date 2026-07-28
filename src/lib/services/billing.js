import { paddle } from "../paddle";
import config from "../config";
import { UserService } from "./user";

export const BillingService = {
  async createCheckoutSession(userId, planId) {
    const plan = config.paddle.plans[planId];
    if (!plan) throw new Error("Invalid plan selected");
    if (!plan.paddlePriceId) throw new Error("Missing Paddle price ID for this plan");

    const transaction = await paddle.transactions.create({
      items: [{ priceId: plan.paddlePriceId, quantity: 1 }],
      customData: { userId, credits: plan.credits.toString() },
      checkout: {
        url: `${config.auth.url}/pricing?success=true`,
      },
    });

    return transaction.checkout.url;
  },

  async handleWebhook(body, signature) {
    const eventData = await paddle.webhooks.unmarshal(
      body,
      config.paddle.webhookSecret,
      signature
    );

    if (eventData.eventType === "transaction.completed") {
      const transaction = eventData.data;
      const userId = transaction.customData?.userId;
      const credits = parseInt(transaction.customData?.credits || "0", 10);

      if (userId && credits > 0) {
        await UserService.addCredits(userId, credits);
        return { success: true, userId, credits };
      }
    }

    return { success: false };
  }
};
