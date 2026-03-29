import { useState } from 'react'
import './App.css'
import ArtCard from './ArtCard'
import BanList from './BanList'

const API_KEY = '8e29554f-66ed-4a92-9687-f4b077bf7acd'

function App() {
  const [art, setArt] = useState(null)
  const [banList, setBanList] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function fetchArtwork() {
    setLoading(true)
    setSearched(true)
    const page = Math.floor(Math.random() * 100) + 1
    const url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&size=10&page=${page}&hasimage=1&fields=id,title,dated,culture,classification,primaryimageurl,people`

    try {
      const response = await fetch(url)
      const data = await response.json()

      const filtered = data.records.filter((record) => {
        if (!record.primaryimageurl) return false
        if (banList.some(b => b.type === 'culture' && b.value === record.culture)) return false
        if (banList.some(b => b.type === 'classification' && b.value === record.classification)) return false
        if (banList.some(b => b.type === 'artist' && b.value === record.people?.[0]?.name)) return false
        return true
      })

      if (filtered.length === 0) {
        setArt(null)
      } else {
        const pick = filtered[Math.floor(Math.random() * filtered.length)]
        setArt(pick)
      }
    } catch (err) {
      console.error('Fetch failed:', err)
      setArt(null)
    }
    setLoading(false)
  }

  function handleBan(value, type) {
    if (!banList.find(b => b.value === value && b.type === type)) {
      setBanList([...banList, { value, type }])
    }
  }

  function handleUnban(value, type) {
    setBanList(banList.filter(b => !(b.value === value && b.type === type)))
  }

  return (
    <div className="app">
      <div className="main">
        <h1 className="title">Art Randomizer</h1>
        <p className="subtitle">Discover art from the Harvard Art Museums.</p>
        <button className="discover-btn" onClick={fetchArtwork} disabled={loading}>
          {loading ? 'Loading...' : '🎲 Discover'}
        </button>
        {art
          ? <ArtCard art={art} banList={banList} onBan={handleBan} />
          : searched && !loading && <p className="no-results">No results matched your filters. Try removing some ban list items.</p>
        }
      </div>
      <BanList banList={banList} onUnban={handleUnban} />
    </div>
  )
}

export default App
