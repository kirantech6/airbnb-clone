import { Listing, Property, SearchQuery } from "./types"
import { mockListings, mockProperties } from "./mockData"

export type SearchResult = (Listing & { propertyCity: string; propertyMedia: string[] })[]

export function searchListings(q: SearchQuery): SearchResult {
  // Very simple filter by city substring and availability; real system would geocode
  const term = (q.where ?? "").toLowerCase()
  const results = mockListings
    .filter((l) => {
      const p = mockProperties[l.propertyId]
      const cityMatch = term ? p.city.toLowerCase().includes(term) : true
      return l.status === "active" && cityMatch
    })
    .map((l) => {
      const p = mockProperties[l.propertyId]
      return { ...l, propertyCity: p.city, propertyMedia: p.media }
    })

  // Basic rank: rating desc then reviewsCount desc
  return results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0))
}
