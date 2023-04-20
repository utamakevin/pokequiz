import React, { useState, useEffect } from "react"
import "./PokemonCard.css"

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    )
    const data = await response.json()
    setPokemon(data)
  }

  return (
    <div className="pokemon-card">
      {pokemon ? (
        <>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PokemonCard
