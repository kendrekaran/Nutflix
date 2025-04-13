"use client";

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { setLenis } from '../lib/scrollUtils';

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    lerp?: number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal';
    infinite?: boolean;
  };
}

export default function LenisProvider({ 
  children,
  options = {}
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with default options that can be overridden
    lenisRef.current = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))), // https://www.desmos.com/calculator/brs54l4xou
      orientation: options.orientation ?? 'vertical',
      gestureOrientation: options.gestureOrientation ?? 'vertical',
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      lerp: options.lerp ?? 0.1,
      infinite: options.infinite ?? false,
    });

    // For debugging - uncomment to check scroll progress in console
    // lenisRef.current.on('scroll', (e: any) => {
    //   console.log(e);
    // });

    // Set the instance in our utility 
    setLenis(lenisRef.current);

    // Create animation frame update
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Start the animation frame loop
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy();
    };
  }, [options]);

  return <>{children}</>;
} 