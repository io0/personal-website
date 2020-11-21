import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <P5Wrapper sketch={sketch} />
      </header>
    </div>
  );
}

export default App;
