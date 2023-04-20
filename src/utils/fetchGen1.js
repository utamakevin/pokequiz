export default function fetchGen1() {
  return fetch(`https://pokeapi.co/api/v2/generation/1`)
    .then(res => res.json())
    .then(res => res[`pokemon_species`])
}
