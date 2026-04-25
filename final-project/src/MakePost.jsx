import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'
import { UsernameContext } from './App.jsx'
import './MakePost.css'

function MakePost() {
  const navigate = useNavigate()
  const username = useContext(UsernameContext)
  const [formData, setFormData] = useState({
    postName: '',
    username: username || '',
    description: '',
    link: '',
  })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await supabase
      .from('post-table')
      .insert([{ ...formData, likes: 0 }])
    setSubmitting(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <main>
      <h2>Create a Post</h2>
      <form className="make-post-form" onSubmit={handleSubmit}>
        <label htmlFor="postName">Post Title</label>
        <input
          id="postName"
          name="postName"
          type="text"
          placeholder="Give your playlist a title"
          value={formData.postName}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          readOnly
          style={{ background: '#f9f9f9', color: '#888', cursor: 'not-allowed' }}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Tell us about your playlist..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />

        <label htmlFor="link">Playlist Link</label>
        <input
          id="link"
          name="link"
          type="url"
          placeholder="https://open.spotify.com/playlist/..."
          value={formData.link}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: '#FF3CAC', fontSize: '0.88rem' }}>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </main>
  )
}

export default MakePost
