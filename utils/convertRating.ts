export function convertRating(totalRating: number, ratingCount: number) {
  if (totalRating === 0) return -1
  return ratingCount / totalRating
}
