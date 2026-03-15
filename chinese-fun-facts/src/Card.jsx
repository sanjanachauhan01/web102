import './Card.css'

function Card({ question, answer, flipped, onFlip }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      {flipped
        ? <p className='answerText'>{answer}</p>
        : <p className='questionText'>{question}</p>
      }
      <p className='flip-hint'>{flipped ? 'click to see question' : 'click to reveal answer'}</p>
    </div>
  )
}

export default Card
