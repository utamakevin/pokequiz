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

import useTimer from "easytimer-react-hook"
import { Timer } from "easytimer.js"
import ScoreTimer from "../components/ScoreTimer"
import {
  generateBoxes,
  generateRevealOrder,
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"
import TriviaResult from "../components/TriviaResult"

export default function Trivia() {
  const [genOne, setGenOne] = useState([])
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([])
  const [isRevealed, setIsRevealed] = useState(false)
  const [feedback, setFeedback] = useState("")

  const [currentScore, setCurrentScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0)

  const [gameOver, setGameOver] = useState(false)
  const [outOfTime, setOutOfTime] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const qNumRef = useRef()
  qNumRef.current = questionNumber

  useEffect(() => {
    initialSetup()

    timer.addEventListener("targetAchieved", async () => {
      setOutOfTime(true)
      pauseTimer(timer)

      if (qNumRef.current >= 10) {
        setGameOver(true)
      } else {
        setTimeout(() => {
          setOutOfTime(false)
          resetTimer(timer)
          startCountdown(timer, startValue)
          setQuestionNumber(qNumRef.current + 1)
        }, 1000)
      }
    })

    return () => {
      timer.removeEventListener("targetAchieved")
    }
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
      setIsRevealed(true)
      setFeedback("Correct!")
      setTotalScore(
        prevScore =>
          prevScore +
          Number(timer.getTimeValues().toString(timerData).split(":").join(""))
      )
    } else {
      setIsRevealed(true)
      setFeedback("Wrong!")
    }

    pauseTimer(timer)

    if (qNumRef.current >= 10) {
      setGameOver(true)
    } else {
      setTimeout(() => {
        handleNewQ(genOne)
        setIsRevealed(false)
        resetTimer(timer)
        startCountdown(timer, startValue)
        setQuestionNumber(qNumRef.current + 1)
      }, 1000)
    }
  }

  const handleCurrentScore = event => {
    setCurrentScore(event.target.value)
  }

  const [startValue, setStartValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 60,
  })
  const [targetValue, setTargetValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const timerData = ["days", "hours", "minutes", "seconds", "secondTenths"]

  const [timer, isTargetAchieved] = useTimer({
    startValues: startValue,
    target: targetValue,
    countdown: true,
    precision: "secondTenths",
  })

  const handleGameStart = () => {
    setGameStarted(true)
    startCountdown(timer, startValue)
    setQuestionNumber(qNumRef.current + 1)

    timer.addEventListener("targetAchieved", async () => {
      setOutOfTime(true)
      pauseTimer(timer)

      if (qNumRef.current >= 10) {
        setGameOver(true)
      } else {
        setTimeout(() => {
          handleNewQ(genOne)
          setIsRevealed(false)
          setOutOfTime(false)
          resetTimer(timer)
          startCountdown(timer, startValue)
          setQuestionNumber(qNumRef.current + 1)
        }, 1000)
      }
    })
  }

  const handleRestart = () => {
    stopTimer(timer)
    setTotalScore(0)
    setIsRevealed(false)
    setGameOver(false)
    setQuestionNumber(0)
  }

  return (
    <main className={css.triviaWrapper}>
      <h1 className="game-title">Pokémon Trivia</h1>
      {gameOver ? (
        <TriviaResult totalScore={totalScore} handleRestart={handleRestart} />
      ) : (
        <ScoreTimer
          timer={timer}
          startValue={startValue}
          totalScore={totalScore}
          handleCurrentScore={handleCurrentScore}
          questionNumber={questionNumber}
          handleGameStart={handleGameStart}
        />
      )}
      {!gameStarted && (
        <div className={css.startRulesWrapper}>
          <h2>Rules:</h2>
          <ul>
            <li>Press start to play!</li>
            <li>You have 60 seconds to answer each quesiton!</li>
          </ul>
        </div>
      )}
      {gameStarted && (
        <section>
          <div className={css.text}>
            <TriviaQuestion question={question} />
            {isRevealed && (
              <div className={css.answer}>
                <div className={css.feedback}>{feedback}</div>
                {outOfTime && <div className={css.feedback}>Out of Time!</div>}
                <TriviaAnswer question={question} />
              </div>
            )}
          </div>
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
      )}
    </main>
  )
}
