'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ImageSize = 'square' | 'portrait' | 'landscape';

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export function ImageGenerationForm() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('square');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/fal/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          size: getSizeDimensions(size),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const { imageUrl } = await response.json();
      setGeneratedImage({
        url: imageUrl,
        prompt,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getSizeDimensions = (size: ImageSize) => {
    switch (size) {
      case 'portrait':
        return { width: 768, height: 1024 };
      case 'landscape':
        return { width: 1024, height: 768 };
      case 'square':
      default:
        return { width: 1024, height: 1024 };
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            className="min-h-[100px]"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="negativePrompt">Negative Prompt (Optional)</Label>
          <Input
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="What to exclude from the image..."
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-2">
          <Label>Image Size</Label>
          <div className="flex gap-4">
            {(['square', 'portrait', 'landscape'] as const).map((sizeOption) => (
              <label key={sizeOption} className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={size === sizeOption}
                  onChange={() => setSize(sizeOption)}
                  className="h-4 w-4 text-primary"
                  disabled={isGenerating}
                />
                <span className="capitalize">{sizeOption}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </Button>
      </form>

      {generatedImage && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Generated Image</h3>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
            <img
              src={generatedImage.url}
              alt={`AI generated image: ${generatedImage.prompt}`}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Prompt:</span> {generatedImage.prompt}
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = generatedImage.url;
                link.download = `ai-image-${generatedImage.timestamp}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
