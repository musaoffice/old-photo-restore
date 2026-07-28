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
  environment: process.env.PADDLE_ENVIRONMENT || "sandbox",
  plans: {
    basic: {
      id: "basic",
      name: "Basic Pack",
      credits: 100,
      paddlePriceId: process.env.PADDLE_PRICE_BASIC,
    },
    standard: {
      id: "standard",
      name: "Standard Pack",
      credits: 250,
      paddlePriceId: process.env.PADDLE_PRICE_STANDARD,
    },
    pro: {
      id: "pro",
      name: "Professional Pack",
      credits: 600,
      paddlePriceId: process.env.PADDLE_PRICE_PRO,
    },
    business: {
      id: "business",
      name: "Business Pack",
      credits: 2000,
      paddlePriceId: process.env.PADDLE_PRICE_BUSINESS,
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
