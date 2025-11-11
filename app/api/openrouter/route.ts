import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { auth } from '@clerk/nextjs/server';

export const runtime = 'edge';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

interface RequestBody {
  messages: UIMessage[];
  id?: string;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json() as RequestBody;

    // Validate messages exist
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Convert UI messages to model messages
    const modelMessages = convertToModelMessages(body.messages);

    const result = await streamText({
      model: openrouter.chat('openai/gpt-oss-20b:free'),
      messages: modelMessages,
      temperature: 0.7,
    });

    // Return as UI message stream (supports tool calls, data parts, etc.)
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error in OpenRouter API route:', error);

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}