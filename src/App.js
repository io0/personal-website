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
const urls = {
  norway: "https://www.youtube.com/watch?v=AYIhAy6oK-4",
  plant: "https://curius.s3-us-west-2.amazonaws.com/category_a.pdf",
  marauders: "https://marauders.app/marley-xiong",
  milo: "https://www.youtube.com/watch?v=_46AoSnHCRo",
  speller: "https://www.youtube.com/watch?v=Ytnn0dv_0To",
  neo:
    "https://www.forbes.com/sites/bizcarson/2019/01/18/an-early-facebook-investor-is-creating-a-scouting-network-for-brilliant-engineers/",
  paper1: "https://ieeexplore.ieee.org/document/9283117",
  paper2: "https://dl.acm.org/doi/abs/10.1109/SMC.2019.8914544",
  school: "https://bio.school2point0.com",
  "Anna Brandenberger": "https://abrandenberger.github.io/",
  "Jasmine Wang": "https://twitter.com/j_asminewang",
  "Noah Trenaman": "https://noahtren.com",
  "Raffi Hotter": "https://twitter.com/raffi_hotter",
  "Stephen Fay": "https://dcxst.github.io/",
  "Sweta Karlekar": "https://sweta.dev",
};
const Button = styled.button`
  border: none;
  ${(props) =>
    props.isSelected
      ? "border-bottom: 2px solid black;"
      : "border-bottom:none;"};
  margin: 2px 5px 2px 0;
  padding: 1px 2px;
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
const Lora = styled.div`
  // font-family: Lora;
  font-family: Computer Modern Serif;
`;
const Subscript = styled.div`
  font-size: 6px;
  padding-top: 5px;
`;
const SidebarContainer = styled.div`
  padding: 10px;
  position: fixed;
  right: 5%;
  margin-top: 5%;
  opacity: 60%;
`;
export const Link = styled((props) => {
  return <a {...props} target="_blank" children={props.children} />;
})`
  && {
    text-decoration: inherit;
    ${(props) => props.underline && "text-decoration: underline;"}
    color: inherit;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
const Title = styled.div`
  font-family: Computer Modern Serif;
  font-size: 24px;
  // border-bottom: 2px solid black;
`;
const LeftAlignPara = styled.div`
  font-family: Computer Modern Serif;
  font-size: 15px;
  text-align: left;
`;
const GreenArea = styled.span`
  // color: #12b65c;
  // border-bottom: 1px solid #12b65c;
  // background-color: rgb(18 182 92 / 15%);
  background-color: hsl(143deg 56% 91%);
  // background-color: #ffe600;
  &:hover {
    background-color: hsl(143deg 70% 88%);
    cursor: pointer;
  }
  border-radius: 5px;
  padding: 0 2px;
  color: black;
`;
const Green = (props) => (
  <GreenArea>
    <Link href={props.name ? urls[props.name] : props.href}>
      {props.children}
    </Link>
  </GreenArea>
);

const Project = ({ name, description, display }) => {
  return (
    <div className="project">
      <img src={process.env.PUBLIC_URL + `/${name}.png`} />
      <div className="description">
        <Green name={name}>{display}</Green> {description}
      </div>
    </div>
  );
};

const Graph = styled.div`
  padding: 20px 0;
  margin-top: 50px;
  margin-bottom: 20px;
`;
const Figure = styled.div`
  // background-color: rgb(247, 250, 250);
  // border-radius: 10px;
  // margin-left: -20px;
  // width: 105%;
  // padding: 20px;
  // padding-right: 14%;
  padding: 20px 0;
  padding-bottom: 40px;
  // margin-top: 30px;
  border-top: 1px solid lightgrey;
`;
const Magenta = styled.span`
  // color: black;
  color: #cc00cc;
  // border-bottom: 1px solid #cc00cc;
`;
const Black = styled.span`
  // color: black;
  font-weight: 600;
`;
export function Formula(props) {
  console.log(props.tex);
  return (
    <MathJax.Provider>
      <MathJax.Node
        inline
        formula={props.tex}
        style={{ outline: "none", border: "none", fontSize: "14px" }}
      />
    </MathJax.Provider>
  );
}
function App() {
  const [currentGroup, setCurrentGroup] = useState("Z2xZ2xZ4");
  const [showSchool, setSchool] = useState(false);
  return (
    <div className="App">
      <Grid container>
        <Grid item sm={2} xs={12}></Grid>
        <Grid item sm={5} xs={12} style={{ padding: "5%", paddingTop: "10vh" }}>
          <Title>Marley here!</Title>
          <p>
            I’m one of those medieval minstrels who play songs in dorian.{" "}
            <Black>
              I write code and hack on things to reinvent the way we learn.
            </Black>
            {/* Curiosity is my king. */}
          </p>
          <p>
            Most recently I started <Green name="school">School 2.0</Green>, a
            house in New Mexico for young people to learn and build together.
            {/* We had 26
            brilliant technologists under one roof — check it out.
          </p>
          <p> */}{" "}
            I’ve worked on signal processing and ML at <Black>Google X</Black>,
            interned as a data scientist at Google, and written healthcare
            software for Perigen and IBM.
          </p>
          <p>
            {/* During my undergrad I led a student group that won the International
            NeuroTechX competition 3 years in a row. I brought together a group
            of 30 undergrads and, through a series of delirious hack days and
            nights, designed and built a{" "}
            <Green>brain-controlled wheelchair</Green>. We published{" "}
            <Green>two papers</Green> in IEEE, becoming the only all-student
            group to do so. */}
            During college I brought together a group of 30 undergrads and built
            a <Green name="milo"> brain-controlled wheelchair</Green>. I led a
            team that hacked and pulled all-nighters together, winning the
            International NeuroTechX competition 3 years in a row. We
            independently published <Green name="paper1">two</Green>{" "}
            <Green name="paper2">papers</Green> in IEEE brain-machine
            interfaces.
            {/* , becoming the only all-student group to do so. */}
          </p>
          <p>
            {" "}
            In a previous life, I was an International Biology Olympiad silver
            medalist ('15), spending summers{" "}
            <Green name="plant">dissecting all the plants</Green> and animals in
            the grocery store.
            {/* I dissected all the plants and animals in the
            grocery store, and spent an entire summer sectioning mice brains
            when I was 14. */}
          </p>
          <Graph>
            <Grid container>
              <Grid item sm={8} xs={12}>
                <div style={{ height: 270 }}>
                  <P5Wrapper
                    sketch={sketch}
                    groupName={currentGroup}
                    width={250}
                  />
                </div>
                {groupNames.map((group) => (
                  <Button
                    isSelected={group == currentGroup}
                    onClick={() => setCurrentGroup(group)}
                  >
                    <Formula tex={groupMetadata[group].symbol} />
                  </Button>
                ))}
                {/* <Lora>Z2 x Z2 x Z4 S3 A3</Lora> */}
              </Grid>
              <Grid
                item
                sm={4}
                xs={12}
                // style={{ paddingTop: 80 }}
              >
                <p style={{ fontSize: "10px" }}>
                  Abstract algebra is the most recent cool thing I learned
                  about. Click to explore some groups!
                  <p
                    style={{
                      fontFamily: "Computer Modern Serif",
                      fontSize: "15px",
                      lineHeight: 1.2,
                      marginTop: "15px",
                    }}
                  >
                    {/* {groupMetadata[currentGroup].name} */}
                  </p>
                </p>
                {/* <LeftAlignPara>
                  {groupMetadata[currentGroup].text}
                </LeftAlignPara> */}
                {/* <P5Wrapper sketch={sketchLattice} groupName={"Q8"} /> */}
              </Grid>
            </Grid>
          </Graph>
          {/* <p style={{ margin: "10px 10%", fontSize: "12px" }}>
            Abstract algebra is the most recent cool thing I learned about
          </p> */}
          <p>
            I’m currently exploring projects at the intersection of design,
            community and education. I'm a current{" "}
            <Green name="neo">Neo scholar</Green> ('19) and will be joining On
            Deck (ODF8) as a fellow in February.
          </p>
          <p>
            <b>Contact me </b>about ideas or collaborations! I can be found on{" "}
            <Link href="https://twitter.com/_marleyx" underline>
              Twitter
            </Link>{" "}
            or through{" "}
            <Link href="mailto:marley.xiong@mail.mcgill.ca" underline>
              email
            </Link>
            .
          </p>
          <br></br>
          <br></br>
          <br></br>
          <Figure>
            <h2>Cool stuff</h2>
            Projects and experiments
            <Project
              name="marauders"
              display="Marauders.app"
              description="A map of interesting people, supplied by people's recommendations."
            />
            <Project name="milo" display="Brain-controlled wheelchair" />
            <Project
              name="china"
              display="Deep learning in China"
              description="I went to Beijing for 3 weeks
              and interned at a startup estimating urban density for the government"
            />
            <Project
              name="norway"
              display="Hitchhiking Norway"
              description="(video) from when I went around hitchhiking and camping all across Norway"
            />
            <Project
              name="speller"
              display="ChattERP"
              description="A predictive speller that converts EEG
              signals to text"
            />
            <Project
              name="plant"
              display="Plant microscopy"
              description="showcasing the incredible order and structure of everyday plants.
              Samples were made by hand using a tiny razor."
            />
          </Figure>
          {/* <Title>What's next?</Title> */}
          <Figure>
            <h2>Friends</h2>
            Awesome people I've learned from immensely
            <p>
              <Link href={urls["Jasmine Wang"]} underline>
                Jasmine Wang
              </Link>
              , who has enough energy to fit three lifetimes into one
            </p>
            <p>
              <Link href={urls["Raffi Hotter"]} underline>
                Raffi Hotter
              </Link>
              , whose curiosity is insatiable
            </p>
            <p>
              <Link href={urls["Stephen Fay"]} underline>
                Stephen Fay
              </Link>
              , who loves math and physics more than anything else
            </p>
            <p>
              <Link href={urls["Sweta Karlekar"]} underline>
                Sweta Karlekar
              </Link>
              , my role model in anything to do with people
            </p>
            <p>
              <Link href={urls["Noah Trenaman"]} underline>
                Noah Trenaman
              </Link>
              , who lives and breathes ideas
            </p>
          </Figure>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Grid>
        <Grid item sm={5} xs={12}>
          {/* <iframe
            style={{
              border: "none",
              margin: "auto",
              transform: "scale(0.2)",
              transformOrigin: "0 0",
              width: "150%",
              visibility: showSchool ? "visible" : "hidden",
              height: "100vh",
            }}
            src="https://bio.school2point0.com"
            // src="https://www.cs.mcgill.ca/~mxiong4/docs/category_a.pdf"
            // src="https://mcgillneurotech.com"
            // src="https://curius.s3-us-west-2.amazonaws.com/category_a.pdf"
            // src="https://ieeexplore.ieee.org/document/8914544"
            // src="https://dl.acm.org/doi/abs/10.1109/SMC.2019.8914544"
          ></iframe> */}
          {/* <SidebarContainer> */}
          {/* <iframe
              src="https://curius.app/friendactivity/marley-xiong"
              style={{
                border: "none",
                height: "210px",
                backgroundColor: "rgb(250,250,250)",
              }}
              allowTransparency
            ></iframe> */}
          {/* <div style={{ width: "200px" }}>
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
          </SidebarContainer> */}
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
