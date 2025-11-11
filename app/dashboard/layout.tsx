import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Image, MessageSquare } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border">
        <div className="flex flex-col flex-grow pt-5 bg-background overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">Dream Chat</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col px-2">
            <nav className="flex-1 space-y-1">
              <Link
                href="/dashboard"
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/chat"
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Chat
              </Link>
              <Link
                href="/dashboard/image-generation"
                className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
              >
                <Image className="mr-3 h-5 w-5" />
                Image Generation
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          {/* Ensure dashboard pages control their own internal scrolling.
              The wrapper here should not introduce an extra scrollable viewport. */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
