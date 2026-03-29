import './BanList.css'

function BanList({ banList, onUnban }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <p className="ban-hint">Click a tag on the card to ban it. Click a banned item below to remove it.</p>
      {banList.length === 0
        ? <p className="ban-empty">No items banned yet.</p>
        : (
          <ul>
            {banList.map((item, i) => (
              <li key={i} className="ban-item" onClick={() => onUnban(item.value, item.type)}>
                <span className="ban-type">{item.type}</span>
                {item.value}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default BanList
