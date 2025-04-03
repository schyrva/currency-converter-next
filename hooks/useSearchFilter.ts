"use client"

import { useState, useMemo } from "react"

export function useSearchFilter<T extends { code: string }>(items: T[], searchFields: (item: T) => string[]) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items
    }

    const query = searchQuery.toLowerCase()
    return items.filter((item) => {
      return searchFields(item).some((field) => field.toLowerCase().includes(query))
    })
  }, [items, searchQuery, searchFields])

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  }
}

