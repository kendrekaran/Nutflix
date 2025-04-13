"use client";

import { useEffect, useState, useRef } from 'react';
import { onScroll } from './scrollUtils';

// Check if an element is in viewport
export function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Hook to detect when an element is in viewport
export function useInView(options = { threshold: 0.1, once: true }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const seenRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we only want to trigger once and it's already been seen, return
        if (options.once && seenRef.current) return;
        
        if (entry.isIntersecting) {
          setIsInView(true);
          seenRef.current = true;
          
          // If once is true, unobserve the element after it's been seen
          if (options.once) {
            observer.unobserve(element);
          }
        } else if (!options.once) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.once]);

  return { ref, isInView };
}

// Hook for scroll-triggered animations
export function useScrollAnimation() {
  useEffect(() => {
    // Add classes to scroll-animate elements when they enter viewport
    const animateElements = document.querySelectorAll('[data-scroll-animate]');
    
    const checkElements = () => {
      animateElements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        
        const animationClass = element.dataset.scrollAnimate || 'animate-in';
        const offset = parseInt(element.dataset.scrollOffset || '0');
        const delay = element.dataset.scrollDelay || '0ms';
        const once = element.dataset.scrollOnce !== 'false';
        
        // Apply delay if specified
        element.style.transitionDelay = delay;
        
        if (isElementInViewport(element)) {
          if (!element.classList.contains(animationClass)) {
            element.classList.add(animationClass);
          }
        } else if (!once) {
          element.classList.remove(animationClass);
        }
      });
    };
    
    // Initial check
    checkElements();
    
    // Check on scroll
    const unsubscribe = onScroll(() => {
      checkElements();
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
}

// Animation presets for data-scroll-animate
export const scrollAnimations = {
  fadeIn: 'fade-in',
  fadeUp: 'fade-up',
  fadeDown: 'fade-down',
  fadeLeft: 'fade-left',
  fadeRight: 'fade-right',
  zoomIn: 'zoom-in',
  zoomOut: 'zoom-out',
  rotateIn: 'rotate-in',
}; 