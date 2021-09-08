import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'

const Filter = ({filter, handleFilter}) => {
  return (
    <div>Filter name <input value = {filter} onChange={handleFilter}/></div>
  )
}

const Persons = ({PersonsToShow}) => {
  return (
    <ul>
    {PersonsToShow.map(person => 
        <Person key={person.id} person={person} />
    )}
  </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div> Name: <input value = {newName} onChange={handleNameChange}/></div>
    <div> Number: <input value = {newNumber} onChange={handleNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const PersonsToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter))


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: newName,
      name: newName,
      number: newNumber,
    }
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h3>Add a new phone record</h3>
      <PersonForm addPerson={addPerson} 
        newName = {newName} 
        handleNameChange = {handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons PersonsToShow={PersonsToShow} />
    </div>
  )
}

export default App

/** 
 const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App
*/

