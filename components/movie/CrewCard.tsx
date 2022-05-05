import Link from 'next/link'
import React from 'react'
import Crew from '../../models/Crew'

interface Props {
  crew: Crew
}

const CrewCard: React.FC<Props> = ({ crew }) => {
  return (
    <Link href={`/person/${crew.person.id}`}>
      <div className="min-w-fit cursor-pointer p-2 text-white">
        <img className="h-56 w-40" src={crew.person.imageUrl} alt="" />
        <p>{crew.person.personName}</p>
        <p className="text-gray-400">{crew.movieRole.movieRoleName}</p>
      </div>
    </Link>
  )
}

export default CrewCard
