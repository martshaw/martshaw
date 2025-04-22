
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date in British English format (DD/MM/YYYY)
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

/**
 * Format a date range in British English format
 * @param startDate Start date
 * @param endDate End date or "Present"
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: Date, endDate: Date | "Present"): string {
  const formattedStart = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(startDate)

  const formattedEnd =
    endDate === "Present"
      ? "Present"
      : new Intl.DateTimeFormat("en-GB", {
          month: "short",
          year: "numeric",
        }).format(endDate)

  return `${formattedStart} – ${formattedEnd}`
}

/**
 * Fisher-Yates shuffle algorithm for randomizing array order
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

