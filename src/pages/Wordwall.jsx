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
  }

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      <button onClick={() => setGameStart(false)}>Restart</button>
      {gameStart ? (
        <div className="game">
          <h2>Who's that Pokemon?</h2>
          {pokemon && <PokemonCard pokemon={pokemon} />}
          <div></div>
          <button>Pikachu</button>
          <button>Charmander</button>
          <button>Ditto</button>
        </div>
      ) : (
        <>
          <p>game instruction</p>
          <button onClick={handleClick}>start</button>
        </>
      )}
    </section>
  )
}
