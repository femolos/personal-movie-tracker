import { useSearchParams } from "react-router-dom"

export default function SearchBox() {
  const [params, setParams] = useSearchParams()
  const q = params.get("q") ?? ""

  return (
    <input
      value={q}
      onChange={(e) => {
        const next = new URLSearchParams(params)
        if (e.target.value) next.set("q", e.target.value)
        else next.delete("q")
        setParams(next)
      }}
      placeholder="Search titles..."
      className="border rounded px-3 py-1"
    />
  )
}