import type { NextPage } from 'next'
import FeaturedMovieList from '../components/movie/FeaturedMovieList'
import useFeaturedMovieList from '../hooks/useFeaturedMovieList'
const Home: NextPage = () => {
  const { data: featuredList } = useFeaturedMovieList()

  return (
    <div>
      <section className="space-y-16 px-20">
        {featuredList?.data.map((featuredList) => (
          <FeaturedMovieList
            key={featuredList.id}
            featuredMovieList={featuredList}
          />
        ))}
      </section>
    </div>
  )
}

export default Home
