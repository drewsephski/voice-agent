import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getCurrentPlanForUser } from '@/lib/billing/subscriptions';
import { fal } from '@ai-sdk/fal';
import { experimental_generateImage as generateImage } from 'ai';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if user has an active subscription
    const { hasSubscription } = await getCurrentPlanForUser(userId);
    if (!hasSubscription) {
      return new NextResponse('Payment required', { status: 402 });
    }

    const { prompt, negative_prompt, size } = await request.json();

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    // Generate image using Fal AI with the flux model
    const { images, providerMetadata } = await generateImage({
      model: fal.image('fal-ai/flux/dev'),
      prompt: prompt,
      providerOptions: {
        fal: {
          negative_prompt: negative_prompt,
          image_size: {
            width: size?.width || 1024,
            height: size?.height || 1024,
          },
          num_inference_steps: 'faster',
        },
      },
    });

    if (!images || images.length === 0) {
      throw new Error('No image was generated');
    }

    // Convert the image to a base64 URL for the client
    const image = images[0];
    const base64Image = Buffer.from(await image.arrayBuffer()).toString('base64');
    const mimeType = providerMetadata?.fal?.images?.[0]?.content_type || 'image/png';
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    return NextResponse.json({
      imageUrl,
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
