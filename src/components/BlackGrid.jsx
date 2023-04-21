import React, { useState } from "react"
import css from "./PokemonCard.module.css"

export default function BlackGrid({ timer }) {
  const [boxColour, setBoxColour] = useState("black")
  const handleClick = () => {
    setBoxColour("rgba(0, 0, 0, 0)")
  }
  return (
    <div
      className={css.blackBox}
      onClick={handleClick}
      style={{ backgroundColor: boxColour }}
    ></div>
  )
}
