import { useState } from "react"
import css from "./ScoreTimer.module.css"
import { saveResult } from "./../utils/wordWallLeaderboard_api"

export default function WordWallResult({ totalScore, handleRestart }) {
  const [username, setUsername] = useState()
  const [submitPrompt, setSubmitPrompt] = useState("")

  const handleChange = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = () => {
    saveResult(username, totalScore)
      .then(res => console.log(res))
    setSubmitPrompt("record submitted")
  }

  return (
    <section className={css.gameOverWrapper}>
      <h1>Game Over!</h1>
      <h3>Your score: {totalScore}</h3>
      <p>Enter your name</p>
      <input type="text" onChange={handleChange} />
      <span>{submitPrompt}</span>
      <button onClick={handleSubmit}>Submit</button>
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
