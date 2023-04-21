import css from "./Trivia.module.css"
import fetchGen1 from "../utils/fetchGen1"
import { useEffect, useState } from "react"
import generateQuestion from "../utils/generateQuestion"
import TriviaQuestion from "../components/TriviaQuestion"
import TriviaAnswer from "../components/TriviaAnswer"
import { Link } from "react-router-dom"

export default function Trivia() {
  const [genOne, setGenOne] = useState([])
  const [question, setQuestion] = useState("")
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    fetchGen1().then(res => setGenOne(res))

    generateQuestion().then(res => setQuestion(res))
  }, [])

  const handleNewQ = () => {
    setIsRevealed(false)
    generateQuestion().then(res => setQuestion(res))
  }

  const handleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  return (
    <main className={css.triviaWrapper}>
      <h1>Trivia</h1>
      <Link to="/">
        exit
      </Link>
      <section>
        <TriviaQuestion question={question} />
        {isRevealed && <TriviaAnswer question={question} />}
        <button onClick={handleNewQ}>New Question</button>
        <button onClick={handleReveal}>Reveal Answer</button>
      </section>
    </main>
  )
}
