import { Webhooks } from '@polar-sh/nextjs';
import { env } from '@/lib/env';
import { Resend } from 'resend';

// Resend instance configured per official docs: https://github.com/resend/resend-node
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendRepoAccessEmail(params: {
  to: string;
  checkoutId: string;
}) {
  // From address MUST be a valid, verified sender with Resend.
  // Priority:
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'Repo Access';
 
   const repoUrl = process.env.PRIVATE_REPO_URL;

  if (!process.env.RESEND_API_KEY || !fromEmail || !repoUrl) {
    console.error('Resend/env misconfigured', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      fromEmail,
      hasRepoUrl: !!repoUrl,
    });
    return;
  }

  const url = `${repoUrl}?checkout_id=${params.checkoutId}`;

  // Implemented following Resend Node.js SDK patterns from Context7 docs:
  // - resend.emails.send({ from, to, subject, text/html })
  // - return/inspect { data, error }
  try {
    const { data, error } = await resend.emails.send({
      from: `${'Repo Access'} <${fromEmail}>`,
      to: [params.to],
      subject: 'Your access link to the private repository',
      text: `Thanks for your purchase!

Here is your private repository link:

${url}

This link is for your use only. Please keep it private.`,
      html: `<p>Thanks for your purchase!</p>
<p>Here is your private repository link:</p>
<p><a href="${url}">${url}</a></p>
<p>This link is for your use only. Please keep it private.</p>`,
    });

    if (error) {
      // For production you may inspect error.name (validation_error, etc.) per docs
      console.error('Resend send failed', {
        name: error.name,
        message: error.message,
      });
      return;
    }

    console.log('Resend email queued successfully', {
      id: data?.id,
      to: params.to,
    });
  } catch (error) {
    // Narrow unknown error to a safe shape without using `any`
    if (error && typeof error === 'object' && 'name' in error && 'message' in error) {
      const typedError = error as { name?: string; message?: string };
      console.error('Resend send error', {
        name: typedError.name,
        message: typedError.message,
      });
    } else {
      console.error('Resend send error', error);
    }
  }
}

import { upsertSubscriptionFromPolar } from '@/lib/billing/subscriptions';

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,

  onOrderCreated: async (payload) => {
    const customerEmail = payload.data.customer?.email || undefined;
    const checkoutId = payload.data.id;

    console.log('Polar webhook: order.created', {
      id: checkoutId,
      customerEmail,
      itemsCount: payload.data.items?.length,
      currency: payload.data.currency,
      totalAmount: payload.data.totalAmount,
    });

    if (customerEmail) {
      await sendRepoAccessEmail({
        to: customerEmail,
        checkoutId,
      });
    } else {
      console.warn('Polar order.created missing customer email, cannot send repo link.', {
        id: checkoutId,
      });
    }
  },

  onSubscriptionCreated: async (payload) => {
    const subscription = payload.data;

    console.log('Polar webhook: subscription.created', {
      id: subscription.id,
      customerEmail: subscription.customer?.email,
      productId: subscription.productId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
    });

    await upsertSubscriptionFromPolar({
      polarSubscriptionId: subscription.id,
      polarCustomerId: subscription.customer?.id,
      email: subscription.customer?.email,
      polarProductId: subscription.productId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd
        ? new Date(subscription.currentPeriodEnd)
        : null,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
      canceledAt: subscription.canceledAt
        ? new Date(subscription.canceledAt)
        : null,
    });
  },

  onSubscriptionUpdated: async (payload) => {
    const subscription = payload.data;

    console.log('Polar webhook: subscription.updated', {
      id: subscription.id,
      customerEmail: subscription.customer?.email,
      productId: subscription.productId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      canceledAt: subscription.canceledAt,
    });

    await upsertSubscriptionFromPolar({
      polarSubscriptionId: subscription.id,
      polarCustomerId: subscription.customer?.id,
      email: subscription.customer?.email,
      polarProductId: subscription.productId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd
        ? new Date(subscription.currentPeriodEnd)
        : null,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
      canceledAt: subscription.canceledAt
        ? new Date(subscription.canceledAt)
        : null,
    });
  },

  onSubscriptionCanceled: async (payload) => {
    const subscription = payload.data;

    console.log('Polar webhook: subscription.canceled', {
      id: subscription.id,
      customerEmail: subscription.customer?.email,
      productId: subscription.productId,
      canceledAt: subscription.canceledAt,
      currentPeriodEnd: subscription.currentPeriodEnd,
    });

    await upsertSubscriptionFromPolar({
      polarSubscriptionId: subscription.id,
      polarCustomerId: subscription.customer?.id,
      email: subscription.customer?.email,
      polarProductId: subscription.productId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd
        ? new Date(subscription.currentPeriodEnd)
        : null,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd ?? false,
      canceledAt: subscription.canceledAt
        ? new Date(subscription.canceledAt)
        : null,
    });

    // Keep hook as extension point for additional side effects:
    // revoke access, notify user, etc.
  },
});