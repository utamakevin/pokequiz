import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"
import fetchRandomPokemon from "./../utils/fetchRandomPokemon"

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)

  const [pokemon, setPokemon] = useState(null)

  const handleClick = async () => {
    setGameStart(true)
    const data = await fetchRandomPokemon()
    setPokemon(data)

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
          {pokemon && <PokemonCard pokemon={pokemon} />}
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
