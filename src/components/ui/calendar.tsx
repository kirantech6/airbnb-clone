"use client"
import * as React from "react"

type Range = { from?: Date; to?: Date }

export function Calendar({
  mode,
  selected,
  onSelect,
  numberOfMonths = 2,
  className,
}: {
  mode?: "range" | "single"
  selected?: Range | Date
  onSelect?: (value: any) => void
  numberOfMonths?: number
  className?: string
}) {
  // Minimal placeholder UI. Not a full calendar.
  const [from, setFrom] = React.useState((selected as Range)?.from ?? new Date())
  const [to, setTo] = React.useState((selected as Range)?.to ?? new Date())

  return (
    <div className={`p-3 ${className ?? ""}`}>
      <div className="grid gap-2 text-sm">
        <label className="grid gap-1">
          <span className="text-xs text-zinc-600">From</span>
          <input
            type="date"
            value={from.toISOString().slice(0, 10)}
            onChange={(e) => {
              const d = new Date(e.target.value)
              setFrom(d)
              onSelect?.({ from: d, to })
            }}
            className="rounded-md border px-2 py-1"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-zinc-600">To</span>
          <input
            type="date"
            value={to.toISOString().slice(0, 10)}
            onChange={(e) => {
              const d = new Date(e.target.value)
              setTo(d)
              onSelect?.({ from, to: d })
            }}
            className="rounded-md border px-2 py-1"
          />
        </label>
        <p className="text-xs text-zinc-500">Showing {numberOfMonths} month{numberOfMonths === 1 ? "" : "s"} (placeholder)</p>
      </div>
    </div>
  )
}
