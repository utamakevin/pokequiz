function getRandomNumber(number) {
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
  ]

  let randomQ = questionList[getRandomNumber(questionList.length)]
  console.log(randomQ)
  return randomQ
}

async function processQuestion(question) {
  let data = {}
  if (question.endpointCat === `randomSpecies`) {
    await randomSpecies().then(res => {
      if (question.id === 1) {
        data.question = question.name.replace(/\$/, res.id)
        data.answer = res.name
      }
      if (question.id === 2) {
        data.question = question.name.replace(/\$/, res.name)
        data.answer = res.id
      }

      if (question.id === 3) {
        data.question = question.name.replace(/\$/, res.name)
        data.question2 = `If it can't evolve, answer with its own name"`

        async function getEvolution() {
          return await fetch(res.evolution_chain.url).then(res => res.json())
        }

        getEvolution().then(res => {
          const evolutionArr = res.chain.evolves_to
          if (evolutionArr.length > 0) {
            data.answer = evolutionArr[0].species.name
            // console.log(data)
          } else {
            data.answer = "trick question!"
          }
        })
      }
      if (question.id === 4) {
        let englishBlueFlavour

        for (let flavour of res.flavor_text_entries) {
          if (flavour.version.name == "blue" && flavour.language.name == "en") {
            englishBlueFlavour = flavour.flavor_text.split("\n").join(" ")
          }
        }

        data.question = question.name.split("\n")[0]
        data.question2 = `"${
          question.name.replace(/\$/, englishBlueFlavour).split("\n")[1]
        }"`
        data.answer = res.name
      }
      if (question.id === 5) {
        data.question = question.name.replace(/\$/, res.name)
        data.question2 = `options: cave, forest, grassland, mountain, rare, rough-terrain, sea, urban, waters-edge`
        data.answer = res.habitat.name
      }
    })
  }
  //   if (question.endpointCat === `randomLocation`) {
  //     await randomLocation().then(res => {
  //       let promise = new Promise(function (myResolve, myReject) {
  //         myResolve(fetch(res))
  //       })

  //       if (question.id === 6) {
  //         promise.then(res => {
  //           data.question = question.name.replace(/\$/, res.name)
  //           data.answer = res.habitat.name
  //         })
  //       }

  //     })
  //   }

  return data
}

export default async function generateQuestion() {
  return processQuestion(await getRandomQuestion())
}
