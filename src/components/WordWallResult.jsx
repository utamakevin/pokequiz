export default function WordWallResult({ totalScore, handleRestart }) {
  return (
    <section>
      <h1>Game Over!</h1>
      <h3>Your score: {totalScore}</h3>
      <button onClick={handleRestart}>Play again?</button>
    </section>
  )
}
