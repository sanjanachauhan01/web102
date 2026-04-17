import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase.js'

function CurrentTeam() {
  const [team, setTeam] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase
        .from('team')
        .select()
        .order('created_at', { ascending: true })
      setTeam(data)
    }
    fetchTeam()
  }, [])

  async function handleDelete(e, id) {
    e.stopPropagation()
    const { error } = await supabase.from('team').delete().eq('id', id)
    if (!error) setTeam((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="header">
        <h1>Current Team</h1>
        <p>Your selected Pokémon team will appear here.</p>
      </div>

      {team && team.length > 0 ? (
        <div className="team-grid">
          {team.map((p) => (
            <div key={p.id} className="team-card" onClick={() => navigate(`/team/${p.id}`)}>
              <img src={p.image_url} alt={p.pokemon_name} />
              <h2>{p.nickname || p.pokemon_name}</h2>
              <p><strong>Pokémon:</strong> {p.pokemon_name}</p>
              <p><strong>HP:</strong> {p.hp}</p>
              <div className="card-actions">
                <button className="btn-edit" onClick={(e) => { e.stopPropagation(); navigate(`/edit/${p.id}`) }}>Edit</button>
                <button className="btn-delete" onClick={(e) => handleDelete(e, p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: 'center', color: '#9ca3af' }}>No Pokémon on your team yet!</h2>
      )}
    </div>
  )
}

export default CurrentTeam
