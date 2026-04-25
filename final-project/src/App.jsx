import { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Post from './Post.jsx'
import MakePost from './MakePost.jsx'
import PostDetail from './PostDetail.jsx'
import { supabase } from './supabase.js'

export const UsernameContext = createContext(null)
export { useContext }

function UsernameModal({ onSave }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSave(trimmed)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Welcome to 🎵 Playlist Forum</h2>
        <p>Choose a username to get started. Anyone with the same username will be treated as you.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. sanjana_banana"
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            required
          />
          <button type="submit">Let's go</button>
        </form>
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-brand">🎵 Playlist Forum</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create a Post</Link>
      </div>
    </nav>
  )
}

function Home() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('post-table')
        .select('*')
      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  const displayed = posts
    .filter(p => p.postName?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === 'likes'
        ? b.likes - a.likes
        : new Date(b.created_at) - new Date(a.created_at)
    )

  return (
    <main>
      <h2>Home Feed</h2>
      <div className="feed-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="created_at">Sort: Newest</option>
          <option value="likes">Sort: Top Liked</option>
        </select>
      </div>

      {displayed.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', marginTop: '2rem' }}>
          {search ? 'No posts match your search.' : 'No posts yet. Be the first!'}
        </p>
      ) : (
        displayed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            postName={post.postName}
            username={post.username}
            description={post.description}
            link={post.link}
            likes={post.likes}
            createdAt={post.created_at}
          />
        ))
      )}
    </main>
  )
}

function App() {
  const [username, setUsername] = useState(null)

  return (
    <BrowserRouter>
      <UsernameContext.Provider value={username}>
        {!username && <UsernameModal onSave={setUsername} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<MakePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </UsernameContext.Provider>
    </BrowserRouter>
  )
}

export default App
