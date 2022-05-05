import User from './User'

export default interface Review {
  user: User
  reviewContent: string
  rating: number
}
