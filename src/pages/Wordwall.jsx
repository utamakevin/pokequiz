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
      <button onClick={() => setGameStart(false)}>Restart</button>
      {gameStart ? (
        <div className="game">
          <h2>Who's that Pokemon?</h2>
          <img src="https://placehold.co/400" alt="" />
          <div></div>
          <button>Pikachu</button><button>Charmander</button><button>Ditto</button>
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
