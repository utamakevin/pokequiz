import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"
import fetchRandomPokemon from "./../utils/fetchRandomPokemon"
import fetchGen1 from "../utils/fetchGen1"
import { useEffect } from "react"
import { useRef } from "react"

import useTimer from "easytimer-react-hook"
import { Timer } from "easytimer.js"
import ScoreTimer from "../components/ScoreTimer"
import "font-awesome/css/font-awesome.min.css"
// import { startCountdown } from "../utils/timerFunctions"

import {
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"

const timer = new Timer()

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)

  const [pokemon, setPokemon] = useState(null)

  const [pokemonOptions, setPokemonOptions] = useState([])

  const [correctAnswer, setCorrectAnswer] = useState(false)

  const [wrongAnswer, setWrongAnswer] = useState(false)

  const [outOfTime, setOutOfTime] = useState(false)

  const [isMuted, setIsMuted] = useState(false)

  const audioElement = useRef(null)

  useEffect(() => {
    if (gameStart) {
      audioElement.current = new Audio("/audio/Pokemon-intro.mp3")
      audioElement.current.loop = true
      audioElement.current.play()
      return () => {
        audioElement.current.pause()
      }
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

  const handleClick = async () => {
    setGameStart(true)
    const data = await fetchRandomPokemon()
    setPokemon(data)
    generatePokemonOptions(data)
  }

  const handleGameStart = () => {
    setGameStart(true)
    handleClick()
    startCountdown(timer, startValue)

    timer.addEventListener("targetAchieved", async () => {
      setOutOfTime(true)
      pauseTimer(timer)

      setTimeout(async () => {
        const data = await fetchRandomPokemon()
        setPokemon(data)
        generatePokemonOptions(data)
        setOutOfTime(false)
        resetTimer(timer)
        startCountdown(timer, startValue)
      }, 1000)
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
    if (selectedOption === pokemon.name) {
      let timerData = ["days", "hours", "minutes", "seconds", "secondTenths"]
      setTotalScore(
        prevScore =>
          prevScore +
          Number(timer.getTimeValues().toString(timerData).split(":").join(""))
      )
      setCorrectAnswer(true)
      pauseTimer(timer)
    } else {
      setWrongAnswer(true)
      pauseTimer(timer)
    }

    setTimeout(async () => {
      const data = await fetchRandomPokemon()
      setPokemon(data)
      generatePokemonOptions(data)
      setCorrectAnswer(false)
      setWrongAnswer(false)
      resetTimer(timer)
      startCountdown(timer, startValue)
    }, 1000)
  }

  const [startValue, setStartValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 10,
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

  const [totalScore, setTotalScore] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)

  const handleCurrentScore = event => {
    // console.log(event.target.value)
    setCurrentScore(event.target.value)
    // setCurrentScore(2)
  }

  const handleRestart = () => {
    setGameStart(false)
    stopTimer(timer)
  }

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      <ScoreTimer
        timer={timer}
        startValue={startValue}
        totalScore={totalScore}
        handleCurrentScore={handleCurrentScore}
      />
      {gameStart ? (
        <div className="game">
          <button onClick={handleRestart}>Restart</button>
          <h2>Who's that Pokemon?</h2>
          {correctAnswer && <h3>Correct!</h3>}
          {wrongAnswer && <h3>Wrong!</h3>}
          {outOfTime && <h3>Out of time!</h3>}
          {pokemon && <PokemonCard pokemon={pokemon} />}
          <div></div>

          {pokemonOptions.map(option => (
            <button key={option.name} onClick={handleAnswer}>
              {option.name}
            </button>
          ))}
          <div className="volume-mixer">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolumeChange}
              defaultValue="1"
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
        </div>
      ) : (
        <>
          <p>game instruction</p>
          <button onClick={handleGameStart}>start</button>
        </>
      )}
    </section>
  )
}
