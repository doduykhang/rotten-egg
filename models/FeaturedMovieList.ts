import Movie from './Movie'

export default interface FeaturedMovieList {
  id: string
  name: string
  movies: Movie[]
}
