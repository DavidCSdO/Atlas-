import React from 'react';
import { cn } from './Button';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-sm border border-white/10 bg-[#0a0f1c] p-8 shadow-md transition-all hover:border-white/20',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
