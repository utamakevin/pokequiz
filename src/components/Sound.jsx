import { useState } from "react"
import styles from "../pages/Wordwall.module.css"

export default function Sound({ handleVolumeChange, isMuted, toggleMute }) {
  const [displaySlider, setDisplaySlider] = useState(`hidden`)
  const handleAudioClick = () => {
    if (displaySlider === "hidden") {
      setDisplaySlider(`visible`)
    } else {
      setDisplaySlider(`hidden`)
    }
  }

  return (
    <div className={`${styles["volume-mixer"]} ${styles.volumeWrapper} `}>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        onChange={handleVolumeChange}
        defaultValue="0.2"
        style={{
          verticalAlign: "middle",
          width: "100px",
          visibility: displaySlider,
        }}
        className={`${styles.audioSlider}`}
      />
      <i
        className={`fa ${isMuted ? "fa-volume-off" : "fa-volume-up"} ${
          styles.audioBtn
        }`}
        onClick={toggleMute}
        style={{
          fontSize: "24px",
          cursor: "pointer",
          marginRight: "10px",
          visibility: displaySlider,
        }}
      ></i>
      <i
        className={`fa fa-gear fa-spin ${styles.gearIcon}`}
        onClick={handleAudioClick}
      ></i>
    </div>
  )
}
