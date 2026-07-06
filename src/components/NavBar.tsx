import { NavLink } from "react-router-dom"
import { useShallow } from "zustand/react/shallow"
import { useUiStore } from "../store/useUiStore"

const statuses = ["want", "active", "done", "dropped"] as const

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `uppercase tracking-wide text-sm ${isActive ? "text-blue-600 font-semibold" : "text-gray-600"}`
  /*
    Trap avoided: selecting `{ theme, density }` as a plain object literal
    would return a new object reference on every store update, even ones
    unrelated to theme/density. Zustand would see "different reference",
    treat it as changed, and re-render this component in an infinite loop.
    useShallow does a shallow comparison of the object's keys instead of
    comparing references, so it only re-renders when theme or density
    actually change.
  */
  const { theme, density } = useUiStore(
    useShallow((s) => ({ theme: s.theme, density: s.density }))
  )
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