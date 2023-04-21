import css from "./PokemonCard.module.css"
import BlackGrid from "./BlackGrid"

const PokemonCard = ({ pokemon, timer }) => {
  const grid = "blackBox,"
    .repeat(20 * 20)
    .split(",")
    .slice(0, -1)

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
              <BlackGrid key={index} timer={timer} />
            ))}
          </div>
          <h3>{pokemon.name}</h3>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default PokemonCard
