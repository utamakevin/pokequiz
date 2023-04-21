export function getRandomElement(array) {
  return array[getRandomNumber(array.length)]
}
export function getRandomNumber(number) {
  return Math.floor(Math.random() * number)
}
