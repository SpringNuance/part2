import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Options = ({countries, setCountries}) => {
  if (countries.length > 10) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
  } else if (countries.length >= 2) {
      return (
        <ul>
          {countries.map((country, i) =>
            <li key={i}> {country.name} <button onClick={() => setCountries([country])}>show</button></li>
          )}
        </ul>
      )
  } else if (countries.length === 1){
      return (
        <CountriesFull country={countries[0]}/>
      )
  } else {
     return (
       <div></div>
     )
  }
}

const CountriesFull = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
    })
  })
  console.log('hey',weather)

  const WeatherDisplay = ({weather, country}) => {
    const currentWeather = weather[0].current
    return (
      <>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {currentWeather.temperature}° Celcius</p>
      <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
      <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
      </>
    )
  }

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag" width = "300" height = "200"/>

        <div>{weather.length > 0 ? (<WeatherDisplay weather = { weather} country = {country}/>) : (<div></div>)}</div>
      </div>
    )

}



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const CountriesToShow = !filter ? [] : countries.filter(country => country.name.toLowerCase().includes(filter))
  console.log(CountriesToShow)
 
  return (
    <div>
      <p>
        find countries <input value={filter} onChange={handleFilter} />
      </p>
      <Options countries = {CountriesToShow} setCountries = {setCountries}/>
    
    </div>
  )
}

export default App

/*
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

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
  }        console.log(apiResponse)
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

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
    })
  })

  if (weather.length > 0) {
    const currentWeather = weather[0].current
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Country flag"></img>
    </div>
  )
}

export default Country
*/

