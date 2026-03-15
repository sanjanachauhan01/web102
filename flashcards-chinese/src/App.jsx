import { useState } from 'react'
import './App.css'
import Card from './Card'
import Arrow from './Arrow'
import chinaBackground from './assets/china-background.jpg'

const cards = [
  { question: "Hello", answer: "nǐ hǎo / 你好" },
  { question: "Thank you", answer: "xiè xiè / 谢谢" },
  { question: "You're welcome", answer: "bù kèqì / 不客气" },
  { question: "Goodbye", answer: "zàijiàn / 再见" },
  { question: "Sorry / Excuse me", answer: "duìbuqǐ / 对不起" },
  { question: "Yes", answer: "shì / 是" },
  { question: "No", answer: "bù shì / 不是" },
  { question: "I don't understand", answer: "wǒ tīng bù dǒng / 我听不懂" },
  { question: "How much does it cost?", answer: "duōshǎo qián? / 多少钱？" },
  { question: "Where is the bathroom?", answer: "xǐshǒujiān zài nǎlǐ? / 洗手间在哪里？" },
]

function App() {
  const [currentCard, setCurrentCard] = useState(0)

  function handleLeft() {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }

  function handleRight() {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${chinaBackground})` }}>
      <div className="header">
        <h1>Chinese Flashcards</h1>
        <p>Level up with 10 basic chinese phrases, front side has the english meaning and back side has the chinese meaning. Click to reveal answer, and use arrows to move onto next card.</p>
      </div>
      <div className="card-container">
        <Card key={currentCard} question={cards[currentCard].question} answer={cards[currentCard].answer} />
      </div>
      <div className="arrow-container">
        <Arrow direction="left" onClick={handleLeft} />
        <span className="card-counter">{currentCard + 1} / {cards.length}</span>
        <Arrow direction="right" onClick={handleRight} />
      </div>
    </div>
  )
}

export default App
