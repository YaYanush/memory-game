import {Route, Routes, Link, useLocation} from "react-router-dom";
import {Statistic} from "./components/Statistic.tsx";
import {Game} from "./components/Game.tsx";

export let App = () => {
  const location = useLocation();
  return (
          <div className="app-container">
              {location.pathname === "/" ?
                  (<Link to="/statistics" className="nav-button">Statistics</Link>)
                  :
                  (<Link to="/" className="nav-button">Play Game</Link>)}
              <Routes>
                  <Route path="/statistics"  element={<Statistic />} />
                  <Route path="/"  element={<Game />} />
              </Routes>
          </div>
  )
}

