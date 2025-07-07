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
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        showNotification(`${newName} is already in phonebook with the same number`, 'error')
        return
      }

      if (window.confirm(`Replace ${newName}'s number with the new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}'s number`)
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
              showNotification(error.response.data.error, 'error')
            } else {
              showNotification(`Failed to update ${newName}`, 'error')
            }
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`)
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          showNotification(error.response.data.error, 'error')
        } else {
          showNotification('Failed to add person', 'error')
        }
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`)
        })
        .catch(() => {
          showNotification(`Information of ${name} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleSearchChange = e => setSearchName(e.target.value)

  const personsToShow = searchName
    ? persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()))
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
      <PersonList persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
