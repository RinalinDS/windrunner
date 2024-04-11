import { cn } from '@/utils';
import React, { HTMLProps, memo } from 'react';

export default memo(function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'w-full bg-white border rounded-xl flex py-4 shadow-sm',
        className
      )}
    />
  );
});
