import { Link } from "react-router-dom"
import type { Movie } from "../types"

interface ItemCardProps {
  movie: Movie
}

const statusStyles: Record<Movie["status"], string> = {
  want: "bg-gray-100 text-gray-700",
  active: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  dropped: "bg-red-100 text-red-700",
}

export default function ItemCard({ movie }: ItemCardProps) {
  return (
    <Link
      to={`/items/${movie.id}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{movie.title}</h3>
          <p className="text-sm text-gray-500">
            {movie.creator} · {movie.year} · {movie.genre}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[movie.status]}`}>
          {movie.status}
        </span>
      </div>

      {movie.rating !== null && (
        <div className="mt-2 text-yellow-500">
          {"★".repeat(movie.rating)}
          <span className="text-gray-300">{"★".repeat(5 - movie.rating)}</span>
        </div>
      )}

      {movie.note && (
        <p className="mt-2 text-sm text-gray-600 italic truncate">{movie.note}</p>
      )}
    </Link>
  )
}