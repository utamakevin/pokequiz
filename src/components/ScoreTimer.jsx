import { useState } from "react"
import css from "./ScoreTimer.module.css"
import {
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"

export default function ScoreTimer({
  timer,
  startValue,
  totalScore,
  handleCurrentScore,
  questionNumber,
}) {
  let timerData = ["days", "hours", "minutes", "seconds", "secondTenths"]

  return (
    <section className={css.timerWrapper}>
      <div className={css.timerDisplay}>
        {timer.getTimeValues().toString(["minutes", "seconds"])}
      </div>
      <div className={css.scoreWrapper}>
        <p>Score: {totalScore}</p>
        <p>Question {questionNumber}/10</p>
        <div
          //   type="text"
          value={Number(
            timer.getTimeValues().toString(timerData).split(":").join("")
          )}
          onChange={handleCurrentScore}
        >
          {}
        </div>
      </div>
      {/* <div className={css.buttonWrapper}>
        <button
          disabled
          onClick={() => {
            startCountdown(timer, startValue)
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            pauseTimer(timer)
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            stopTimer(timer)
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            resetTimer(timer)
          }}
        >
          Reset
        </button>
      </div> */}
    </section>
  )
}
