import React from 'react'
import Person from '../../models/Person'

interface Props {
  person: Person
}

const PersonCard: React.FC<Props> = ({ person }) => {
  return (
    <div className="flex space-x-3 text-white">
      <img src={person.imageUrl} alt={person.personName} />
      <div className="space-y-5">
        <h1 className="text-4xl font-bold">{person.personName}</h1>
        <p className="text-lg">{person.description}</p>
      </div>
    </div>
  )
}

export default PersonCard
