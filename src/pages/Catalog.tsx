import { useSearchParams } from "react-router-dom"
import { useItems } from "../hooks/useItems"
import SearchBox from "../components/SearchBox"
import ItemCard from "../components/ItemCard"

export default function Catalog() {
  const { data, isLoading, isError } = useItems()
  const [params] = useSearchParams()
  const q = (params.get("q") ?? "").toLowerCase()
  const owner = params.get("owner")

  if (isLoading) return <p className="p-4">Loading movies...</p>
  if (isError) return <p className="p-4 text-red-600">Something went wrong while loading.</p>

  const filtered = (data ?? [])
    .filter((m) => m.title.toLowerCase().includes(q))
    .filter((m) => !owner || m.owner === owner)

  return (
    <div className="p-4">
      <SearchBox />
      {owner && <p className="text-sm text-gray-500 mt-2">Viewing {owner}'s list</p>}
      <div className="grid gap-3 mt-4">
        {filtered.map((m) => <ItemCard key={m.id} movie={m} />)}
      </div>
    </div>
  )
}