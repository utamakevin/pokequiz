export function startCountdown(timer, startConfig) {
  timer.start({
    startValues: startConfig,
    target: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    countdown: true,
  })
}

export function stopTimer(timer) {
  timer.stop()
}

export function pauseTimer(timer) {
  timer.pause()
}
export function resetTimer(timer) {
  timer.reset()
}

export async function generateBoxes(dimension) {
  let arr = []
  for (let i = 0; i < dimension * dimension; i++) {
    // arr.push({ idx: i, colour: `rgba(0, 0, 0, 0.5)` })
    arr.push({ colour: `black` })
  }
  return arr
}

export async function generateRevealOrder(dimension) {
  // Fisher-Yates shuffle method
  let array = []
  for (let i = 0; i < dimension * dimension; i++) {
    array.push(i)
  }

  let currentIndex = array.length,
    randomIndex

  // While there are remaining elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

// export function revealAllBoxes() {}
