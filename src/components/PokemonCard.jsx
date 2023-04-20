import React from "react"
import "./PokemonCard.css"

const PokemonCard = ({ pokemon }) => {
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
