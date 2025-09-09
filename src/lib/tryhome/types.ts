// Core TryHome domain types
export type Role = "renter" | "landlord" | "manager"

export interface User {
  id: string
  role: Role
  emailVerified: boolean
  phoneVerified: boolean
  incomeProfile?: {
    status: "none" | "pending" | "verified"
    isLowIncome?: boolean
    docs?: string[]
  }
}

export interface PropertyPolicy {
  minNights: number
  maxGuests: number
  petPolicy?: "allowed" | "not_allowed" | "with_fee"
  communityConscious?: boolean
}

export interface PricingPolicy {
  baseRate: number // nightly or monthly depending on listingType
  cleaningFee?: number
  platformFeeRate: number // e.g., 0.05
  processingFeeRate: number // e.g., 0.029
  listingType: "short_term" | "long_term"
  feeSplit: "tenant" | "landlord" | "split"
}

export interface Property {
  id: string
  ownerId: string
  managerIds?: string[]
  address: string
  city: string
  country: string
  geo?: { lat: number; lng: number }
  media: string[]
  policy: PropertyPolicy
}

export interface ListingBadge {
  communityConscious?: boolean
  verifiedReviews?: boolean
}

export interface Listing {
  id: string
  propertyId: string
  title: string
  description?: string
  amenities?: string[]
  status: "active" | "draft" | "snoozed"
  screeningRequired?: boolean
  badges?: ListingBadge
  pricing: PricingPolicy
  availability: { blackoutDates?: string[] }
  rating?: number
  reviewsCount?: number
}

export interface SearchQuery {
  where?: string
  from?: string // ISO date
  to?: string // ISO date
  adults?: number
  children?: number
  category?: string
}

export interface PaymentBreakdown {
  subtotal: number
  cleaningFee: number
  platformFee: number
  processingFee: number
  total: number
}
