import { useState } from "react"
import css from "./ScoreTimer.module.css"
import {
  pauseTimer,
  resetTimer,
  startCountdown,
  stopTimer,
} from "../utils/timerFunctions"

export default function ScoreTimer(props) {
  return (
    <section className={css.timerWrapper}>
      <div className={css.timerDisplay}>
        {props.timer.getTimeValues().toString(["minutes", "seconds"])}
      </div>
      <div className={css.buttonWrapper}>
        <button
          disabled
          onClick={() => {
            props.startCountdown(props.timer, props.startValue)
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            props.pauseTimer(props.timer)
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            props.stopTimer(props.timer)
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            props.resetTimer(props.timer)
          }}
        >
          Reset
        </button>
      </div>
    </section>
  )
}
