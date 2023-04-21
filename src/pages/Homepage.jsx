import { Link, useNavigate } from "react-router-dom"
import css from "./Homepage.module.css"
export default function HomePage() {
  const navigate = useNavigate()
  return (
    <section className={css.main}>
      <div onClick={() => navigate("./wordwall")} className={css.wordwall}>
        <p className={css.p}>Wordwall</p>
      </div>
      <div onClick={() => navigate("./trivia")} className={css.trivia}>
        <p className={css.p}>Trivia</p>
      </div>
    </section>
  )
}
