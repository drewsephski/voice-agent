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

  // Default to MONTHLY placeholder if nothing provided
  const inputProducts = rawProducts.length ? rawProducts : ['MONTHLY_PRODUCT_ID'];

  // Map placeholders -> actual IDs from env
  const mapped = inputProducts.map((p) => {
    if (p === 'MONTHLY_PRODUCT_ID') return env.POLAR_PRODUCT_ID_MONTHLY;
    if (p === 'ONETIME_PRODUCT_ID') return env.POLAR_PRODUCT_ID_ONETIME;
    return p;
  });

  // Validate configuration robustness:
  // - Require access token
  // - Require at least one valid mapped product ID
  if (!env.POLAR_ACCESS_TOKEN) {
    console.error('[polar][checkout] Missing POLAR_ACCESS_TOKEN');
    return Response.json(
      { error: 'Polar checkout misconfigured: missing POLAR_ACCESS_TOKEN' },
      { status: 500 }
    );
  }

  const invalidProducts =
    mapped.length === 0 ||
    mapped.some(
      (id) =>
        !id ||
        id === 'MONTHLY_PRODUCT_ID' ||
        id === 'ONETIME_PRODUCT_ID'
    );

  if (invalidProducts) {
    console.error('[polar][checkout] Invalid or unresolved Polar product IDs', {
      inputProducts,
      mapped,
      POLAR_PRODUCT_ID_MONTHLY: env.POLAR_PRODUCT_ID_MONTHLY,
      POLAR_PRODUCT_ID_ONETIME: env.POLAR_PRODUCT_ID_ONETIME,
    });

    // Explicit 400 so it's obvious in Network tab, not a generic 500
    return Response.json(
      {
        error:
          'Invalid Polar product configuration. Check POLAR_PRODUCT_ID_MONTHLY / POLAR_PRODUCT_ID_ONETIME and query parameters.',
      },
      { status: 400 }
    );
  }

  // Rewrite query to contain only real UUIDs so @polar-sh/nextjs reads them
  url.searchParams.delete('products');
  for (const id of mapped) {
    url.searchParams.append('products', id);
  }

  // Derive base URL from NEXT_PUBLIC_APP_URL if present, otherwise from the request URL.
  // This prevents hard failure when NEXT_PUBLIC_APP_URL is missing in some environments.
  const appBase =
    env.NEXT_PUBLIC_APP_URL ||
    `${url.protocol}//${url.host}`;

  const successUrl = `${appBase}/dashboard?checkoutId={CHECKOUT_ID}`;
  const returnUrl = `${appBase}/checkout/error`;

  // Final sanity check to avoid "Invalid URL" from undefined/empty pieces
  try {
    // Ensure these are valid absolute URLs
    new URL(successUrl);
    new URL(returnUrl);
  } catch (err) {
    console.error('[polar][checkout] Invalid success/return URL', {
      successUrl,
      returnUrl,
      err,
    });
    return Response.json(
      { error: 'Polar checkout misconfigured: invalid success/return URL' },
      { status: 500 }
    );
  }

  const config = {
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: env.POLAR_ENVIRONMENT,
    successUrl,
    returnUrl,
    // ensure redirect (non-embed) behavior
    includeCheckoutId: true,
  } as Parameters<typeof Checkout>[0];

  let handler: (req: NextRequest) => Promise<Response>;

  try {
    handler = Checkout(config);
  } catch (err) {
    console.error('[polar][checkout] Failed to initialize Checkout handler', {
      err,
      config: {
        hasAccessToken: !!env.POLAR_ACCESS_TOKEN,
        server: env.POLAR_ENVIRONMENT,
      },
    });
    return Response.json(
      { error: 'Failed to initialize Polar checkout handler' },
      { status: 500 }
    );
  }

  // Call handler with patched URL (UUID products), let it perform the redirect.
  const patchedRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  try {
    const response = await handler(patchedRequest as unknown as NextRequest);

    // If Polar returns non-redirect, surface details to help debugging
    if (
      response.status < 300 ||
      response.status >= 400 ||
      !response.headers.get('location')
    ) {
      const text = await response.text().catch(() => '');
      console.error('[polar][checkout] Unexpected response from Polar handler', {
        status: response.status,
        location: response.headers.get('location'),
        body: text,
      });
    }

    return response;
  } catch (err) {
    console.error('[polar][checkout] Error during checkout handler', { err });
    return Response.json(
      { error: 'Unexpected error while creating Polar checkout' },
      { status: 500 }
    );
  }
}