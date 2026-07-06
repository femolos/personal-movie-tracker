import { NavLink } from "react-router-dom"

const statuses = ["want", "active", "done", "dropped"] as const

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-blue-600 font-semibold" : "text-gray-600"

  return (
    <nav className="flex gap-4 p-4 border-b">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      {statuses.map((s) => (
        <NavLink key={s} to={`/list/${s}`} className={linkClass}>
          {s}
        </NavLink>
      ))}
      <NavLink to="/about" className={linkClass}>About</NavLink>
    </nav>
  )
}