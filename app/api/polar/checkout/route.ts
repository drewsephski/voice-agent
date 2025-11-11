import { Checkout } from '@polar-sh/nextjs';
import { env } from '@/lib/env';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Minimal, working Polar checkout route based on @polar-sh/nextjs.
 *
 * - Frontend may link with placeholders:
 *     /api/polar/checkout?products=MONTHLY_PRODUCT_ID
 *     /api/polar/checkout?products=ONETIME_PRODUCT_ID
 * - This route:
 *     1) Maps placeholders -> real UUIDs from env.
 *     2) Ensures Polar NEVER receives the placeholders.
 *     3) Delegates to Checkout(config) with only supported fields.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const rawProducts = url.searchParams.getAll('products');

  // If nothing provided, default to monthly product placeholder
  const inputProducts = rawProducts.length ? rawProducts : ['MONTHLY_PRODUCT_ID'];

  // Map placeholders to env-backed UUIDs
  const mapped = inputProducts.map((p) => {
    if (p === 'MONTHLY_PRODUCT_ID') return env.POLAR_PRODUCT_ID_MONTHLY;
    if (p === 'ONETIME_PRODUCT_ID') return env.POLAR_PRODUCT_ID_ONETIME;
    return p;
  });

  // Validate: no unresolved placeholders, all IDs present
  if (
    mapped.length === 0 ||
    mapped.some(
      (id) =>
        !id ||
        id === 'MONTHLY_PRODUCT_ID' ||
        id === 'ONETIME_PRODUCT_ID'
    )
  ) {
    console.error('Invalid or unresolved Polar product IDs:', {
      inputProducts,
      mapped,
    });
    return new Response(
      JSON.stringify({ error: 'Invalid product configuration' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Rewrite query to contain only real UUIDs so Polar SDK reads them correctly
  url.searchParams.delete('products');
  for (const id of mapped) {
    url.searchParams.append('products', id);
  }

  // Build Checkout config ONLY with documented fields.
  // Products are provided via query params above.
  const config = {
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: env.POLAR_ENVIRONMENT,
    successUrl: `${env.NEXT_PUBLIC_APP_URL}/checkout/success?checkoutId={CHECKOUT_ID}`,
    returnUrl: `${env.NEXT_PUBLIC_APP_URL}/checkout/error`,
  } as Parameters<typeof Checkout>[0];

  const handler = Checkout(config);

  // Call handler with patched URL, so Polar sees UUIDs instead of placeholders
  const patchedRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  return handler(patchedRequest as unknown as NextRequest);
}