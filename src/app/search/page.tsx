"use client"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { searchListings } from "@/lib/tryhome/search"
import { computePricing } from "@/lib/tryhome/pricing"
import { mockUsers } from "@/lib/tryhome/mockData"

export default function SearchPage() {
  const params = useSearchParams()
  const where = params.get("where") ?? undefined
  const from = params.get("from") ?? undefined
  const to = params.get("to") ?? undefined
  const adults = Number(params.get("adults") ?? 2)
  const children = Number(params.get("children") ?? 0)

  const results = searchListings({ where, from, to, adults, children })

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-xl font-semibold">Results {where ? `in ${where}` : ""}</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((l) => {
            const breakdown = computePricing(l.pricing, { from, to, renter: mockUsers.u_renter })
            const img = l.propertyMedia[0]
            return (
              <article key={l.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
                  <Image src={img} alt="Listing" fill className="object-cover transition duration-300 group-hover:scale-105" />
                  <button className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur">♥</button>
                </div>
                <div className="mt-2 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{l.title}</p>
                    <p className="text-zinc-600">{l.rating ?? 0} ★</p>
                  </div>
                  <p className="truncate text-zinc-600">{l.propertyCity}</p>
                  <p className="mt-1"><span className="font-medium">${Math.round(breakdown.total)}</span> total</p>
                </div>
              </article>
            )
          })}
        </div>
        {results.length === 0 && <p className="text-sm text-zinc-600">No results. Try a different location.</p>}
      </div>
    </main>
  )
}
