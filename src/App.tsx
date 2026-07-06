import { Routes, Route } from "react-router-dom"
import { useUiStore } from "./store/useUiStore"
import NavBar from "./components/NavBar"
import Catalog from "./pages/Catalog"
import ItemDetail from "./pages/ItemDetail"
import ListByStatus from "./pages/ListByStatus"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

export default function App() {
  const theme = useUiStore((s) => s.theme)
  const density = useUiStore((s) => s.density)

  return (
    <div
      className={theme === "dark" ? "dark" : ""}
      data-density={density}
    >
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/list/:status" element={<ListByStatus />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}