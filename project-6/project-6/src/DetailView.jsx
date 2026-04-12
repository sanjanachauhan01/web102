import { useParams, Link } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer
} from 'recharts'

function DetailView({ list }) {
  const { id } = useParams()
  const pokemon = list?.find((p) => p.id === parseInt(id))

  if (!list) return <div className="detail-loading">Loading...</div>
  if (!pokemon) return <div className="detail-loading">Pokémon not found. <Link to="/">Back to dashboard</Link></div>

  const statData = pokemon.stats.map((s) => ({
    stat: s.stat.name,
    value: s.base_stat,
  }))

  const abilities = pokemon.abilities.map((a) => a.ability.name).join(', ')
  const moves = pokemon.moves.slice(0, 10).map((m) => m.move.name).join(', ')
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)

  return (
    <div className="detail">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <div className="detail-header">
        <img
          src={pokemon.sprites.other['official-artwork']?.front_default ?? pokemon.sprites.front_default}
          alt={pokemon.name}
          className="detail-sprite"
        />
        <div className="detail-info">
          <h1>{pokemon.name} <span className="detail-id">#{String(pokemon.id).padStart(3, '0')}</span></h1>
          <p><strong>Types:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
          <p><strong>Total Base Stats:</strong> {totalStats}</p>
          <p><strong>Abilities:</strong> {abilities}</p>
          <p><strong>Sample Moves:</strong> {moves}</p>
        </div>
      </div>

      <div className="detail-stats">
        <h2>Base Stats</h2>
        <div className="stat-bars">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="stat-row">
              <span className="stat-name">{s.stat.name}</span>
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                />
              </div>
              <span className="stat-value">{s.base_stat}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={statData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" />
            <Radar dataKey="value" stroke="#aa3bff" fill="#aa3bff" fillOpacity={0.4} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="detail-sprites">
        <h2>Sprites</h2>
        <div className="sprites-row">
          {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt="front" />}
          {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt="back" />}
          {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt="front shiny" />}
          {pokemon.sprites.back_shiny && <img src={pokemon.sprites.back_shiny} alt="back shiny" />}
        </div>
      </div>
    </div>
  )
}

export default DetailView
