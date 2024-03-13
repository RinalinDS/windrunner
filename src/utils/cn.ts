import clsx, { ClassValue } from "clsx"
import { log } from "console"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {    
    return twMerge(clsx(...inputs))
}