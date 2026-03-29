import './ArtCard.css'

function ArtCard({ art, banList, onBan }) {
  const artist = art.people?.[0]?.name || null
  const culture = art.culture || null
  const classification = art.classification || null

  function isBanned(value, type) {
    return banList.some(b => b.value === value && b.type === type)
  }

  return (
    <div className="art-card">
      <img src={art.primaryimageurl} alt={art.title} className="art-image" />
      <div className="art-info">
        <h2 className="art-title">{art.title}</h2>
        <p className="art-dated">{art.dated || 'Date unknown'}</p>
        <div className="art-tags">
          {artist && (
            <span
              className={`art-tag ${isBanned(artist, 'artist') ? 'banned' : ''}`}
              onClick={() => onBan(artist, 'artist')}
            >
              Artist: {artist}
            </span>
          )}
          {culture && (
            <span
              className={`art-tag ${isBanned(culture, 'culture') ? 'banned' : ''}`}
              onClick={() => onBan(culture, 'culture')}
            >
              Culture: {culture}
            </span>
          )}
          {classification && (
            <span
              className={`art-tag ${isBanned(classification, 'classification') ? 'banned' : ''}`}
              onClick={() => onBan(classification, 'classification')}
            >
              Type: {classification}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtCard
