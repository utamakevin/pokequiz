import { capitaliseFirstLetter } from "./generalUtils"

export function getRandomNumber(number) {
  return Math.floor(Math.random() * number)
}

async function randomLocation() {
  return fetch(`https://pokeapi.co/api/v2/region/1`)
    .then(res => res.json())
    .then(data => data.locations[getRandomNumber(data.locations.length)])
}

async function randomSpecies() {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${getRandomNumber(151) + 1}`
  ).then(res => res.json())
}

async function getRandomQuestion() {
  const questionList = [
    {
      id: 1,
      name: "Which pokemon has the pokedex index of $?",
      endpointCat: "randomSpecies",
      category: "pokedex",
    },
    {
      id: 2,
      name: "What is the pokedex index of $?",
      endpointCat: "randomSpecies",
      category: "pokedex",
    },
    {
      id: 3,
      name: `What can $ evolve to?`,
      endpointCat: "randomSpecies",
      category: "evolution",
    },
    {
      id: 4,
      name: `Which pokemon has this pokedex entry in pokemon blue? \n $`,
      endpointCat: "randomSpecies",
      category: "pokedex",
    },
    {
      id: 5,
      name: "Where can you find $ in the wild?",
      endpointCat: "randomSpecies",
      category: "habitat",
    },
    {
      id: 6,
      name: "Which Pokémon is the pre-evolution of $?",
      endpointCat: "randomSpecies",
      category: "evolution",
    },
  ]

  let randomQ = questionList[getRandomNumber(questionList.length)]
  return randomQ
}

async function processQuestion(question) {
  let data = {}
  console.log(question.id)

  if (question.endpointCat === `randomSpecies`) {
    let res = await randomSpecies()
    function getEvolution() {
      return fetch(res.evolution_chain.url).then(res => res.json())
    }

    if (question.id === 1) {
      data.id = question.id
      data.question = question.name.replace(/\$/, res.id)
      data.answer = capitaliseFirstLetter(res.name)
    }
    if (question.id === 2) {
      data.id = question.id
      data.question = question.name.replace(
        /\$/,
        capitaliseFirstLetter(res.name)
      )
      data.answer = res.id
    }

    if (question.id === 3) {
      data.id = question.id
      data.question = question.name.replace(
        /\$/,
        capitaliseFirstLetter(res.name)
      )
      //   data.question2 = `If it can't evolve, answer with its own name"`

      const evo = await getEvolution()
      const evolutionArr = evo.chain.evolves_to
      if (evolutionArr.length > 0) {
        data.answer = capitaliseFirstLetter(evolutionArr[0].species.name)
      } else {
        data.answer = "Trick question!"
      }
    }
    if (question.id === 4) {
      let englishBlueFlavour

      for (let flavour of res.flavor_text_entries) {
        if (flavour.version.name === "blue" && flavour.language.name === "en") {
          englishBlueFlavour = flavour.flavor_text.split("\n").join(" ")
        }
      }
      data.id = question.id
      data.question = question.name.split("\n")[0]
      data.question2 = `"${
        question.name.replace(/\$/, englishBlueFlavour).split("\n")[1]
      }"`
      data.answer = capitaliseFirstLetter(res.name)
    }
    if (question.id === 5) {
      data.id = question.id
      data.question = question.name.replace(/\$/, res.name)
      data.question2 = `options: Cave, Forest, Grassland, Mountain, Rare, Rough-terrain, Sea, urban, Waters-edge`
      data.answer = capitaliseFirstLetter(res.habitat.name)
    }
    if (question.id === 6) {
      data.id = question.id
      data.question = question.name.replace(
        /\$/,
        capitaliseFirstLetter(res.name)
      )
      data.question2 = `If it can't evolve, answer with its own name"`

      const evo = await getEvolution()
      let prevEvolution = evo.chain

      while (
        prevEvolution.evolves_to.length > 0 &&
        prevEvolution.evolves_to[0] &&
        prevEvolution.evolves_to[0].species.name !== res.name
      ) {
        prevEvolution = prevEvolution.evolves_to[0]
      }

      if (prevEvolution.species.name !== res.name) {
        data.answer = capitaliseFirstLetter(prevEvolution.species.name)
      } else {
        data.answer = "trick question!"
      }
    }
  }

  return data
}

export default async function generateQuestion() {
  return processQuestion(await getRandomQuestion())
}
