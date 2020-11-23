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
  font-family: modern;
  font-size: 20px;
`;
const LeftAlignPara = styled.div`
  font-family: modern;
  font-size: 15px;
  text-align:left;
`;

// U+2124 is unicode for \mathbb Z
// 
const groupMetadata = {
  Z3: {
    name: "\u2124 mod 3",
    symbol: "\u2124\u2083",
    text: "\u2124 mod 3 has three elements, every non identity element is a generator."
  },
  Z2: {
    name: "\u2124 mod 2",
    symbol: "\u2124\u2082",
    text: ""
  },
  Z4: {
    name: "\u2124 mod 4",
    symbol: "\u2124\u2084",
    text: ""
  },
  Z2xZ2: {
    name: "Klein Four",
    symbol: "K\u2084",
    text: ""
  },
  Z2xZ2xZ2: {
    name: "\u2124 mod 2 Cubed",
    symbol: "(\u2124\u2082)\u00B3",
    text: ""
  },
  Z2xZ2xZ4: {
    name: "Klein Four times \u2124 mod 4",
    symbol: "\u2124\u2082\u2715\u2124\u2082\u2715\u2124\u2084",
    text: ""
  },
  Z2xZ3: {
    name: "\u2124\u2082 times \u2124\u2083",
    symbol: "\u2124\u2082\u2715\u2124\u2083",
    text: ""
  },
  Z2xZ2xZ2xZ2: {
    name: "\u2124\u2082\u2074",
    symbol: "(\u2124\u2082)\u2074",
    text: "" 
  },
  Z3xZ3: {
    name: "\u2124\u2083 squared",
    symbol: "(\u2124\u2083)\u00B2",
    text: ""
  },
  Z5: {
    name: "\u2124 mod 5",
    symbol: "\u2124\u2085",
    text: ""
  },
  S3: {
    name: "Symmetry group on three elements",
    symbol: "S\u2083",
    text: ""
  },
  S4: {
    name: "Symmetry group on four elements",
    symbol: "S\u2084",
    text: ""
  },
  S5: {
    name: "Symmetry group on five elements",
    symbol: "S\u2085",
    text: ""
  },
  A4: {
    name: "Alternating group on four elements",
    symbol: "A\u2084",
    text: ""
  },
  A5: {
    name: "Alternating group on five elments",
    symbol: "A\u2085",
    text: ""
  },
  Z3xZ3xZ3: {
    name: "Z mod 3 cubed",
    symbol: "(\u2124\u2083)\u00B3",
    text: ""
  },
  Q8: {
    name: "The Quaternions",
    symbol: "Q\u2088",
    text: "The Quaternions are everyone's favourite group. \
    They were first described by Irish mathematician William \
    Rowan Hamilton in 1843 and applied to mechanics in \
    three-dimensional space.\
    The vector part of a quaternion can be interpreted \
    as a coordinate vector in ℝ3; therefore, the algebraic \
    operations of the quaternions reflect the geometry of ℝ3. \
    Just as complex numbers can be represented as matrices, so \
    can quaternions. There are at least two ways of \
    representing quaternions as matrices in such a way that \
    quaternion addition and multiplication correspond to matrix \
    addition and matrix multiplication."
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
              {groupMetadata[group].symbol}
            </Button>
          ))}
        </div>
        <Sidebar>
          <Title>{groupMetadata[currentGroup].name}</Title>
          <LeftAlignPara>{groupMetadata[currentGroup].text}</LeftAlignPara>
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
