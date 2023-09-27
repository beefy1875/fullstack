import countryService from './services/countries'
import { useState, useEffect } from 'react'

const CountryDetails = ( { country }) => {
  const [weather, setWeather] = useState({})
  console.log('country', country)

  useEffect(() => {
    console.log('running useeffect')
    countryService
      .getWeather(country.capital)
      .then(returnedWeather => setWeather(returnedWeather))
  }, [country.capital])

  console.log('about to return, run x2?')

  return (<div>
    <h2>{country.name}</h2>
    <p>
      capital {country.capital}
      <br></br>
      area {country.area}
    </p>
    <b>languages:</b>
    <ul>
      {country.languages.map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>
    <h3>Weather in {country.capital}</h3>
    <p>temperature {weather.temp} Celsius</p>
    <img
      src={weather.icon}
      alt={`${country.capital} weather icon`} />
    <p>wind {weather.wind} m/s</p>
  </div>)
}

const Display = ({ countries, countryField, setCountryField }) => {
  if (countryField === '') {
    return (<div></div>)
  }

  const countriesToDisplay = 
    countries.filter(country => 
      country.name.toLowerCase().includes(countryField.toLowerCase()))

  if (countriesToDisplay.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  if (countriesToDisplay.length > 1) {
    return (
      <ul>
        {countriesToDisplay.map(country =>
        <li key={country.name}>
          {country.name} 
          <button onClick={() => setCountryField(country.name)}>show</button></li>)}
      </ul>)
  }

  if (countriesToDisplay.length === 0) {
    return (<div>No matches</div>)
  }

  return (
    <div>
      <CountryDetails country={countriesToDisplay[0]} />
    </div>
  )
}

const App = () => {
  const [countryField, setCountryField] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(returnedCountries => setCountries(returnedCountries))
  }
  ,[])

  const handleChange = (e) => {
    setCountryField(e.target.value)
  }

  return (
    <>
      <form>
        find countries
        <input
          value={countryField}
          onChange={handleChange} />
      </form>
      <Display 
        countries={countries} 
        countryField={countryField}
        setCountryField={setCountryField} />
    </>
  )
}

export default App