"use client";

import Lenis from '@studio-freight/lenis';

// Global Lenis instance to be used across the application
let lenisInstance: Lenis | null = null;

// Function to get the Lenis instance
export function getLenis() {
  return lenisInstance;
}

// Function to set the Lenis instance (called from LenisProvider)
export function setLenis(lenis: Lenis) {
  lenisInstance = lenis;
}

// Smooth scroll to element by ID
export function scrollToId(id: string, options?: { offset?: number; duration?: number }) {
  if (!lenisInstance) return;
  
  const element = document.getElementById(id);
  if (element) {
    lenisInstance.scrollTo(element, options);
  }
}

// Smooth scroll to an element
export function scrollToElement(element: HTMLElement, options?: { offset?: number; duration?: number }) {
  if (!lenisInstance || !element) return;
  lenisInstance.scrollTo(element, options);
}

// Smooth scroll to a specific position
export function scrollToPosition(position: number, options?: { duration?: number }) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(position, options);
}

// Smooth scroll to top of page
export function scrollToTop(options?: { duration?: number }) {
  if (!lenisInstance) return;
  lenisInstance.scrollTo(0, options);
}

// Stop scrolling animation
export function stopScrolling() {
  if (!lenisInstance) return;
  lenisInstance.stop();
}

// Start scrolling (if it was stopped)
export function startScrolling() {
  if (!lenisInstance) return;
  lenisInstance.start();
}

// Add a scroll listener
export function onScroll(callback: (e: { scroll: number; limit: number; velocity: number; direction: number; progress: number }) => void) {
  if (!lenisInstance) return () => {};
  
  lenisInstance.on('scroll', callback);
  
  // Return an unsubscribe function
  return () => {
    lenisInstance?.off('scroll', callback);
  };
} 