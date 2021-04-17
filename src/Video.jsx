import logo from "./logo.svg";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch";
import "./App.css";
import { useState, useEffect, createRef } from "react";
import { groupNames } from "./cayleyGraph";
import { groupMetadata } from "./groupMetadata";
import styled from "@emotion/styled";
import MathJax from "react-mathjax";
import Grid from "@material-ui/core/Grid";
import { transcript } from "./transcript";

import vttToJson from "vtt-to-json";
import ReactPlayer from "react-player/youtube";

const vttString = `WEBVTT
Kind: captions
Language: en

00:00:04.029 --> 00:00:09.129
After seeing how we think about ordinary differential
equations in chapter 1, we turn now to an

00:00:09.129 --> 00:00:13.349
example of a partial differential equation,
the heat equation.`;
const Title = styled.div`
  font-family: IBM Plex Mono;
  font-size: 24px;
  border-bottom: 2px solid white;
  margin: 20px 0;
`;
const SidebarContainer = styled.div`
  padding: 10px;
  position: fixed;
  right: 5%;
  margin-top: 5%;
  opacity: 60%;
`;
const opts = {
  height: "281",
  width: "500",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const Text = styled.div`
  display: inline;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  transition: 0.1s ease;
`;

function Video() {
  const [currentGroup, setCurrentGroup] = useState("Z2xZ2xZ4");
  const [showSchool, setSchool] = useState(false);
  const [textObjects, setTextObjects] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.body.style = "background-color: black;";
    vttToJson(transcript).then((result) => {
      console.log(result);
      setTextObjects(result);
    });
  }, []);
  const ref = createRef();
  const playing = true;

  //   const text = textObjects.map(el => el.part);
  return (
    <div className="App">
      <Grid container>
        <Grid item sm={2} xs={12}></Grid>
        <Grid
          item
          sm={5}
          xs={12}
          style={{ padding: "5%", paddingTop: "10vh", color: "#eee" }}
        >
          <Title>What is a partial differential equation?</Title>
          {ready &&
            textObjects.map((obj, idx) => (
              <>
                <Text
                  onClick={() => {
                    const seconds = obj.start / 1000;
                    console.log({ seconds });
                    const player = ref.current;
                    // if (player.getCurrentTime() == player.getDuration()) {
                    //   player.playVideo();
                    // }
                    ref.current.seekTo(seconds, true);
                    // player.playVideo();
                  }}
                >
                  {obj.part}
                  {!obj.part.endsWith(".") && " "}
                </Text>
                {obj.part.endsWith(".") && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </>
            ))}
        </Grid>
        <Grid item sm={5} xs={12}>
          <SidebarContainer>
            <ReactPlayer
              config={{
                youtube: {
                  playerVars: { autoplay: 1 },
                },
              }}
              controls
              playing={playing}
              ref={ref}
              onReady={() => setReady(true)}
              url="https://www.youtube.com/watch?v=ly4S0oi3Yz8"
              width="500px"
              height="281px"
            />
            {/* <YouTube opts={opts} videoId="ly4S0oi3Yz8" /> */}
          </SidebarContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Video;
