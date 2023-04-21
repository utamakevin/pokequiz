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
      <Link to="/" className={css.exit}>
        Exit
      </Link>
      <section>
        <div className={css.text}>
          <TriviaQuestion question={question} />
          {isRevealed && (
            <div className={css.answer}>
              <TriviaAnswer question={question} />
            </div>
          )}
        </div>
        <div className={css.buttons}>
          <button className={css.button} onClick={handleNewQ}>
            New Question
          </button>
          {isRevealed ? (
            <button className={css.button} onClick={handleReveal}>
              Hide answer
            </button>
          ) : (
            <button className={css.button} onClick={handleReveal}>
              Reveal answer
            </button>
          )}
        </div>
      </section>
    </main>
  )
}
