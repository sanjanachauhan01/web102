import { useState } from 'react'
import './Card.css'

function Card({question, answer}) {
  const [flipped, setFlipped] = useState(false)

  function handleFlip() {
    setFlipped(!flipped)
  }

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      {flipped
        ? <p className='answerText'>{answer}</p>
        : <p className='questionText'>{question}</p>
      }
      <p className='flip-hint'>{flipped ? 'click to see question' : 'click to reveal answer'}</p>
    </div>
  )
}

export default Card
