import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard.jsx'
import DetailView from './DetailView.jsx'

function App() {
  const [list, setList] = useState(null)

  useEffect(() => {
    async function fetchPokeData() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
        const data = await response.json()
        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url)
            return res.json()
          })
        )
        setList(detailedPokemon)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchPokeData()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Dashboard list={list} />} />
      <Route path="/pokemon/:id" element={<DetailView list={list} />} />
    </Routes>
  )
}

export default App
