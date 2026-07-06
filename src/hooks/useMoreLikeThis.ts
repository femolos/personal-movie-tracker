import { useQuery } from "@tanstack/react-query"
import { API_URL } from "../api/client"
import type { Movie } from "../types"

export function useMoreLikeThis(genre: string | undefined, excludeId: number) {
  return useQuery({
    queryKey: ["items", "related", genre],
    queryFn: async (): Promise<Movie[]> => {
      const res = await fetch(`${API_URL}/items?genre=${encodeURIComponent(genre!)}`)
      if (!res.ok) throw new Error("Failed to load related movies")
      const data: Movie[] = await res.json()
      return data.filter((m) => m.id !== excludeId)
    },

    enabled: !!genre,
  })
}