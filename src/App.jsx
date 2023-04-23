import "./App.css"
import HomePage from "./pages/Homepage"
import { Routes, Route } from "react-router-dom"
import Wordwall from "./pages/Wordwall"
import Trivia from "./pages/Trivia"
import WordWallLeaderboard from "./pages/WordWallLeaderboard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element = {<HomePage />} />
        <Route path="/wordwall" element={<Wordwall />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/wordWallLeaderboard" element={<WordWallLeaderboard/>} />
      </Routes>
    </div>
  )
}

export default App
