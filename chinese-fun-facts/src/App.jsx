import { useState } from 'react'
import './App.css'
import Card from './Card'
import Arrow from './Arrow'
import chinaBackground from './assets/china-background.jpg'

const cards = [
  { question: "What is the most spoken language in the world?", answer: "Mandarin Chinese" },
  { question: "How many characters are in the Chinese writing system?", answer: "Over 50,000" },
  { question: "What is the world's oldest continuous civilization?", answer: "China" },
  { question: "What did China invent that we use to write?", answer: "Paper" },
  { question: "What explosive invention came from China?", answer: "Gunpowder" },
  { question: "What navigation tool did China invent?", answer: "The compass" },
  { question: "What is China's national animal?", answer: "Giant panda" },
  { question: "What ancient structure stretches over 13,000 miles?", answer: "The Great Wall" },
  { question: "What printing method did China invent first?", answer: "Woodblock printing" },
  { question: "What drink did China give to the world?", answer: "Tea" },
]

function App() {
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [answerFeedback, setAnswerFeedback] = useState('')

  function handleLeft() {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setFlipped(false)
      setUserAnswer('')
    }
  }

  function handleRight() {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setFlipped(false)
      setUserAnswer('')
    }
  }

  function handleAnswerSubmit() {
    if (flipped) {
      alert("Please submit your answer before flipping the card.");
    } else {
      if (userAnswer.toLowerCase() === cards[currentCard].answer.toLowerCase()) {
        setAnswerFeedback("Correct! Great job!");
      } else if (cards[currentCard].answer.toLowerCase().includes(userAnswer.toLowerCase())) {
        setAnswerFeedback("Almost there! Your answer is partially correct. Try again!");
      } else {
        setAnswerFeedback("Incorrect. Try again!");
      }
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${chinaBackground})` }}>
      <div className="header">
        <h1>Chinese Fun Facts</h1>
        <p>Test your knowledge of China! Click the card to reveal the answer, and use the arrows to explore all 10 facts.</p>
      </div>
      <div className="card-container">
        <Card question={cards[currentCard].question} answer={cards[currentCard].answer} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
      </div>
      <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Type your answer here..." className="answer-input" />
      <button className="submit-button" onClick={handleAnswerSubmit}>Submit</button>
      <p className="answer-feedback">{answerFeedback}</p>
      <div className="arrow-container">
        <Arrow direction="left" onClick={handleLeft} />
        <span className="card-counter">{currentCard + 1} / {cards.length}</span>
        <Arrow direction="right" onClick={handleRight} />
      </div>
    </div>
  )
}

export default App
