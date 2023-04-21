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
  const [options, setOptions] = useState([])
  const [isRevealed, setIsRevealed] = useState(false)
  const [feedback, setFeedback] = useState("")

  // from here
  useEffect(() => {
    initialSetup()
  }, [])

  const initialSetup = async () => {
    const genOneData = await fetchGen1()
    setGenOne(genOneData)

    if (genOneData && genOneData.length > 0) {
      await handleNewQ()
    }
  }

  const handleNewQ = async () => {
    if (!genOne || genOne.length === 0) {
      return
    }

    setIsRevealed(false)
    const newQuestion = await generateQuestion()
    setQuestion(newQuestion)

    const newOptions = [newQuestion.answer]
    while (newOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * genOne.length)
      const randomOption = genOne[randomIndex].name
      if (!newOptions.includes(randomOption)) {
        newOptions.push(randomOption)
      }
    }

    setOptions(newOptions.sort(() => Math.random() - 0.5))
  }
  // to here is a little unstable on reload or if you
  // go exit then go back into the game it will not
  // display multiple choice options
  // most likely cause is because the genOne is not yet populated with data when the component first renders,
  // causing the randomOption line to throw an error when trying to access the name property.
  // saving the vsc code can make it work again

  const checkAnswer = selectedOption => {
    if (selectedOption === question.answer) {
      setFeedback("Correct!")
    } else {
      setFeedback("Wrong!")
    }
    setTimeout(() => {
      handleNewQ()
    }, 1000)
  }

  return (
    <main className={css.triviaWrapper}>
      <h1 className="game-title">Trivia</h1>
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
        <div className={css.feedback}>{feedback}</div>
        <div className={css.buttons}>
          {options.map(option => (
            <button
              className={css.button}
              key={option}
              onClick={() => checkAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
