"use client";

import { ReactNode, useEffect } from 'react';
import { useScrollAnimation } from '../lib/animationUtils';

interface ScrollAnimationInitializerProps {
  children: ReactNode;
}

export default function ScrollAnimationInitializer({ children }: ScrollAnimationInitializerProps) {
  // Initialize scroll animations
  useScrollAnimation();
  
  return <>{children}</>;
} 