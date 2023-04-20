
import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)
  const [userAnswer, setUserAnswer] = useState(null)

  const handleGameStart = () => {
    setGameStart(true)
  }

  const handleAnswer = e => {
    setUserAnswer(e.target.textContent)
  }

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      {gameStart ? (
        <div className="game">
          <button onClick={() => setGameStart(false)}>Restart</button>
          <h2>Who's that Pokemon?</h2>
          <PokemonCard />
          <div></div>
          <button onClick={handleAnswer} >Pikachu</button><button onClick={handleAnswer}>Charmander</button><button onClick={handleAnswer}>Ditto</button>
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

