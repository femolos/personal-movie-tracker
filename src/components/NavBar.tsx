import { NavLink } from "react-router-dom"
import { useUiStore } from "../store/useUiStore"

const statuses = ["want", "active", "done", "dropped"] as const

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `uppercase tracking-wide text-sm ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`

  const theme = useUiStore((s) => s.theme)
  const density = useUiStore((s) => s.density)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  const setDensity = useUiStore((s) => s.setDensity)

  return (
    <nav className="flex flex-wrap items-center gap-4 p-4 border-b">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      {statuses.map((s) => (
        <NavLink key={s} to={`/list/${s}`} className={linkClass}>
          {s}
        </NavLink>
      ))}
      <NavLink to="/about" className={linkClass}>About</NavLink>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="border rounded px-3 py-1 text-sm uppercase tracking-wide"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          onClick={() => setDensity(density === "compact" ? "comfortable" : "compact")}
          className="border rounded px-3 py-1 text-sm uppercase tracking-wide"
        >
          {density === "compact" ? "Comfortable" : "Compact"}
        </button>
      </div>
    </nav>
  )
}