import './App.css';
import HomePage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import Wordwall from './pages/Wordwall';

function App() {
  return (
    <div className="App">
      <HomePage />
      <Routes>
        <Route path="/wordwall" element={<Wordwall />} />
      </Routes>
    </div>
  );
}

export default App;
