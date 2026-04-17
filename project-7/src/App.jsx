import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import CurrentTeam from './pages/CurrentTeam.jsx'
import AddPokemon from './pages/AddPokemon.jsx'
import TeamDetail from './pages/TeamDetail.jsx'

function App() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <h2>Menu</h2>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/team">Current Team</NavLink>
        <NavLink to="/add">Add a Pokémon</NavLink>
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<CurrentTeam />} />
          <Route path="/team/:id" element={<TeamDetail />} />
          <Route path="/add" element={<AddPokemon />} />
          <Route path="/edit/:id" element={<AddPokemon />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
