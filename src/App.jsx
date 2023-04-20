import "./App.css"
import HomePage from "./pages/Homepage"
import { Routes, Route } from "react-router-dom"
import Wordwall from "./pages/Wordwall"
import Trivia from "./pages/Trivia"

function App() {
  return (
    <div className="App">
      <HomePage />
      <Routes>
        <Route path="/wordwall" element={<Wordwall />} />
        <Route path="/trivia" element={<Trivia />} />
      </Routes>
    </div>
  )
}

export default App
