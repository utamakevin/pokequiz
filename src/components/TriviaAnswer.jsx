import css from "../pages/Trivia.module.css"

export default function TriviaAnswer({ question }) {
  return (
    <section>
      <h3>Answer:</h3>
      <h3>{question.answer}</h3>
    </section>
  )
}
