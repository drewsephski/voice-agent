import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentPlanForUser } from "@/lib/billing/subscriptions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageGenerationForm } from "@/components/image-generation-form";

export const metadata = {
  title: "Image Generation | Dream Chat",
  description: "Generate AI images with Fal AI",
};

export default async function ImageGenerationPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const { hasSubscription } = await getCurrentPlanForUser(userId);
  
  if (!hasSubscription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Upgrade Required</h2>
        <p className="text-muted-foreground mb-6">
          Image generation is only available for paid subscribers.
        </p>
        <Button asChild>
          <a href="/pricing">View Plans</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AI Image Generation</h1>
        <p className="text-muted-foreground">
          Create stunning images with AI. Powered by Fal AI.
        </p>
      </div>
      
      <Card className="p-6">
        <ImageGenerationForm />
      </Card>
    </div>
  );
}
