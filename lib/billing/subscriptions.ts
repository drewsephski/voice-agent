import { randomUUID } from 'crypto';
import { env } from '@/lib/env';

export interface UserSubscription {
  id: string;
  clerkUserId: string | null;
  primaryEmail: string | null;
  polarSubscriptionId: string;
  polarCustomerId: string | null;
  polarProductId: string | null;
  planName: string | null;
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * In-memory store for UserSubscription.
 *
 * IMPORTANT:
 * - This is intentionally NON-PERSISTENT and for demo/template purposes only.
 * - Data is stored in-memory per server/runtime instance and will be lost on:
 *     - Server restarts
 *     - Deployments / cold starts
 *     - Horizontal scaling between multiple instances
 * - In a real application, replace this with a durable store (Prisma, Drizzle, etc.)
 *   while keeping this module's API as your integration boundary.
 */
const subscriptions = new Map<string, UserSubscription>(); // key: polarSubscriptionId (runtime-local)

export interface NormalizedSubscriptionInput {
  polarSubscriptionId: string;
  polarCustomerId?: string | null;
  email?: string | null;
  polarProductId?: string | null;
  status: string;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: Date | null;
}

export type BadgeVariant = 'default' | 'outline' | 'warning' | 'destructive';

export function mapPolarProductToPlan(
  productId: string | null | undefined,
): { planName: string | null } {
  if (!productId) {
    return { planName: null };
  }

  if (productId === env.POLAR_PRODUCT_ID_MONTHLY) {
    return { planName: 'Pro Monthly' };
  }

  if (productId === env.POLAR_PRODUCT_ID_ONETIME) {
    return { planName: 'Lifetime Access' };
  }

  return { planName: null };
}

/**
 * Idempotent upsert based on polarSubscriptionId.
 * Safe to call repeatedly from webhook handlers.
 */
export async function upsertSubscriptionFromPolar(
  input: NormalizedSubscriptionInput & { clerkUserId?: string | null },
): Promise<void> {
  const {
    polarSubscriptionId,
    polarCustomerId = null,
    email,
    polarProductId = null,
    status,
    currentPeriodEnd = null,
    cancelAtPeriodEnd = false,
    canceledAt = null,
    clerkUserId = null,
  } = input;

  if (!polarSubscriptionId) {
    console.error(
      '[billing] upsertSubscriptionFromPolar called without polarSubscriptionId',
      input,
    );
    return;
  }

  const existing = subscriptions.get(polarSubscriptionId);
  const now = new Date();
  const { planName } = mapPolarProductToPlan(polarProductId);

  if (existing) {
    const updated: UserSubscription = {
      ...existing,
      status,
      polarCustomerId: polarCustomerId ?? existing.polarCustomerId,
      polarProductId,
      planName,
      primaryEmail: email ?? existing.primaryEmail,
      currentPeriodEnd: currentPeriodEnd ?? existing.currentPeriodEnd,
      cancelAtPeriodEnd:
        typeof cancelAtPeriodEnd === 'boolean'
          ? cancelAtPeriodEnd
          : existing.cancelAtPeriodEnd,
      canceledAt: canceledAt ?? existing.canceledAt,
      // Only set clerkUserId if we receive one and none is stored yet
      clerkUserId:
        existing.clerkUserId || clerkUserId || existing.clerkUserId,
      updatedAt: now,
    };

    subscriptions.set(polarSubscriptionId, updated);
    return;
  }

  const created: UserSubscription = {
    id: randomUUID(),
    clerkUserId: clerkUserId || null,
    primaryEmail: email || null,
    polarSubscriptionId,
    polarCustomerId,
    polarProductId,
    planName,
    status,
    currentPeriodEnd,
    cancelAtPeriodEnd: !!cancelAtPeriodEnd,
    canceledAt,
    createdAt: now,
    updatedAt: now,
  };

  subscriptions.set(polarSubscriptionId, created);
}

/**
 * Compute the "current" plan view model for a Clerk user.
 * Selection rules:
 * - Prefer subscriptions with status in ['active', 'trialing', 'past_due'].
 *   Among them, pick latest currentPeriodEnd; if missing, latest updatedAt.
 * - If none, fall back to most recent canceled subscription.
 * - If still none, treat as free tier.
 */
export async function getCurrentPlanForUser(
  clerkUserId: string,
): Promise<{
  hasSubscription: boolean;
  label: string;
  status: string;
  helperText: string;
  badgeVariant: BadgeVariant;
}> {
  if (!clerkUserId) {
    return {
      hasSubscription: false,
      label: 'Free',
      status: 'No active subscription',
      helperText:
        'You are on the free tier. Upgrade to unlock more features.',
      badgeVariant: 'outline',
    };
  }

  const all = Array.from(subscriptions.values()).filter(
    (sub) => sub.clerkUserId === clerkUserId,
  );

  if (all.length === 0) {
    return {
      hasSubscription: false,
      label: 'Free',
      status: 'No active subscription',
      helperText:
        'You are on the free tier. Upgrade to unlock more features.',
      badgeVariant: 'outline',
    };
  }

  const isCurrentStatus = (s: string) =>
    s === 'active' || s === 'trialing' || s === 'past_due';

  const currentCandidates = all.filter((s) => isCurrentStatus(s.status));

  const sortByPeriodEndThenUpdated = (a: UserSubscription, b: UserSubscription) => {
    const aEnd = a.currentPeriodEnd?.getTime() ?? 0;
    const bEnd = b.currentPeriodEnd?.getTime() ?? 0;

    if (aEnd !== bEnd) {
      return bEnd - aEnd; // latest first
    }

    return b.updatedAt.getTime() - a.updatedAt.getTime();
  };

  let selected: UserSubscription | null = null;

  if (currentCandidates.length > 0) {
    selected = [...currentCandidates].sort(sortByPeriodEndThenUpdated)[0];
  } else {
    const canceled = all
      .filter((s) => s.status === 'canceled')
      .sort((a, b) => {
        const aTime = a.canceledAt?.getTime() ?? a.updatedAt.getTime();
        const bTime = b.canceledAt?.getTime() ?? b.updatedAt.getTime();
        return bTime - aTime;
      });
    selected = canceled[0] ?? null;
  }

  const formatDate = (d: Date | null | undefined) =>
    d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  if (!selected) {
    return {
      hasSubscription: false,
      label: 'Free',
      status: 'No active subscription',
      helperText:
        'You are on the free tier. Upgrade to unlock more features.',
      badgeVariant: 'outline',
    };
  }

  const planLabel = selected.planName || 'Pro';

  if (selected.status === 'active') {
    let helperText = 'Your subscription is active.';
    if (selected.currentPeriodEnd && !selected.cancelAtPeriodEnd) {
      helperText = `Renews on ${formatDate(selected.currentPeriodEnd)}.`;
    } else if (selected.currentPeriodEnd && selected.cancelAtPeriodEnd) {
      helperText = `Scheduled to cancel on ${formatDate(
        selected.currentPeriodEnd,
      )}.`;
    }

    return {
      hasSubscription: true,
      label: planLabel,
      status: 'Active',
      helperText,
      badgeVariant: 'default',
    };
  }

  if (selected.status === 'trialing') {
    let helperText = 'Your subscription is active.';
    if (selected.currentPeriodEnd) {
      helperText = `Trial ends on ${formatDate(selected.currentPeriodEnd)}.`;
    }

    return {
      hasSubscription: true,
      label: planLabel,
      status: 'Trialing',
      helperText,
      badgeVariant: 'outline',
    };
  }

  if (selected.status === 'past_due') {
    let helperText = 'Your subscription is active.';
    if (selected.currentPeriodEnd) {
      helperText = `Past due. Resolve payment before ${formatDate(
        selected.currentPeriodEnd,
      )} to avoid interruption.`;
    } else {
      helperText =
        'Your subscription is past due. Please update your payment method.';
    }

    return {
      hasSubscription: true,
      label: planLabel,
      status: 'Past due',
      helperText,
      badgeVariant: 'warning',
    };
  }

  if (selected.status === 'canceled') {
    const canceledDate = selected.canceledAt || selected.updatedAt;
    return {
      hasSubscription: false,
      label: selected.planName || 'Previous plan',
      status: 'Canceled',
      helperText: `Your subscription was canceled on ${formatDate(
        canceledDate,
      )}.`,
      badgeVariant: 'outline',
    };
  }

  // Fallback for any other statuses
  return {
    hasSubscription: false,
    label: 'Free',
    status: 'No active subscription',
    helperText:
      'You are on the free tier. Upgrade to unlock more features.',
    badgeVariant: 'outline',
  };
}