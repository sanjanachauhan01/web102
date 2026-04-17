import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase.js'

function AddPokemon() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [pokemonList, setPokemonList] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [nickname, setNickname] = useState('')
  const [hp, setHp] = useState('')
  const [moves, setMoves] = useState('')

  // Load the full pokemon list from the API
  useEffect(() => {
    async function fetchPokemonList() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      const data = await res.json()
      setPokemonList(data.results)
    }
    fetchPokemonList()
  }, [])

  // If editing, load existing record from Supabase and pre-fill fields
  useEffect(() => {
    if (!isEditing) return
    async function fetchExisting() {
      const { data } = await supabase.from('team').select().eq('id', id).single()
      if (!data) return
      setNickname(data.nickname || '')
      setHp(data.hp || '')
      setMoves(data.moves || '')
      // Reconstruct a minimal selectedPokemon object from saved data
      setSelectedPokemon({
        name: data.pokemon_name,
        id: data.pokemon_id,
        sprites: { front_default: data.image_url },
      })
    }
    fetchExisting()
  }, [id, isEditing])

  async function handlePokemonSelect(e) {
    const url = e.target.value
    if (!url) { setSelectedPokemon(null); return }
    const res = await fetch(url)
    const data = await res.json()
    setSelectedPokemon(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedPokemon) return

    const entry = {
      pokemon_name: selectedPokemon.name,
      pokemon_id: selectedPokemon.id,
      image_url: selectedPokemon.sprites.front_default,
      nickname,
      hp: parseInt(hp),
      moves,
    }

    if (isEditing) {
      const { error } = await supabase.from('team').update(entry).eq('id', id)
      if (error) console.error(error)
      else navigate('/team')
    } else {
      const { error } = await supabase.from('team').insert([entry])
      if (error) console.error(error)
      else navigate('/team')
    }
  }

  return (
    <>
      <div className="header">
        <h1>{isEditing ? 'Edit Pokémon' : 'Add a Pokémon'}</h1>
        <p>{isEditing ? 'Update your Pokémon details.' : 'Add a Pokémon to your team here.'}</p>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="pokemonSelect">Pokémon</label>
        <select
          id="pokemonSelect"
          onChange={handlePokemonSelect}
          value={pokemonList.find((p) => p.name === selectedPokemon?.name)?.url || ''}
        >
          <option value="" disabled>Select a Pokémon...</option>
          {pokemonList.map((p) => (
            <option key={p.name} value={p.url}>{p.name}</option>
          ))}
        </select>

        {selectedPokemon && (
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
            className="pokemon-preview"
          />
        )}

        <label htmlFor="nickname">Nickname</label>
        <input
          id="nickname"
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label htmlFor="hp">HP</label>
        <input
          id="hp"
          type="number"
          placeholder="HP"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />

        <label htmlFor="moves">Moves</label>
        <input
          id="moves"
          type="text"
          placeholder="e.g. Tackle, Ember, Surf"
          value={moves}
          onChange={(e) => setMoves(e.target.value)}
        />

        <button type="submit" disabled={!selectedPokemon}>
          {isEditing ? 'Save Changes' : 'Add to Team'}
        </button>
        {isEditing && (
          <button type="button" className="btn-cancel" onClick={() => navigate('/team')}>
            Cancel
          </button>
        )}
      </form>
    </>
  )
}

export default AddPokemon
