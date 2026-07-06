import { create } from "zustand"
import { persist } from "zustand/middleware"

type Density = "compact" | "comfortable"

interface UiState {
  theme: "light" | "dark"
  density: Density
  toggleTheme: () => void
  setDensity: (density: Density) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      density: "comfortable",
      toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      setDensity: (density) => set({ density }),
    }),
    {
      name: "watchpile.ui",
      partialize: (state) => ({ theme: state.theme, density: state.density }),
    }
  )
)