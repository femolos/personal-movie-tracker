import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Catalog from "./pages/Catalog"
import ItemDetail from "./pages/ItemDetail"
import ListByStatus from "./pages/ListByStatus"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/list/:status" element={<ListByStatus />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}