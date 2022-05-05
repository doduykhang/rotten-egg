import Cast from './Cast'
import Crew from './Crew'
import Genre from './Genre'
import Language from './Language'
import Rating from './Rating'
import Review from './Review'

export default interface Movie {
  id: string
  title: string
  description: string
  releaseDate: string
  runtime: number
  imageUrl: string
  ratingCount: number
  totalRating: number
  rating: Rating
  originalLanguage: Language
  genres: Genre[]
  Cast: Cast[]
  Crew: Crew[]
  Review: Review[]
}
