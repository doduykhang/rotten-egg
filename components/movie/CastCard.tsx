import Link from 'next/link'
import React from 'react'
import Cast from '../../models/Cast'

interface Props {
  cast: Cast
}

const CastCard: React.FC<Props> = ({ cast }) => {
  return (
    <Link href={`/person/${cast.person.id}`}>
      <div className="min-w-fit cursor-pointer p-2 text-white">
        <img className="h-56 w-40" src={cast.person.imageUrl} alt="" />
        <p>{cast.person.personName}</p>
        <p className="text-gray-400">{cast.roleName}</p>
      </div>
    </Link>
  )
}

export default CastCard
