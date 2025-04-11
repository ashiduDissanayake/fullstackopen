import { useState, useEffect } from 'react'
import Search from './components/Search'
import CountriesList from './components/CountriesList'
import CountryDetail from './components/CountryDetail'
import countryService from './services/countries'
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCountries(filtered)
      
      if (filtered.length === 1) {
        setSelectedCountry(filtered[0])
      } else {
        setSelectedCountry(null)
      }
    } else {
      setFilteredCountries([])
      setSelectedCountry(null)
    }
  }, [searchQuery, countries])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setSelectedCountry(null)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  const displayCountries = () => {
    if (selectedCountry) {
      return <CountryDetail country={selectedCountry} />
    }
    
    if (searchQuery === '') {
      return <p>Enter a search term to find countries</p>
    }
    
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    
    if (filteredCountries.length > 1) {
      return (
        <CountriesList 
          countries={filteredCountries} 
          onSelect={handleCountrySelect} 
        />
      )
    }
    
    if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />
    }
    
    return <p>No matches found</p>
  }

  return (
    <div>
      <h1>Countries</h1>
      <Search value={searchQuery} onChange={handleSearchChange} />
      {displayCountries()}
    </div>
  )
}

export default App