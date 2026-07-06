import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api/client"
import type { Movie } from "../types"

export function useItem(id: number) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: async (): Promise<Movie | undefined> => {
      const res = await fetch(`${API_URL}/items/${id}`)
      if (res.status === 404) return undefined
      if (!res.ok) throw new Error("Failed to load movie")
      return res.json()
    },
  })
}
