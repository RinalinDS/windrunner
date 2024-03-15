import { cn } from '@/utils/cn';
import React, { HTMLProps } from 'react'



export default function Container({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('w-full bg-white border rounded-xl flex py-4 shadow-sm', className)} />

  )
}