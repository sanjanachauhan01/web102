import { useEffect, useState } from 'react'
import './App.css'
//const API_KEY = import.meta.env.VITE_API_WEATHER_KEY

function App() {
  //const [count, setCount] = useState(0)
  const [list, setList] = useState(null)
  const [search, setSearch] = useState("")
  const [filteredList, setFilteredList] = useState(null)
  const [selectedType, setSelectedType] = useState("")
  useEffect(() => {
    async function fetchPokeData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setList(detailedPokemon);

      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchPokeData();
  }, [])

  return (
    <>
      <div className="app">
        <div className="header">
          <h1>First 20 Pokemon in Pokedex</h1>
          <p>Using the PokeAPI, these are the retrieved first 100 pokemon in the Pokedex and their attributes.</p>
        </div>
        {list && (
          <div className='stats'>
            <p>Most Common Type: {
              Object.entries(
                list.flatMap((p) => p.types.map((t) => t.type.name))
                    .reduce((acc, type) => ({ ...acc, [type]: (acc[type] || 0) + 1 }), {})
              ).sort((a, b) => b[1] - a[1])[0][0]
            }</p>
            <p>Average Height: {list.reduce((sum, p) => sum + p.height, 0) / list.length}</p>
            <p>Average Weight: {list.reduce((sum, p) => sum + p.weight, 0) / list.length}</p>
          </div>
        )}
        <div className="search-row">
          <input type="text" placeholder="Search Pokemon..." className="search-bar" onChange={(e) => setSearch(e.target.value)} />
          {list && (
            <select className="type-filter" onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">All Types</option>
              {[...new Set(list.flatMap((p) => p.types.map((t) => t.type.name)))].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        </div>
        <div>
          {list && list
            .filter((p) => p.name.toLowerCase().startsWith(search.toLowerCase()))
            .filter((p) => selectedType === "" || p.types.some((t) => t.type.name === selectedType))
            .map((p) => (
            <div className="pokemon" key={p.name}>
              <h2>{p.name}</h2>
              <img src={p.sprites.front_default} alt={p.name} />
              <p>Type: {p.types.map((t) => t.type.name).join(", ")}</p>
              <p>Height: {p.height}</p>
              <p>Weight: {p.weight}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
