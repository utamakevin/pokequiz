import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import css from "./WordWallLeaderboard.module.css"

export default function WordWallLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch("https://pokequiz-api.onrender.com/api/pokequiz/wordWallLeaderboard/")
      .then(res => res.json())
      .then(setLeaderboard)
  }, [])

  return (
    <>
      <h1 className={css.title}>Leaderboard</h1>
      <h2 className={css.title}>Top 5</h2>
      <Link to="/wordwall">Back</Link>
      <section>
        <div className={css.leaderboard}>
          <div className={css.left}>
            <div>User</div>
            <div>----</div>{" "}
          </div>
          <div className={css.right}>
            <div>Score</div>
            <div>----</div>{" "}
          </div>
        </div>
        {leaderboard.slice(0, 5).map(record => (
          <div className={css.leaderboard}>
            <div className={css.left}>{record.username}</div>
            <div className={css.right}>{record.score}</div>
          </div>
          // <p>{record.username}..... {record.score}</p>
        ))}
      </section>
    </>
  )
}
