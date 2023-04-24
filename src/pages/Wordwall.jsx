import React, { useEffect, useRef } from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"
import fetchRandomPokemon from "./../utils/fetchRandomPokemon"
import fetchGen1 from "../utils/fetchGen1"
import styles from "./Wordwall.module.css"

import { Link } from "react-router-dom"

import useTimer from "easytimer-react-hook"
import { Timer } from "easytimer.js"
import ScoreTimer from "../components/ScoreTimer"
import "font-awesome/css/font-awesome.min.css"
import { capitaliseFirstLetter } from "../utils/generalUtils"
import {
  generateBoxes,
  generateRevealOrder,
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"
import WordWallResult from "../components/WordWallResult"

const timer = new Timer()

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)
  //   const [gameOver, setGameOver] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const [pokemon, setPokemon] = useState(null)
  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)

  const [pokemonOptions, setPokemonOptions] = useState([])

  const [correctAnswer, setCorrectAnswer] = useState(false)

  const [wrongAnswer, setWrongAnswer] = useState(false)

  const [outOfTime, setOutOfTime] = useState(false)

  const [isMuted, setIsMuted] = useState(false)
  const [revealAnswer, setRevealAnswer] = useState(false)

  const audioElement = useRef(null)

  const [questionNumber, setQuestionNumber] = useState(0)

  useEffect(() => {
    if (gameStart) {
      audioElement.current = new Audio("/audio/Pokemon-intro.mp3")
      audioElement.current.loop = true
      //   audioElement.current.volume = 0.2
      audioElement.current.volume = 0
      audioElement.current.play()
      return () => {
        audioElement.current.pause()
      }
      // } else {
      //   return () => {
      //     audioElement.current.pause()
      //   }
    }
  }, [gameStart])

  const toggleMute = () => {
    if (audioElement.current) {
      audioElement.current.muted = !audioElement.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = e => {
    if (audioElement.current) {
      audioElement.current.volume = e.target.value
    }
  }
  const timerData = ["days", "hours", "minutes", "seconds", "secondTenths"]

  const [grid, setGrid] = useState()
  const [toReveal, setToReveal] = useState()

  useEffect(() => {
    generateBoxes(20).then(res => setGrid(res))
    generateRevealOrder(20).then(res => setToReveal(res))
    setRevealAnswer(false)
  }, [])

  const toRevealRef = useRef()
  toRevealRef.current = toReveal

  const gridRef = useRef()
  gridRef.current = grid

  const qNumRef = useRef()
  qNumRef.current = questionNumber

  const handleClick = async () => {
    const data = await fetchRandomPokemon()
    setPokemon(data)
    generatePokemonOptions(data)
  }

  const handleGameStart = () => {
    setGameStart(true)
    handleClick()
    startCountdown(timer, startValue)
    setQuestionNumber(qNumRef.current + 1)
    generateBoxes(20).then(res => setGrid(res))
    generateRevealOrder(20).then(res => setToReveal(res))
    setRevealAnswer(false)
    setIsDisabled(false)
    setGameOver(false)

    timer.addEventListener("targetAchieved", async () => {
      setOutOfTime(true)
      pauseTimer(timer)
      revealAllBoxes()

      if (qNumRef.current >= 10) {
        setGameOver(true)
      } else {
        setTimeout(async () => {
          const data = await fetchRandomPokemon()
          setPokemon(data)
          generatePokemonOptions(data)
          setOutOfTime(false)
          resetTimer(timer)
          startCountdown(timer, startValue)
          generateBoxes(20).then(res => setGrid(res))
          generateRevealOrder(20).then(res => setToReveal(res))
          setRevealAnswer(false)
          setQuestionNumber(qNumRef.current + 1)
        }, 1000)
      }
    })

    timer.addEventListener("secondTenthsUpdated", async () => {
      let maxScore = 60 * 10 // 60 seconds
      let maxBoxes = 20 * 20 // 400 boxes

      let score = Number(
        timer.getTimeValues().toString(timerData).split(":").join("")
      )
      let scoreFr = (score + 1) / maxScore //+1 to ensure first iteration
      let boxToRevealFr = toRevealRef.current.length / maxBoxes
      let revealIdx = toRevealRef.current[0]

      //   console.log(score)
      //   console.log(scoreFr, boxToRevealFr)

      if (scoreFr <= boxToRevealFr) {
        let gridArr = [...gridRef.current]
        gridArr[revealIdx].colour = `rgba(0, 0, 0, 0)`
        setGrid(gridArr)

        setToReveal([...toRevealRef.current].slice(1))
      }
    })
  }

  const generatePokemonOptions = async correctPokemon => {
    const gen1Pokemon = await fetchGen1()
    const options = [correctPokemon]
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * gen1Pokemon.length)
      const randomPokemon = gen1Pokemon[randomIndex]
      if (!options.find(option => option.name === randomPokemon.name)) {
        options.push(randomPokemon)
      }
    }
    setPokemonOptions(options.sort(() => Math.random() - 0.5))
  }

  const handleAnswer = e => {
    const selectedOption = e.target.textContent
    if (selectedOption === capitaliseFirstLetter(pokemon.name)) {
      setTotalScore(
        prevScore =>
          prevScore +
          Number(timer.getTimeValues().toString(timerData).split(":").join(""))
      )
      setCorrectAnswer(true)
    } else {
      setWrongAnswer(true)
    }
    pauseTimer(timer)
    revealAllBoxes()

    setIsDisabled(true)

    if (qNumRef.current >= 10) {
      setGameOver(true)
    } else {
      setTimeout(async () => {
        generateBoxes(20).then(res => setGrid(res))
        generateRevealOrder(20).then(res => setToReveal(res))
        setRevealAnswer(false)
        const data = await fetchRandomPokemon()
        setPokemon(data)
        generatePokemonOptions(data)
        setCorrectAnswer(false)
        setWrongAnswer(false)
        resetTimer(timer)
        startCountdown(timer, startValue)
        setIsDisabled(false)
        setQuestionNumber(qNumRef.current + 1)
      }, 1000)
    }
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

  const [timer, isTargetAchieved] = useTimer({
    startValues: startValue,
    target: targetValue,
    countdown: true,
    precision: "secondTenths",
  })

  const handleCurrentScore = event => {
    setCurrentScore(event.target.value)
  }

  const handleRestart = () => {
    setGameStart(false)
    stopTimer(timer)
    generateBoxes(20).then(res => setGrid(res))
    generateRevealOrder(20).then(res => setToReveal(res))
    setTotalScore(0)
    setRevealAnswer(false)
    setGameOver(false)
    setQuestionNumber(0)
  }

  const revealAllBoxes = () => {
    let currentGrid = [...gridRef.current]
    let newGrid = []
    currentGrid.forEach(box => {
      newGrid.push({ colour: `rgba(0, 0, 0, 0)` })
    })
    setGrid(newGrid)
    setRevealAnswer(true)
  }

  return (
    <section className={styles.wordwall}>
      <h1 className="game-title">Who's that Pokemon?</h1>
      <Link to="/wordWallLeaderboard">Leaderboard</Link>
      {gameOver ? (
        <WordWallResult totalScore={totalScore} handleRestart={handleRestart} />
      ) : (
        <ScoreTimer
          timer={timer}
          startValue={startValue}
          totalScore={totalScore}
          handleCurrentScore={handleCurrentScore}
          questionNumber={questionNumber}
          handleRestart={handleRestart}
          handleGameStart={handleGameStart}
          gameStart={gameStart}
        />
      )}

      {gameStart ? (
        <div className="game">
          <div></div>
          {pokemon && (
            <PokemonCard pokemon={pokemon} timer={timer} grid={grid} />
          )}
          <div></div>

          <div className={`${styles["volume-mixer"]} ${styles.volumeWrapper}`}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolumeChange}
              defaultValue="0.2"
              style={{ verticalAlign: "middle", width: "100px" }}
            />
            <i
              className={`fa ${isMuted ? "fa-volume-off" : "fa-volume-up"}`}
              onClick={toggleMute}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            ></i>
          </div>
          <section className={styles.noteWrapper}>
            {correctAnswer && <h3 className={styles.note}>Correct! It's </h3>}
            {wrongAnswer && <h3 className={styles.note}>Wrong! It's </h3>}
            {outOfTime && <h3 className={styles.note}>Out of time! It's </h3>}
            {revealAnswer && (
              <>
                <h3 className={styles.note}>
                  <span className={styles.pokeName}>
                    {capitaliseFirstLetter(pokemon.name)}
                  </span>
                </h3>
                {/* <h4>
                {pokemon.name}, {pokemon.name}!
              </h4> */}
              </>
            )}
          </section>

          <section className={styles.optionsWrapper}>
            {pokemonOptions.map(option => (
              <button
                key={option.name}
                disabled={isDisabled}
                onClick={handleAnswer}
              >
                {capitaliseFirstLetter(option.name)}
              </button>
            ))}
          </section>
        </div>
      ) : (
        <section className={styles.instructionWrapper}>
          <h2>Rules:</h2>
          <span className={styles.instruction}>
            Guess which Pokemon is displayed on the screen.
          </span>
          <span className={styles.instruction}>
            The quicker the answer, the bigger the score.
          </span>
        </section>
      )}
      {/* <section className={styles.navButton}>
        {gameStart ? (
          <button onClick={handleRestart}>Restart</button>
        ) : (
          <button onClick={handleGameStart}>Start</button>
        )}
        <button>
          <Link to="/">Exit</Link>
        </button>
      </section> */}
    </section>
  )
}
