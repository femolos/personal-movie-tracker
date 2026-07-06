import { useParams } from "react-router-dom"
import { useItem } from "../hooks/useItem"
import { useItemMutations } from "../hooks/useItemMutations"
import type { Status } from "../types"

export default function ItemDetail() {
  const { id } = useParams()
  const numId = Number(id)   // useParams always returns strings
  const { data, isLoading, isError } = useItem(numId)
  const { updateStatus, updateRating } = useItemMutations()

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-600">Something went wrong.</p>
  if (!data) return <p className="p-4">Movie not found.</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p>{data.creator} · {data.year} · {data.genre}</p>

      <select
        value={data.status}
        onChange={(e) => updateStatus.mutate({ id: numId, status: e.target.value as Status })}
        className="border rounded mt-2"
      >
        {["want", "active", "done", "dropped"].map((s) => <option key={s}>{s}</option>)}
      </select>

      <div className="mt-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => updateRating.mutate({ id: numId, rating: n })}
            className={n <= (data.rating ?? 0) ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}