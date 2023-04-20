import { Routes, Route, Link } from "react-router-dom"
import Wordwall from "./Wordwall"

export default function HomePage() {
    return (
        <section className="home-page">
            <h1>Home Page</h1>
            <Link to="/wordwall">Wordwall</Link>
            {/* <Routes>
                <Route path="./Wordwall" element={<Wordwall />} />
            </Routes> */}
        </section>
    )
}