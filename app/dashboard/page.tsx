import { currentUser, auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { getCurrentPlanForUser } from "@/lib/billing/subscriptions";

export const metadata = {
  title: "Dashboard | Dream Chat",
};

interface DashboardSearchParams {
  checkoutId?: string;
  [key: string]: string | string[] | undefined;
}

interface DashboardPageProps {
  searchParams: Promise<DashboardSearchParams>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    // In a production app you would typically enforce auth via middleware.
    // This page-level guard keeps the template self-contained and explicit.
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-xl font-semibold">You need to sign in</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          This dashboard is only available to authenticated users.
        </p>
        <Link
          href="/sign-in"
          className="px-4 py-2 text-xs font-semibold text-foreground border border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  const primaryEmail =
    user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress || user.emailAddresses?.[0]?.emailAddress;

  const plan = await getCurrentPlanForUser(userId);

  const badgeBaseClasses =
    "inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-medium";
  const badgeVariantClasses: Record<string, string> = {
    default: "bg-foreground text-background",
    outline: "border border-border text-foreground",
    warning:
      "border border-yellow-500/70 text-yellow-700 dark:text-yellow-300 bg-yellow-500/5",
    destructive:
      "border border-red-500/70 text-red-600 dark:text-red-300 bg-red-500/5",
  };

  const getBadgeClassName = (
    variant: keyof typeof badgeVariantClasses | string,
  ) =>
    `${badgeBaseClasses} ${
      badgeVariantClasses[variant as keyof typeof badgeVariantClasses] ??
      badgeVariantClasses.outline
    }`;

  const resolvedSearchParams = await searchParams;
  const showCheckoutSuccess = Boolean(resolvedSearchParams.checkoutId);

  return (
    <main className="flex min-h-[70vh] flex-col gap-8 px-4 py-10 md:px-8 lg:px-12">
      {/* Optional post-checkout confirmation banner.
          This is informational only; subscription truth is webhook-driven and read via getCurrentPlanForUser. */}
      {showCheckoutSuccess && (
        <section className="max-w-4xl">
          <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/80 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100 px-4 py-3 text-xs flex flex-col gap-1">
            <p className="font-semibold">
              Thanks for upgrading with Polar.
            </p>
            <p className="text-[11px] text-emerald-900/80 dark:text-emerald-100/80">
              Your purchase completed successfully. This dashboard is your central hub
              for viewing account details, plan status, and feature access in this template.
            </p>
            <p className="text-[10px] text-emerald-900/70 dark:text-emerald-100/60">
              In this starter, subscriptions are stored in-memory for demo purposes.
              In your own product you will back this with a real database and Polar webhooks.
            </p>
          </div>
        </section>
      )}

      {/* Welcome / hero */}
      <section className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user.firstName || user.username || "there"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This dashboard is the authenticated home for your customers in this template.
          It showcases how to combine Clerk (auth), Polar (billing), and the Next.js App Router
          into a production-style account hub.
        </p>
      </section>

      {/* Account + Current Plan */}
      <section className="grid gap-6 md:grid-cols-3 max-w-4xl">
        {/* Account details */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card/90 backdrop-blur-xl p-4">
          <h2 className="mb-3 text-sm font-semibold">Account details</h2>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">User ID:</span>{" "}
              <span className="break-all">{user.id}</span>
            </div>
            {primaryEmail && (
              <div>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {primaryEmail}
              </div>
            )}
            {user.firstName || user.lastName ? (
              <div>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {[user.firstName, user.lastName].filter(Boolean).join(" ")}
              </div>
            ) : null}
            <div>
              <span className="font-medium text-foreground">Created:</span>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "Unknown"}
            </div>
          </div>
        </div>

        {/* Current plan */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card/90 backdrop-blur-xl p-4">
          <div>
            <h2 className="mb-2 text-sm font-semibold">Current plan</h2>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={getBadgeClassName(plan.badgeVariant)}>
                  {plan.label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {plan.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {plan.hasSubscription ? (
                  plan.helperText
                ) : (
                  <>
                    This starter runs an in-memory, non-persistent subscription
                    store for demo purposes. In your production app, plan status
                    is derived from Polar checkout + webhooks backed by your
                    database. Use this block as the single source of truth for
                    gating features once wired to real persistence.
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {!plan.hasSubscription && (
              <Link
                href="/pricing"
                className="px-3 py-1 text-xs font-semibold text-foreground border border-border rounded hover:bg-accent hover:text-accent-foreground transition-colors text-center"
              >
                View plans and upgrade via Polar
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Template overview */}
      <section className="max-w-4xl rounded-xl border border-border bg-card/80 backdrop-blur-xl p-4">
        <h2 className="text-sm font-semibold mb-2">Template overview</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Use this dashboard as the authenticated home for your own SaaS or product.
          It is wired to:
        </p>
        <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside">
          <li>
            Authenticate users with Clerk and surface core identity attributes.
          </li>
          <li>
            Reflect billing state driven by Polar checkout flows and webhooks
            via a centralized subscription helper.
          </li>
          <li>
            Model account, plan status, and entitlements in one place so you
            can gate features and routes consistently.
          </li>
        </ul>
      </section>

      {/* What you get with this template */}
      <section className="max-w-4xl rounded-xl border border-border bg-card/80 backdrop-blur-xl p-4">
        <h2 className="text-sm font-semibold mb-2">
          What you get with this template
        </h2>
        <div className="grid gap-3 text-[11px] text-muted-foreground md:grid-cols-2">
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Auth-ready (Clerk)
            </p>
            <p>
              Pre-wired authentication using Clerk&apos;s Next.js integration,
              including server-side user lookup and protected dashboard access.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Billing-ready (Polar)
            </p>
            <p>
              Polar checkout endpoint and webhook integration patterns are in
              place. Swap the in-memory store for your database to go live.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Marketing pages
            </p>
            <p>
              Home, Features, and Pricing pages demonstrate a complete funnel
              from marketing site to authenticated dashboard.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Config-driven navigation
            </p>
            <p>
              Site navigation and metadata are driven via a central config in{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
                config/site.ts
              </code>{" "}
              for easy white-labeling.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Extensible subscription model
            </p>
            <p>
              A focused subscription helper in{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
                lib/billing/subscriptions.ts
              </code>{" "}
              centralizes plan logic. Replace its backing store with Prisma,
              Drizzle, or your preferred ORM to persist Polar-derived state.
            </p>
          </div>
        </div>
      </section>

      {/* Next steps for your own product */}
      <section className="max-w-4xl rounded-xl border border-border bg-card/80 backdrop-blur-xl p-4">
        <h2 className="text-sm font-semibold mb-2">
          Next steps for your own product
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-[11px] text-muted-foreground">
          <li>
            Connect a real database (e.g. Postgres via Prisma/Drizzle) and replace
            the in-memory store in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
              lib/billing/subscriptions.ts
            </code>{" "}
            with durable reads/writes.
          </li>
          <li>
            Attach the Clerk user ID (and any other identifiers) as metadata in
            your Polar checkout/session configuration so webhook events can be
            deterministically mapped back to your users.
          </li>
          <li>
            Use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
              UserSubscription
            </code>{" "}
            view model from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
              lib/billing/subscriptions.ts
            </code>{" "}
            to gate premium features, API routes, organizations, and limits
            directly from this dashboard and across your app.
          </li>
          <li>
            Customize{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
              siteConfig
            </code>{" "}
            in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[10px]">
              config/site.ts
            </code>{" "}
            for your branding, navigation, and marketing copy while keeping the
            underlying auth + billing wiring intact.
          </li>
        </ol>
      </section>
    </main>
  );
}