import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by{' '}
              <Link 
                href="https://www.instagram.com/drew.sepeczi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
              >
                Drew Sepeczi <Instagram className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Questions?{' '}
              <Link 
                href="https://www.linkedin.com/in/drewsepeczi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline inline-flex items-center gap-1"
              >
                Reach out on <Linkedin className="h-3.5 w-3.5 mb-1" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
