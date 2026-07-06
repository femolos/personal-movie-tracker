import { useParams, Link } from "react-router-dom"
import { useItem } from "../hooks/useItem"
import { useItemMutations } from "../hooks/useItemMutations"
import { useMoreLikeThis } from "../hooks/useMoreLikeThis"
import type { Status } from "../types"

export default function ItemDetail() {
  const { id } = useParams()
  const numId = Number(id)
  const { data, isLoading, isError } = useItem(numId)
  const { updateStatus, updateRating } = useItemMutations()
  const { data: related, isLoading: relatedLoading } = useMoreLikeThis(data?.genre, numId)

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

      <div className="mt-6">
        <h2 className="font-semibold uppercase tracking-wide text-sm text-gray-500 mb-2">
          More Like This
        </h2>
        {relatedLoading && <p className="text-sm text-gray-500">Loading related titles...</p>}
        {related && related.length === 0 && (
          <p className="text-sm text-gray-500">No other {data.genre} titles yet.</p>
        )}
        <ul className="space-y-1">
          {related?.map((m) => (
            <li key={m.id}>
              <Link to={`/items/${m.id}`} className="text-blue-600 hover:underline">
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}