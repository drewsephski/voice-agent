'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname, useSearchParams } from 'next/navigation';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Update scroll position on route change
    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true });
    };

    // Add scroll event listener
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
      window.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, [pathname, searchParams]);

  return <>{children}</>;
}
