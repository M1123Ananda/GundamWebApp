import { useState } from 'react';
import NavBar from './elements/NavBar.jsx';
import Home from './pages/Home.jsx';
import Display from './pages/Display.jsx';
import Map from './pages/Map.jsx';
import Results from './pages/Results.jsx';
import Go from './pages/Go.jsx';
import Prototype from './pages/Prototype.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [gardens, setGardens] = useState([])

  return (
    <>
      <div className="m-5">
        <Router>
          <Routes>
            <Route path="/" element={<Go />} />
            <Route path="/prototype" element={<Prototype />} />
            {/* <Route path="/" element={<Home setGardens={setGardens} gardens={gardens} />} /> */}
            <Route path="/display" element={<Display />} />
            <Route path="/map" element={<Map setGardens={setGardens} gardens={gardens} />} />
            <Route path="/results" element={<Results />} />
          </Routes>
          {/* <NavBar /> */}
        </Router>
      </div>
    </>
  )
}

export default App
