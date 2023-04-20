import css from "../pages/Trivia.module.css"

export default function TriviaAnswer({ question }) {
  return (
    <section>
      <h3>{question.answer}</h3>
    </section>
  )
}
