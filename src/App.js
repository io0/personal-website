import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";
import { useState } from "react";
import { groupNames } from "./cayleyGraph";
import styled from "@emotion/styled";

const Button = styled.button`
  border: none;
  border-bottom: ${(props) => (props.isSelected ? "3px solid black" : "none")};
  margin: 5px;
  padding: 3px;
  cursor: pointer;
  outline: none;
  font-family: Lora;
  font-size: 18px;
  background-color: transparent;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Sidebar = styled.div`
  // background-color: grey;
  margin-left: auto;
  margin-right: 0;
  padding: 20px;
  min-width: 20%;
  border-left: 1px solid grey;
`;
const Title = styled.div`
  font-family: monospace;
  font-size: 20px;
`;

const groupMetadata = {
  Z3: {
    name: "Z mod 3",
  },
};
function App() {
  const [currentGroup, setCurrentGroup] = useState("Z3");
  return (
    <div className="App">
      <Wrapper>
        <div>
          <P5Wrapper sketch={sketch} groupName={currentGroup} />
          {groupNames.map((group) => (
            <Button
              isSelected={group == currentGroup}
              onClick={() => setCurrentGroup(group)}
            >
              {group}
            </Button>
          ))}
        </div>
        <Sidebar>
          <Title>{groupMetadata[currentGroup].name}</Title>
        </Sidebar>
      </Wrapper>
    </div>
  );
}

// const Button = styled.button`
//   ${(props) => props.isSelected && "background-color: rgba(241, 200, 85, 0.6);"}
//   outline: none;
// `;

export default App;
