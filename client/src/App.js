import "./App.css";
import Sightings from "./components/Sightings";
import Header from "./components/Header";
import MenuBar from "./components/FormBar";

function App() {
  return (
    <div className="App">
      <Header />
      <MenuBar />
      <Sightings />
    </div>
  );
}

export default App;
