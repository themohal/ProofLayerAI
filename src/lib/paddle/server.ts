import { Paddle, Environment } from "@paddle/paddle-node-sdk";

let client: Paddle | null = null;

export function getPaddleServer(): Paddle {
  if (client) return client;

  client = new Paddle(
    process.env.PADDLE_API_KEY!,
    {
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? Environment.production : Environment.sandbox,
    }
  );

  return client;
}
