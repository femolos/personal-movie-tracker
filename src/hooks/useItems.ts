import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api/client"
import type { Movie } from "../types"

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async (): Promise<Movie[]> => {
      const res = await fetch(`${API_URL}/items`)
      if (!res.ok) throw new Error("Failed to load movies")
      return res.json()
    },
  })
}
