import MovieRole from './MovieRole'
import Person from './Person'

export default interface Crew {
  id: string
  person: Person
  movieRole: MovieRole
}
