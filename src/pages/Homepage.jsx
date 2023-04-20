import { Link } from "react-router-dom"
import css from "./Homepage.module.css"

export default function HomePage() {
  return (
    <section className="home-page">
      <h1>Home Page</h1>
      <Link to="/wordwall" className={css.gameLink}>
        Wordwall
      </Link>
      <Link to="/trivia" className={css.gameLink}>
        Trivia
      </Link>
    </section>
  )
}
