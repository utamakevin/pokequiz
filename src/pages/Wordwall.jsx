import { useState } from "react"

export default function Wordwall() {
  const [gameStart, setGameStart] = useState(false)

  const handleClick = () => {
    setGameStart(true)
    console.log("click")
  }

  return (
    <section className="wordwall">
      <h1>Wordwall</h1>
      {gameStart ? (
        <div className="game">
          <span>game displayed here</span>
        </div>
      ) : (
        <>
          <p>game instruction</p>
          <button onClick={handleClick}>start</button>
        </>
      )}
    </section>
  )
}
