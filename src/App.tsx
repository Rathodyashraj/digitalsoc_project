import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityKnowledge from './pages/CityKnowledge';
import Tutorial from './pages/Tutorial';
import Quiz from './pages/Quiz';
import Shows from './pages/Shows';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:cityName" element={<CityKnowledge />} />
        <Route path="/city/:cityName/tutorial" element={<Tutorial />} />
        <Route path="/city/:cityName/quiz" element={<Quiz />} />
        <Route path="/city/:cityName/shows" element={<Shows />} />
      </Routes>
    </Router>
  );
}

export default App;
