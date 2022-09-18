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

function App() {
  return (
    <div className="App h-screen overflow-hidden">
      <main className="flex">
        <SideBar />

        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Router>
      </main>
    </div>
    // <div>{player}</div>
  );
}

export default App;
