import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"
import fetchRandomPokemon from "./../utils/fetchRandomPokemon"

import useTimer from "easytimer-react-hook"
import { Timer } from "easytimer.js"
import ScoreTimer from "../components/ScoreTimer"
// import { startCountdown } from "../utils/timerFunctions"

import {
  startCountdown,
  stopTimer,
  pauseTimer,
  resetTimer,
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
    precision: "seconds",
    // updateWhenTargetAchieved: true,
  })

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      <ScoreTimer
        timer={timer}
        startCountdown={startCountdown}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
        pauseTimer={pauseTimer}
        startValue={startValue}
      />
      {gameStart ? (
        <div className="game">
          <button onClick={() => setGameStart(false)}>Restart</button>
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
