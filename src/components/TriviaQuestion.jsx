import css from "../pages/Trivia.module.css"

export default function TriviaQuestion({ question }) {
  return (
    <section>
      <h3>{question.question}</h3>
      <h3>{question.question2}</h3>
    </section>
  )
}
