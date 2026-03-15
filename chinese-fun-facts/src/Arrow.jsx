import './Arrow.css'

function Arrow({ direction, onClick }) {
  return (
    <button className="arrow" onClick={onClick}>
      {direction === 'left' ? '<-' : '->'}
    </button>
  )
}

export default Arrow
