import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

import { useState , useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personToAdd = persons.find(person => person.name === newName)

    if(personToAdd === undefined) {
      const personObject = {
        name : newName,
        number : newNumber}

      personService
        .create(personObject)
        .then(personAdded => (
          setPersons(persons.concat(personAdded))
        ))
        .catch(error => {
          console.log(error.response.data.error)
        })
      
      const msgToAdd = {
        msg : `Added ${newName}`,
        type : 'success'}
      setMessage(msgToAdd)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {...personToAdd, number : newNumber}
        personService
          .update(personToAdd.id, personObject)
          .then(response => response.data)
          .catch(error => {
            setMessage({
              msg : `Information of ${newName} has already been removed from server`,
              type : 'error'})
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        setPersons(persons.map(person => person.id !== personToAdd.id ? person : personObject))
        setMessage({
          msg : `Updated ${newName}`,
          type : 'success'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const getRid = id => {
    const nameToDelete = persons
      .filter(person => person.id === id)
      .map(person => person.name)

    if (window.confirm(`Delete ${nameToDelete}?`)) {
      personService
      .getRid(id)
      .then(response => console.log(response.data))

      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message} />
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} getRid={getRid} />
    </div>
  )
}

export default App