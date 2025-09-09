import { Listing, Property, User } from "./types"

export const mockUsers: Record<string, User> = {
  u_renter: {
    id: "u_renter",
    role: "renter",
    emailVerified: true,
    phoneVerified: true,
    incomeProfile: { status: "verified", isLowIncome: true },
  },
}

export const mockProperties: Record<string, Property> = {
  p1: {
    id: "p1",
    ownerId: "u_landlord",
    address: "123 Palm Dr",
    city: "Los Angeles",
    country: "USA",
    media: [
      "https://ext.same-assets.com/1951721302/1423859449.jpeg",
      "https://ext.same-assets.com/1951721302/2273237308.jpeg",
    ],
    policy: { minNights: 2, maxGuests: 4, communityConscious: true },
  },
}

export const mockListings: Listing[] = [
  {
    id: "l1",
    propertyId: "p1",
    title: "Bright studio near beach",
    status: "active",
    badges: { communityConscious: true, verifiedReviews: true },
    pricing: {
      baseRate: 160,
      cleaningFee: 50,
      platformFeeRate: 0.05,
      processingFeeRate: 0.029,
      listingType: "short_term",
      feeSplit: "split",
    },
    availability: {},
    rating: 4.9,
    reviewsCount: 128,
  },
]
