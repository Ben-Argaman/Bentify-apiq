import AlbumDash from "./components/AlbumDash";
import SideBar from "./components/SideBar";
import HomeScreen from "./screens/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";

function App() {
  return (
    <div className="App h-screen overflow-hidden">
      <main className="flex">
        <SideBar />
        <Router>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/search" element={<HomeScreen />} />
          </Routes>
        </Router>
      </main>
    </div>
    // <div>{player}</div>
  );
}

export default App;
