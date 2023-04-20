const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 151) + 1
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  const data = await response.json()
  return data
}

export default fetchRandomPokemon
