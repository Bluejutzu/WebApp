import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const awaitTimeout = (delay: number, reason?: string) =>
    new Promise<void>((resolve, reject) =>
        setTimeout(() => (reason === undefined ? resolve() : reject(reason)), delay)
    );
