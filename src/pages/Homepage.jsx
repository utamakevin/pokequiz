import { Link, useNavigate } from "react-router-dom"
import css from "./Homepage.module.css"
export default function HomePage() {
  const navigate = useNavigate()
  return (
    <section className={css.main}>
      <div
        onClick={() => navigate("./wordwall")}
        className={`game-title ${css.wordwall}`}
      >
        <p className={css.p}>Who's That Pokémon?</p>
      </div>
      <div
        onClick={() => navigate("./trivia")}
        className={`game-title ${css.trivia}`}
      >
        <p className={css.p}>Pokémon Trivia</p>
      </div>
      <img class={css.logo} src="./images/logo.png" alt="" />
    </section>
  )
}
