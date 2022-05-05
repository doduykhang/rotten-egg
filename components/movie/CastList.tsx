import React from 'react'
import Cast from '../../models/Cast'
import CastCard from './CastCard'

interface Props {
  casts: Cast[]
}

const CastList: React.FC<Props> = ({ casts }) => {
  return (
    <div className="no-scrollbar flex w-[80%] justify-center overflow-x-auto">
      {casts.map((cast) => (
        <CastCard key={cast.id} cast={cast} />
      ))}
    </div>
  )
}

export default CastList
