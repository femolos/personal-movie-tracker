import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api/client"
import type { Status } from "../types"

export function useItemMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["items"] })

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: Status }) => {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      return res.json()
    },
    onSuccess: invalidate,
  })

  const updateNote = useMutation({
    mutationFn: async ({ id, note }: { id: number; note: string }) => {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      })
      if (!res.ok) throw new Error("Failed to update note")
      return res.json()
    },
    onSuccess: invalidate,
  })

  const updateRating = useMutation({
    mutationFn: async ({ id, rating }: { id: number; rating: number }) => {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      })
      if (!res.ok) throw new Error("Failed to update rating")
      return res.json()
    },
    onSuccess: invalidate,
  })

  return { updateStatus, updateNote, updateRating }
}
