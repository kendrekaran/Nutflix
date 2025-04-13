"use client";

import { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { scrollToId } from '../lib/scrollUtils';

interface SmoothLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
}

const SmoothLink = forwardRef<HTMLAnchorElement, SmoothLinkProps>(
  ({ children, href, className, duration = 1.2, offset = 0, ...props }, ref) => {
    const isAnchor = typeof href === 'string' && href.startsWith('#');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isAnchor) {
        e.preventDefault();
        const targetId = href.slice(1); // Remove the # character
        scrollToId(targetId, { offset, duration });
      }
    };

    return (
      <Link
        ref={ref}
        href={href}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

SmoothLink.displayName = 'SmoothLink';

export default SmoothLink; 