import Springy from "springy";
import { latticeData } from "./groupMetadata";

const CONST = {
  primaryCol: "#3949ab",
};
// utility function for creating color hexes in blend_colors
function int_to_hex(num) {
  var hex = Math.round(num).toString(16);
  if (hex.length == 1) hex = "0" + hex;
  return hex;
}

let nodeSize = 15;
let groupName;
const custom = [
  "#10a2f0",
  "#2adddd",
  "#ffd52a",
  "#ffaa55",
  "#ff807f",
  "#ff807f",
  "#ff807f",
  "#ff807f",
  "#ff807f",
];
let tickAmount = 0.02; // how much you move per timestep
var fixedGraph = false; // if true makes the graph fixed (save on computational costs)
var highlightedUserId, fullWidth; // fullWidth is the width of the box the graph is contained in
let fullHeight = 700;
const popularThreshold = 5;
var interval;
var uid;
let graphJSON;
let meta;
let updateIds;
let separation;
let labels, schools, points, num_incoming;
const stiffness = 400.0;
const repulsion = 1000.0;
var graph = new Springy.Graph();
var layout = new Springy.Layout.ForceDirected(
  graph,
  stiffness, // Spring stiffness
  repulsion, // Node repulsion
  0.5 // Damping
);
const padding = 15;
let width = 150;
let height = 200;
var toScreen = function (p) {
  var currentBB = layout.getBoundingBox();
  var size = currentBB.topright.subtract(currentBB.bottomleft);
  var sx = p.subtract(currentBB.bottomleft).divide(size.x).x * width; //width / 2;
  var sy = p.subtract(currentBB.bottomleft).divide(size.y).y * height + padding; // - height / 2;
  return new Springy.Vector(sx, sy);
};

const sketchLattice = (p) => {
  var offset = 5;
  function drawEdge(edge, p1, p2) {
    // draw an edge
    var x1 = toScreen(p1).x;
    var y1 = toScreen(p1).y;
    var x2 = toScreen(p2).x;
    var y2 = toScreen(p2).y;
    p.strokeWeight(1.5);
    p.stroke("black");
    p.line(x1, y1, x2, y2);
  }
  function drawNode(node, p1) {
    var x1 = toScreen(p1).x;
    var y1 = toScreen(p1).y;
    p.push();
    p.translate(x1, y1);
    const colorScaling = separation
      ? Math.max(1 - separation[node.id] / 4, 0.0) * 0.95 + 0.05
      : 1;
    const scaling = points
      ? points[node.id] > 60 ||
        node.id == highlightedUserId ||
        num_incoming[node.id] > popularThreshold
        ? 1
        : 0.4
      : separation
      ? separation[node.id] < 2
        ? 1
        : 0.4
      : 1;
    const textColor = "rgba(255,255,255," + scaling + ")";
    const color = "rgba(255,255,255," + scaling + ")";
    //const maxSeparation = Math.max(...Object.values(separation))

    //const size = separation ? (maxSeparation - separation[node.id] + 1)/maxSeparation * nodeSize : nodeSize;
    // p.stroke(color);
    // p.strokeWeight(2);
    if (node.id == parseInt(highlightedUserId)) {
      p.fill(255);
    }
    if (separation) {
      //p.fill(colors[separation[node.id]]);
    }

    const order = 1;
    p.noStroke();
    p.fill("white");
    p.circle(0, 0, nodeSize + 5);
    p.fill(custom[order - 1]);
    if (order <= 2) {
      p.circle(0, 0, nodeSize);
    } else if (order == 3) {
      p.triangle(
        -nodeSize / 2,
        nodeSize / 2,
        nodeSize / 2,
        nodeSize / 2,
        0,
        -nodeSize / 2
      );
    } else if (order == 4) {
      p.square(-nodeSize / 2, -nodeSize / 2, nodeSize);
    }

    if (updateIds && updateIds.includes(parseInt(node.id)) && node.id !== uid) {
      p.push();
      p.noStroke();
      p.fill(255);
      p.circle(-20, -25, 10);
      //p.circle(-15,-11,10)
      p.pop();
    }
    // if (labels) {
    p.push();
    p.noStroke();
    // }
    if (node.id == uid) {
      p.text(node.id, -10, -30);
    } else {
      let text = node.id;
      // function for only showing first name
      // I decided not to use it in the end, it's hard to tell who is who
      // if (Object.entries(labels).length > 15){
      //     // if graph is very dense
      //     if (separation && separation[node.id] > 1){
      //         text = text.split(" ")[0]
      //     }
      // }
      // console.log("node in sketch.js",node.data);
      p.text(text, -10, -20);
      p.fill(color);
    }
    p.textAlign(p.CENTER, p.CENTER);
    p.pop();
    // }
    p.pop();
  }
  function getGraphPos() {
    let graphPos = {};
    layout.eachNode(function (node, point) {
      var x = toScreen(point.p).x;
      var y = toScreen(point.p).y;
      graphPos[node.id] = { x, y };
    });
    return graphPos;
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    // updateIds should be provided in props
    // updateIds = props.updateIds || [];
    const latticeGraph = latticeData[props.groupName];
    groupName = props.groupName;
    graph = new Springy.Graph();
    graph.loadJSON(latticeGraph);
    // meta = cayleyGraph.meta;
    // fixedGraph = false;
    const oldLayout = layout;
    layout = new Springy.Layout.ForceDirected(
      graph,
      stiffness, // Spring stiffness
      repulsion, // Node repulsion
      0.2 // Damping
    );
    layout.tick(0.05);

    // triggered when graph hasn't changed, but still need the position
    // highlightedUserId = props.highlightedUserId;
    p.loop();
  };
  const strings = [];
  p.setup = () => {
    let canvas = p.createCanvas(fullWidth || 650, fullHeight);
    p.textFont("Helvetica");
    layout.tick(0.03);
  };

  p.draw = () => {
    p.background("white");
    p.smooth();
    layout.eachEdge(function (edge, spring) {
      drawEdge(edge, spring.point1.p, spring.point2.p);
    });
    // if (!fixedGraph) {
    if (layout.totalEnergy() > 0.01) {
      layout.tick(tickAmount);
      layout.nodePoints["Q8"].p.x = 0;
      layout.nodePoints["Q8"].p.y = 0;
    } else {
      // fix the graph
      fixedGraph = true;
      // add strings

      layout.eachEdge(function (edge, spring) {
        var p1 = spring.point1.p;
        var p2 = spring.point2.p;
        var x1 = toScreen(p1).x;
        var y1 = toScreen(p1).y;
        var x2 = toScreen(p2).x;
        var y2 = toScreen(p2).y;
        //strings.push(new String(x1, y1, x2, y2, beadSpeed, colors[0], colors[0]));
      });
      if (graphJSON) {
        // proxy for if graph has been loaded
        p.noLoop();
      }
    }
    layout.eachNode(function (node, point) {
      drawNode(node, point.p);
    });
  };
};
export default sketchLattice;
