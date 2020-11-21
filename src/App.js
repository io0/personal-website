import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";
import { useState } from "react";
import { groupNames } from "./cayleyGraph";

function App() {
  const [currentGroup, setCurrentGroup] = useState("Z3");
  return (
    <div className="App">
      <P5Wrapper sketch={sketch} groupName={currentGroup} />
      {groupNames.map((group) => (
        <button
          style={{
            border: "none",
            margin: 5,
            padding: 3,
            cursor: "pointer",
            outline: "none",
            fontFamily: "Lora",
            fontSize: "18px",
            borderBottom: group == currentGroup ? "3px solid black" : "none",
            // fontWeight: 600,
            backgroundColor: "transparent",
            // group == currentGroup ? "rgba(241,200,85,0.6)" : "transparent",
          }}
          // isSelected={group == currentGroup}
          onClick={() => setCurrentGroup(group)}
        >
          {group}
        </button>
      ))}
    </div>
  );
}

// const Button = styled.button`
//   ${(props) => props.isSelected && "background-color: rgba(241, 200, 85, 0.6);"}
//   outline: none;
// `;

export default App;
