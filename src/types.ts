export type Status = "want" | "active" | "done" | "dropped"

export interface Movie {
  id: number
  title: string
  creator: string   // director
  year: number
  genre: string
  status: Status
  rating: number | null
  note: string | null
  owner: string | null
}