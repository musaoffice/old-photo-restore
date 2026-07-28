import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import config from "./config";

const apiKey = config.paddle.apiKey && config.paddle.apiKey.trim() !== ""
  ? config.paddle.apiKey
  : "paddle_placeholder_key_for_build_purposes";

export const paddle = new Paddle(apiKey, {
  environment: config.paddle.environment === "production"
    ? Environment.production
    : Environment.sandbox,
});
