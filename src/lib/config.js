/**
 * Centralized configuration for the Old Photo Restore SaaS application.
 */

const config = {
  appName: "Old Photo Restore",
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    webhook_url: process.env.WEBHOOK_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  paddle: {
  apiKey: process.env.PADDLE_API_KEY,
  webhookSecret: process.env.PADDLE_WEBHOOK_SECRET,
  environment: process.env.PADDLE_ENVIRONMENT || "sandbox", // "sandbox" or "production"
  plans: {
    standard: {
      id: "standard",
      name: "Standard Pack",
      credits: 1000,
      paddlePriceId: process.env.PADDLE_PRICE_STANDARD, // pri_... from your Paddle dashboard
    },
    pro: {
      id: "pro",
      name: "Pro Pack",
      credits: 2000,
      paddlePriceId: process.env.PADDLE_PRICE_PRO, // pri_... from your Paddle dashboard
    }
  }
},
  ai: {
    apiKey: process.env.MUAPIAPP_API_KEY || process.env.HEADSHOT_API_KEY,
    submitEndpoint: "https://api.muapi.ai/api/v1/gpt-image-2-image-to-image",
    uploadEndpoint: "https://api.muapi.ai/api/v1/upload_file",
    pollEndpoint: (requestId) => `https://api.muapi.ai/api/v1/predictions/${requestId}/result`,
  },
  db: {
    url: process.env.DATABASE_URL,
  }
};

export default config;
