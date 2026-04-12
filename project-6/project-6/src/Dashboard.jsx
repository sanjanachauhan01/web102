import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts'

function Dashboard({ list }) {
  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const typeCounts = list
    ? Object.entries(
        list.flatMap((p) => p.types.map((t) => t.type.name))
            .reduce((acc, type) => ({ ...acc, [type]: (acc[type] || 0) + 1 }), {})
      )
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => ({ type, count }))
    : []

  const mostCommonType = typeCounts.length > 0 ? typeCounts[0].type : '—'

  const topStatPokemon = list
    ? list
        .slice()
        .sort((a, b) => {
          const totalA = a.stats.reduce((s, st) => s + st.base_stat, 0)
          const totalB = b.stats.reduce((s, st) => s + st.base_stat, 0)
          return totalB - totalA
        })
        .slice(0, 8)
        .map((p) => ({
          name: p.name,
          hp: p.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0,
          attack: p.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0,
          defense: p.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0,
          speed: p.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0,
        }))
    : []

  const filtered = list
    ? list
        .filter((p) => p.name.toLowerCase().startsWith(search.toLowerCase()))
        .filter((p) => selectedType === "" || p.types.some((t) => t.type.name === selectedType))
    : []

  return (
    <div className="app">
      <div className="header">
        <h1>Pokédex Dashboard</h1>
        <p>Exploring the first 100 Pokémon using the PokéAPI.</p>
      </div>

      {list && (
        <div className="stats">
          <p>Most Common Type: {mostCommonType}</p>
          <p>Average Height: {(list.reduce((s, p) => s + p.height, 0) / list.length).toFixed(1)}</p>
          <p>Average Weight: {(list.reduce((s, p) => s + p.weight, 0) / list.length).toFixed(1)}</p>
        </div>
      )}

      {list && (
        <div className="charts">
          <div className="chart-box">
            <h2>Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeCounts} margin={{ top: 8, right: 16, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" angle={-45} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#aa3bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h2>Top 8 Pokémon by Total Stats</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={topStatPokemon}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                <Radar name="HP" dataKey="hp" stroke="#aa3bff" fill="#aa3bff" fillOpacity={0.25} />
                <Radar name="Attack" dataKey="attack" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Radar name="Defense" dataKey="defense" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="search-row">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
        />
        {list && (
          <select className="type-filter" onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All Types</option>
            {[...new Set(list.flatMap((p) => p.types.map((t) => t.type.name)))].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        )}
      </div>

      <div className="pokemon-grid">
        {filtered.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.name} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
            <p>Type: {p.types.map((t) => t.type.name).join(", ")}</p>
            <p>Height: {p.height} | Weight: {p.weight}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
