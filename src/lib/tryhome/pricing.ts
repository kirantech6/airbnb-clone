import { PricingPolicy, PaymentBreakdown, User } from "./types"

export function nightsBetween(fromISO?: string, toISO?: string) {
  if (!fromISO || !toISO) return 0
  const from = new Date(fromISO)
  const to = new Date(toISO)
  const ms = to.getTime() - from.getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export function computePricing(
  policy: PricingPolicy,
  opts: { from?: string; to?: string; renter?: User }
): PaymentBreakdown {
  const nights = policy.listingType === "short_term" ? nightsBetween(opts.from, opts.to) : 30
  const subtotal = nights * policy.baseRate
  const cleaningFee = policy.cleaningFee ?? 0

  // Platform fee with relief for verified low-income renters
  let platformFee = subtotal * policy.platformFeeRate
  if (opts.renter?.incomeProfile?.status === "verified" && opts.renter?.incomeProfile?.isLowIncome) {
    platformFee = platformFee * 0.3 // 70% relief
  }

  // Processing fee is typically on total volume through provider
  const processingBase = subtotal + cleaningFee + platformFee
  const processingFee = processingBase * policy.processingFeeRate

  const total = subtotal + cleaningFee + platformFee + processingFee

  return { subtotal, cleaningFee, platformFee, processingFee, total }
}

export function displayPricePerNight(policy: PricingPolicy) {
  return policy.baseRate
}
