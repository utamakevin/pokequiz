import css from "./Trivia.module.css"
import fetchGen1 from "../utils/fetchGen1"
import { useEffect, useRef, useState } from "react"
import generateQuestion from "../utils/generateQuestion"
import TriviaQuestion from "../components/TriviaQuestion"
import TriviaAnswer from "../components/TriviaAnswer"
import { Link } from "react-router-dom"
import {
  capitaliseFirstLetter,
  getRandomElement,
  getRandomNumber,
} from "../utils/generalUtils"

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
    genOneData.push("Trick question!")
    setGenOne(genOneData)
    handleNewQ(genOneData)
  }

  const handleNewQ = async pokeData => {
    setIsRevealed(false)
    const newQuestion = await generateQuestion()
    setQuestion(newQuestion)
    generateAnswer(newQuestion, pokeData)
  }

  const generateAnswer = (question, pokeData) => {
    let answer = question.answer
    const newOptions = []
    if (typeof answer === `string`) {
      newOptions.push(capitaliseFirstLetter(answer))
    } else {
      newOptions.push(answer)
    }
    const habitats = [
      `Cave`,
      `Forest`,
      `Grassland`,
      `Mountain`,
      `Rare`,
      `Rough-terrain`,
      `Sea`,
      `Urban`,
      `Waters-edge`,
    ]
    const nameGroup = [1, 3, 4, 6]
    const pokedexGroup = [2]
    const habitatGroup = [5]

    function checkOption(option) {
      if (!newOptions.includes(option)) {
        newOptions.push(option)
      }
    }

    if (nameGroup.includes(question.id)) {
      while (newOptions.length < 3) {
        const randomOption = capitaliseFirstLetter(
          getRandomElement(pokeData).name
        )
        checkOption(randomOption)
      }
    }
    if (pokedexGroup.includes(question.id)) {
      while (newOptions.length < 3) {
        const randomOption = getRandomNumber(151) + 1
        checkOption(randomOption)
      }
    }
    if (habitatGroup.includes(question.id)) {
      while (newOptions.length < 3) {
        const randomOption = capitaliseFirstLetter(getRandomElement(habitats))

        checkOption(randomOption)
      }
    }
    setOptions(newOptions.sort(() => Math.random() - 0.5))
  }

  const checkAnswer = selectedOption => {
    if (selectedOption === question.answer) {
      setFeedback("Correct!")
    } else {
      setFeedback("Wrong!")
    }
    setTimeout(() => {
      handleNewQ(genOne)
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
