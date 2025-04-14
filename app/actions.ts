"use server"

import { getMoreWorkData } from "@/lib/data"

export async function fetchMoreWorkData() {
  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Fetch the additional work data
  const moreWork = await getMoreWorkData()
  return moreWork
}
