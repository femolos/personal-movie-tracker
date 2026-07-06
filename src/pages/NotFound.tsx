import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600 mt-2">This page doesn't exist.</p>
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">
        Back to catalog
      </Link>
    </div>
  )
}