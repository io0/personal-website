import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";
import { useState } from "react";
import { groupNames } from "./cayleyGraph";
import { groupMetadata } from "./groupMetadata";
import styled from "@emotion/styled";
import MathJax from "react-mathjax";
import Grid from "@material-ui/core/Grid";

const friends = {
  "Anna Brandenberger": "https://abrandenberger.github.io/",
  "Jasmine Wang": "https://twitter.com/j_asminewang",
  "Noah Trenaman": "https://noahtren.com",
  "Raffi Hotter": "",
  "Stephen Fay": "https://dcxst.github.io/",
  "Sweta Karlekar": "https://sweta.dev",
};
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
`;
const SidebarContainer = styled.div`
  padding: 10px;
  position: fixed;
  right: 5%;
  margin-top: 5%;
  opacity: 60%;
`;
export const Link = styled((props) => {
  return <a {...props} children={props.children} />;
})`
  && {
    text-decoration: inherit;
    color: inherit;
    &:hover {
      text-decoration: underline;
      color: black;
    }
  }
`;
const Title = styled.div`
  font-family: Computer Modern Serif;
  font-size: 24px;
`;
const LeftAlignPara = styled.div`
  font-family: Computer Modern Serif;
  font-size: 15px;
  text-align: left;
`;
const Green = styled.span`
  color: #12b65c;
`;
const Magenta = styled.span`
  color: #cc00cc;
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
  const [currentGroup, setCurrentGroup] = useState("Z2xZ2xZ4");
  return (
    <div className="App">
      <Grid container>
        <Grid item sm={2} xs={12}></Grid>
        <Grid item sm={5} xs={12} style={{ marginTop: "5%" }}>
          <Title>Marley here!</Title>
          <p>
            <Green>* A better design</Green> could probably eliminate this
            interaction with a predictor as described above (and implemented
            below), or a graphic that somehow incorporates both directions at
            once.
            {/* I'm a 21-year-old research student and brain hacker. I've built
            brain-computer applications, written healthcare software for
            Perigen, IBM, and Google, and was an International Biology Olympiad
            silver medalist ('15).{" "} */}
          </p>
          <p>
            Context-sensitivity{" "}
            <Magenta>Context-sensitive information graphics</Magenta> Inferring
            context from the environment Inferring context from history
            {/* I'm
            currently working on a top-secret early stage project at Google X. I
            lead a student group that has won the International NeuroTechX
            competition 3 years in a row. Listen to me talk on the radio, or
            read how I made a brain-controlled wheelchair! */}
          </p>
          <p>
            A better design could probably eliminate this interaction with a
            predictor as described above (and implemented below), or a graphic
            that somehow incorporates both directions at once.
          </p>
          <Wrapper>
            <div style={{ paddingTop: "30px" }}>
              <P5Wrapper
                sketch={sketch}
                groupName={currentGroup}
                width={Math.max(0.2 * window.screen.width, 350)}
              />
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
              {/* <Title>{groupMetadata[currentGroup].name}</Title> */}
              <LeftAlignPara>{groupMetadata[currentGroup].text}</LeftAlignPara>
              {/* <P5Wrapper sketch={sketchLattice} groupName={"Q8"} /> */}
            </Sidebar>
          </Wrapper>
          <br></br>
          <br></br>
          <br></br>
          <p>
            * A better design could probably eliminate this interaction with a
            predictor as described above (and implemented below), or a graphic
            that somehow incorporates both directions at once.
            {/* I'm a 21-year-old research student and brain hacker. I've built
            brain-computer applications, written healthcare software for
            Perigen, IBM, and Google, and was an International Biology Olympiad
            silver medalist ('15).{" "} */}
          </p>
          <p>
            Context-sensitivity Context-sensitive information graphics Inferring
            context from the environment Inferring context from history
            {/* I'm
            currently working on a top-secret early stage project at Google X. I
            lead a student group that has won the International NeuroTechX
            competition 3 years in a row. Listen to me talk on the radio, or
            read how I made a brain-controlled wheelchair! */}
          </p>
          <p>
            A better design could probably eliminate this interaction with a
            predictor as described above (and implemented below), or a graphic
            that somehow incorporates both directions at once.
          </p>

          <br></br>

          <br></br>

          <br></br>

          <br></br>
        </Grid>
        <Grid item sm={5} xs={12}>
          <SidebarContainer>
            <iframe
              src="https://curius.app/friendactivity/marley-xiong"
              style={{
                border: "none",
                height: "210px",
                backgroundColor: "rgb(250,250,250)",
              }}
              allowTransparency
            ></iframe>
            <div style={{ width: "200px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Source Sans Pro",
                }}
              >
                {" "}
                Awesome people
              </div>
              {Object.keys(friends).map((friend) => (
                <>
                  <Link href={friends[friend]}>{friend}</Link> ·{" "}
                </>
              ))}
            </div>
          </SidebarContainer>
        </Grid>
      </Grid>
    </div>
  );
}

// const Button = styled.button`
//   ${(props) => props.isSelected && "background-color: rgba(241, 200, 85, 0.6);"}
//   outline: none;
// `;

export default App;
