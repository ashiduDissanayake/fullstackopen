import Person from './Person'

const PersonList = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          deletePerson={() => deletePerson(person.id, person.name)}
        />
      )}
    </div>
  )
}

export default PersonList