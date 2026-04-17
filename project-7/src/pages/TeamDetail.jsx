import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase.js'

function TeamDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await supabase
        .from('team')
        .select()
        .eq('id', id)
        .single()
      setPokemon(data)
    }
    fetchPokemon()
  }, [id])

  if (!pokemon) return <p style={{ padding: 32 }}>Loading...</p>

  return (
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate('/team')}>← Back to Team</button>
      <div className="detail-card">
        <img src={pokemon.image_url} alt={pokemon.pokemon_name} className="detail-img" />
        <h1>{pokemon.nickname || pokemon.pokemon_name}</h1>
        <p><strong>Pokémon:</strong> {pokemon.pokemon_name}</p>
        <p><strong>HP:</strong> {pokemon.hp}</p>
        <p><strong>Moves:</strong> {pokemon.moves}</p>
        <div className="card-actions">
          <button className="btn-edit" onClick={() => navigate(`/edit/${pokemon.id}`)}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default TeamDetail
