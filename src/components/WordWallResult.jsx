import { useState } from "react"
import css from "./ScoreTimer.module.css"
import { saveResult } from "./../utils/wordWallLeaderboard_api"
// import css from "./WordWallResult.module.css"

export default function WordWallResult({ totalScore, handleRestart }) {
  const [username, setUsername] = useState()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = () => {
    saveResult(username, totalScore).then(res => console.log(res))
    setIsSubmitted(true)
  }

  return (
    <section className={css.gameOverWrapper}>
      <h1>Game Over!</h1>
      <h3>Your score: {totalScore}</h3>
      {isSubmitted ? (
        <section className={css.gameOverBtnWrapper}>
          <button className={css.gameOverBtn} onClick={handleRestart}>
            Play again?
          </button>
          <button className={css.gameOverBtn} onClick={handleRestart}>
            Exit?
          </button>
        </section>
      ) : (
        <>
          <p className={css.p}>Enter your name</p>
          <input type="text" onChange={handleChange} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </section>
  )
}
