import React, { useState } from "react"
import css from "./PokemonCard.module.css"

export default function BlackGrid({ timer, colour }) {
  return (
    <div className={css.blackBox} style={{ backgroundColor: colour }}></div>
  )
}
