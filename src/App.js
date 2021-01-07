import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";
import { useState } from "react";
import { groupNames } from "./cayleyGraph";
import { groupMetadata } from "./groupMetadata";
import styled from "@emotion/styled";
import MathJax from "react-mathjax";
import sketchLattice from "./sketchLattice";

const Button = styled.button`
  border: none;
  border-bottom: ${(props) => (props.isSelected ? "3px solid black" : "none")};
  margin: 5px;
  padding: 3px;
  cursor: pointer;
  outline: none;
  font-family: Crimson Text;
  font-size: 18px;
  background-color: transparent;
  &:hover {
    ${(props) =>
      !props.isSelected &&
      `background-color: rgba(0, 0, 0, 0.04);
    border-radius: 5px;`}
  }
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
  font-family: Computer Modern Serif;
  font-size: 20px;
`;
const LeftAlignPara = styled.div`
  font-family: Computer Modern Serif;
  font-size: 15px;
  text-align: left;
`;
export function Formula(props) {
  console.log(props.tex);
  return (
    <MathJax.Provider>
      <MathJax.Node
        inline
        formula={props.tex}
        style={{ outline: "none", border: "none" }}
      />
    </MathJax.Provider>
  );
}
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
              <Formula tex={groupMetadata[group].symbol} />
            </Button>
          ))}
        </div>
        <Sidebar>
          <Title>{groupMetadata[currentGroup].name}</Title>
          <LeftAlignPara>{groupMetadata[currentGroup].text}</LeftAlignPara>
          {/* <P5Wrapper sketch={sketchLattice} groupName={"Q8"} /> */}
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
