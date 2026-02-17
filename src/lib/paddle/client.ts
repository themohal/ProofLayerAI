"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | null = null;

export async function getPaddle(): Promise<Paddle> {
  if (paddleInstance) return paddleInstance;

  const paddle = await initializePaddle({
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "production" ? "production" : "sandbox",
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
  });

  if (!paddle) throw new Error("Failed to initialize Paddle");
  paddleInstance = paddle;
  return paddle;
}
