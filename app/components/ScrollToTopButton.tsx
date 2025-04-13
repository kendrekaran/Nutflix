"use client";

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronUp } from 'lucide-react';
import { scrollToTop } from '../lib/scrollUtils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when page is scrolled down
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    scrollToTop({ duration: 1.5 });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 opacity-70 hover:opacity-100"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
} 