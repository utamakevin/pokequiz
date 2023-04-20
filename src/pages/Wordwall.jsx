
import React from "react"
import PokemonCard from "./../components/PokemonCard"
import { useState } from "react"

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)

  const handleClick = () => {
    setGameStart(true)
    console.log("click")
  }

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      {gameStart ? (
        <div className="game">
          <h2>Who's that Pokemon?</h2>
          <PokemonCard />
          <div></div>
          <button>Pikachu</button><button>Charmander</button><button>Ditto</button>
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

