"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { addDays } from "date-fns"

export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [where, setWhere] = useState("")
  const [from, setFrom] = useState<Date | undefined>(undefined)
  const [to, setTo] = useState<Date | undefined>(undefined)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col gap-4 w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="w-full rounded-full border border-zinc-200 bg-white px-6 py-4 text-left shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{where || "Where to?"}</span>
                  <span className="text-zinc-400">
                    {from && to
                      ? `${from.toLocaleDateString()} - ${to.toLocaleDateString()}`
                      : "Add dates"}
                  </span>
                  <span className="text-zinc-400">
                    {adults} adults, {children} children
                  </span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[420px] p-6" align="start">
              <div className="flex flex-col gap-4">
                <input
                  className="w-full rounded-md border border-zinc-200 px-3 py-2"
                  placeholder="Where to?"
                  value={where}
                  onChange={e => setWhere(e.target.value)}
                />
                <div className="flex gap-4">
                  <Calendar
                    mode="range"
                    selected={from && to ? { from, to } : undefined}
                    onSelect={range => {
                      setFrom(range?.from)
                      setTo(range?.to)
                    }}
                    numberOfMonths={2}
                    disabled={date => date < new Date()}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm">Adults</label>
                    <input
                      type="number"
                      min={1}
                      value={adults}
                      onChange={e => setAdults(Number(e.target.value))}
                      className="w-16 rounded-md border border-zinc-200 px-2 py-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm">Children</label>
                    <input
                      type="number"
                      min={0}
                      value={children}
                      onChange={e => setChildren(Number(e.target.value))}
                      className="w-16 rounded-md border border-zinc-200 px-2 py-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => { setWhere(""); setFrom(undefined); setTo(undefined); setAdults(2); setChildren(0); }} className="rounded-full px-3 py-2 text-sm hover:bg-zinc-50">Clear</button>
                  <button
                    onClick={() => {
                      setOpen(false)
                      const params = new URLSearchParams()
                      if (where) params.set("where", where)
                      if (from) params.set("from", from.toISOString().slice(0, 10))
                      if (to) params.set("to", to.toISOString().slice(0, 10))
                      params.set("adults", String(adults))
                      params.set("children", String(children))
                      router.push(`/search?${params.toString()}`)
                    }}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white"
                  >
                    Search
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </main>
  )
}
