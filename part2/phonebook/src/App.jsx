import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        showNotification(`${newName} is already added to phonebook with the same number`, 'error')
        return
      }
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}'s number`)
          })
          .catch(error => {
            showNotification(
              `Information of ${newName} has already been removed from server`, 
              'error'
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }
    
    const personObject = { 
      name: newName, 
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`)
      })
      .catch(error => {
        showNotification('Failed to add person', 'error')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`)
        })
        .catch(error => {
          showNotification(`Information of ${name} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchName(event.target.value)

  const personsToShow = searchName.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={searchName} onChange={handleSearchChange} />
      
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <PersonList 
        persons={personsToShow} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App