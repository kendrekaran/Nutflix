"use client";

import { ReactNode } from 'react';
import { useInView } from '../lib/animationUtils';
import React from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'rotate-in';
  threshold?: number;
  delay?: string;
  once?: boolean;
  className?: string;
}

export default function ScrollAnimate({
  children,
  animation = 'fade-up',
  threshold = 0.1,
  delay = '0ms',
  once = true,
  className = '',
}: ScrollAnimateProps) {
  const { ref, isInView } = useInView({ threshold, once });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} ${isInView ? animation : 'opacity-0'}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
} 