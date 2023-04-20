import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"
import fetchRandomPokemon from "./../utils/fetchRandomPokemon"

import useTimer from "easytimer-react-hook"
import { Timer } from "easytimer.js"
import ScoreTimer from "../components/ScoreTimer"
// import { startCountdown } from "../utils/timerFunctions"

import {
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"
// import {} from "../utils/timerFunctions"

const timer = new Timer()

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)

  const [pokemon, setPokemon] = useState(null)

  const handleClick = async () => {
    setGameStart(true)
    const data = await fetchRandomPokemon()
    setPokemon(data)
  }

  const [userAnswer, setUserAnswer] = useState(null)

  const handleGameStart = () => {
    setGameStart(true)
    handleClick()
    startCountdown(timer, startValue)
  }

  const handleAnswer = e => {
    setUserAnswer(e.target.textContent)
    let timerData = ["days", "hours", "minutes", "seconds", "secondTenths"]
    setTotalScore(
      prevScore =>
        prevScore +
        Number(timer.getTimeValues().toString(timerData).split(":").join(""))
    )
    // setTotalScore(currentScore)
    // setCurrentScore(0)
    // stopTimer(timer)
    pauseTimer(timer)
    // resetTimer(timer)
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
          {pokemon && <PokemonCard pokemon={pokemon} />}
          <div></div>

          <button onClick={handleAnswer}>Pikachu</button>
          <button onClick={handleAnswer}>Charmander</button>
          <button onClick={handleAnswer}>Ditto</button>
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
