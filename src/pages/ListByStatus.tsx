import { useParams, useSearchParams } from "react-router-dom"
import { useItems } from "../hooks/useItems"
import SearchBox from "../components/SearchBox"
import ItemCard from "../components/ItemCard"
import type { Status } from "../types"

export default function ListByStatus() {
  const { status } = useParams<{ status: Status }>()
  const { data, isLoading, isError } = useItems()
  const [params] = useSearchParams()
  const q = (params.get("q") ?? "").toLowerCase()

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-600">Something went wrong.</p>

  const filtered = (data ?? [])
    .filter((m) => m.status === status)
    .filter((m) => m.title.toLowerCase().includes(q))

  return (
    <div className="p-4">
      <SearchBox />
      <div className="grid gap-3 mt-4">
        {filtered.map((m) => <ItemCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}