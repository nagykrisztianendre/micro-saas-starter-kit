import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { getAppConfig } from '../../../../core/config';

/**
 * Placeholder webhook handler.
 *
 * This route intentionally keeps behavior minimal so projects can extend it with
 * Stripe signature verification + event-specific business logic.
 */
export async function POST(request: Request) {
  const webhookSecret = getAppConfig().billing.stripeWebhookSecret;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Billing webhook secret is missing from configuration.' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  return NextResponse.json(
    {
      received: true,
      message: 'Webhook endpoint is configured. Implement Stripe signature verification in production.',
      payloadBytes: rawBody.length,
    },
    { status: 202 },
  );
}
