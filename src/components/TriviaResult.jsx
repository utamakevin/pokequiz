import css from "./ScoreTimer.module.css"

export default function TriviaResult({ totalScore, handleRestart }) {
  return (
    <section className={css.gameOverWrapper}>
      <h1>Game Over!</h1>
      <h3>Your score: {totalScore}</h3>
      <section className={css.gameOverBtnWrapper}>
        <button className={css.gameOverBtn} onClick={handleRestart}>
          Play again?
        </button>
        <button className={css.gameOverBtn} onClick={handleRestart}>
          Exit?
        </button>
      </section>
    </section>
  )
}
