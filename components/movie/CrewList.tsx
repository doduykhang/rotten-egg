import React from 'react'

import Crew from '../../models/Crew'
import CrewCard from './CrewCard'

interface Props {
  crews: Crew[]
}

const CrewList: React.FC<Props> = ({ crews }) => {
  return (
    <div className="no-scrollbar flex w-[80%] justify-center overflow-x-auto">
      {crews.map((crew) => (
        <CrewCard key={crew.id} crew={crew} />
      ))}
    </div>
  )
}

export default CrewList
