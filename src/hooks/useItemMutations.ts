import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URL } from "../api/client"
import type { Movie, Status } from "../types"

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

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["items"] })

      const previousItems = queryClient.getQueryData<Movie[]>(["items"])
      const previousItem = queryClient.getQueryData<Movie>(["items", id])

      queryClient.setQueryData<Movie[]>(["items"], (old) =>
        old?.map((m) => (m.id === id ? { ...m, status } : m))
      )
      queryClient.setQueryData<Movie>(["items", id], (old) =>
        old ? { ...old, status } : old
      )

      return { previousItems, previousItem, id }
    },

    onError: (_err, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(["items"], context.previousItems)
      }
      if (context?.previousItem) {
        queryClient.setQueryData(["items", context.id], context.previousItem)
      }
    },

    onSettled: invalidate,
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
