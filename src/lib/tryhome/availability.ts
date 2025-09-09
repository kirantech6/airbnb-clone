import { PropertyPolicy } from "./types"

export function isDateRangeValid(from?: string, to?: string) {
  if (!from || !to) return false
  return new Date(from) < new Date(to)
}

export function meetsMinNights(policy: PropertyPolicy, from?: string, to?: string) {
  if (!from || !to) return false
  const nights = Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000)
  return nights >= policy.minNights
}

export function occupancyAllowed(policy: PropertyPolicy, guests: number) {
  return guests <= policy.maxGuests
}
