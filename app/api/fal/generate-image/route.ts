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

        // Use image from Fal response.
        const image = images[0];

        // Define narrow types for provider metadata instead of using `any`
        type FalImageMeta = {
          content_type?: string;
        };
        type FalProviderMeta = {
          fal?: {
            images?: FalImageMeta[];
          };
        };

        const falMeta = providerMetadata as FalProviderMeta | undefined;
        const metaImage = falMeta?.fal?.images?.[0];
        const mimeType = metaImage?.content_type || 'image/png';

        // Prefer direct URL fields that Fal may provide on the image object
        type UrlImage = { url?: string; file?: string };
        const urlImage = image as UrlImage;

        if (typeof urlImage.url === 'string') {
          return NextResponse.json({
            imageUrl: urlImage.url,
            mimeType,
          });
        }

        if (typeof urlImage.file === 'string') {
          return NextResponse.json({
            imageUrl: urlImage.file,
            mimeType,
          });
        }

        // Fallback: if the image exposes a binary buffer-like `data`, encode it.
        type BinaryImage = { data?: Uint8Array };
        const binImage = image as BinaryImage;

        if (binImage.data instanceof Uint8Array) {
          const base64Image = Buffer.from(binImage.data).toString('base64');
          const imageUrl = `data:${mimeType};base64,${base64Image}`;
          return NextResponse.json({ imageUrl, mimeType });
        }

        throw new Error('Unsupported image format returned from Fal: missing url/file/data');
  } catch (error) {
    console.error('Error generating image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
