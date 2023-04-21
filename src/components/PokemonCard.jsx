import css from "./PokemonCard.module.css"
import BlackGrid from "./BlackGrid"

const PokemonCard = ({ pokemon, timer, grid }) => {
  return (
    <div className={css.pokemonCard}>
      {pokemon ? (
        <>
          <div
            className={css.pokemonImage}
            style={{
              backgroundImage: `url("${pokemon.sprites.front_default}")`,
            }}
          >
            {grid.map((box, index) => (
              <BlackGrid key={index} timer={timer} colour={box.colour} />
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PokemonCard
