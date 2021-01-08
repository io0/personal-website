//import * as springy from './springy';
import Springy from "springy";
import { getCayleyGraph } from "./cayleyGraph";
// import * as CONST from "./Constants";

const CONST = {
  primaryCol: "#3949ab",
};
// utility function for creating color hexes in blend_colors
function int_to_hex(num) {
  var hex = Math.round(num).toString(16);
  if (hex.length == 1) hex = "0" + hex;
  return hex;
}
// creates a polygon with npoints vertices of radius r, p is the sketch obj
function polygon(p, radius, npoints) {
  let angle = p.TWO_PI / npoints;
  p.beginShape();
  for (let a = 0; a < p.TWO_PI; a += angle) {
    let sx = p.cos(a) * radius;
    let sy = p.sin(a) * radius;
    p.vertex(sx, sy);
  }
  p.endShape(p.CLOSE);
}
// function for polygon colors
function blend_colors(color1, color2, percentage) {
  // check input
  color1 = color1 || "#000000";
  color2 = color2 || "#ffffff";
  percentage = percentage || 0.5;

  // 1: validate input, make sure we have provided a valid hex
  //   if (color1.length != 4 && color1.length != 7)
  //     throw new error("colors must be provided as hexes");

  //   if (color2.length != 4 && color2.length != 7)
  //     throw new error("colors must be provided as hexes");

  if (percentage > 1) percentage = 1;
  if (percentage < 0) percentage = 0;

  // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
  //      the three character hex is just a representation of the 6 hex where each character is repeated
  //      ie: #060 => #006600 (green)
  if (color1.length == 4)
    color1 =
      color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
  else color1 = color1.substring(1);
  if (color2.length == 4)
    color2 =
      color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
  else color2 = color2.substring(1);

  // 3: we have valid input, convert colors to rgb
  color1 = [
    parseInt(color1[0] + color1[1], 16),
    parseInt(color1[2] + color1[3], 16),
    parseInt(color1[4] + color1[5], 16),
  ];
  color2 = [
    parseInt(color2[0] + color2[1], 16),
    parseInt(color2[2] + color2[3], 16),
    parseInt(color2[4] + color2[5], 16),
  ];

  // 4: blend
  var color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2],
  ];

  // 5: convert to hex
  color3 =
    "#" + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

  // return hex
  return color3;
}
// const colors = [
//     "#ffe082",
//     "#ffca28",
//     "#ffb300",
//     "#ff8f00",
//     "#ff6f00"
// ];
//const colors = ['#e95c47', '#fdbf6f', '#ffffbe', '#bfe5a0', '#54aead'];

// color stuff
const magma = ["#a3307e", "#c83e73", "#e95462", "#fa7d5e", "#fed395"];
const spring = ["#ffd12e", "#ffba45", "#ffa25d", "#ff8b74", "#ff748b"];
const lspring = ["#ffd52a", "#ffaa55", "#ff807f", "#ff55aa", "#ff2ad5"];
const cool = [
  "#d52aff",
  "#aa55ff",
  "#807fff",
  "#55aaff",
  "#2ad5ff",
  "#2ad5ff",
  "#2ad5ff",
  "#2ad5ff",
];
const gnuplot2 = ["#fff00f", "#ffb847", "#ff7e81", "#f546b9", "#9a0cf3"];
// stupid name for a color pallette
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
const beadSpeed = 0.3; // little beads walking along edges of graph to make it look pretty
const chance = 0.003; // chance of a bead spawning
const nodeSize = 7; // the radius of each node
let tickAmount = 0.02; // every timestep how much you move, higher means faster
const maxBeads = 15;
var fixedGraph = false; // if true makes the graph fixed (save on computational costs)
var highlightedUserId, fullWidth; // fullWidth is the width of the box the graph is contained in
let fullHeight = 700;
const popularThreshold = 5;
var interval;
var totalBeads = 0;
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
let width = 600;
let height = 600;
var toScreen = function (p) {
  var currentBB = layout.getBoundingBox();
  var size = currentBB.topright.subtract(currentBB.bottomleft);
  var sx = p.subtract(currentBB.bottomleft).divide(size.x).x * width; //width / 2;
  var sy = p.subtract(currentBB.bottomleft).divide(size.y).y * height + padding; // - height / 2;
  return new Springy.Vector(sx, sy);
};

const sketch = (p) => {
  class String {
    constructor(x1, y1, x2, y2, step, color1, color2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.limit = 3; // max number of beads on a string
      this.minDistance = 20; // minimum distance between beads
      this.chance = chance;
      this.beads = [];
      this.color1 = color1;
      this.color2 = color2;
      var m = (y2 - y1) / (x2 - x1); // slope
      var b = y1 - m * x1;
      this.length = Math.hypot(x2 - x1, y2 - y1);
      this.xstep = step / Math.sqrt(m * m + 1);
      if (x2 < x1 && this.xstep > 0) this.xstep = -this.xstep;
      this.ystep = this.xstep * m;
    }
    willSpawn() {
      if (this.beads.length >= this.limit || totalBeads > maxBeads)
        return false; // don't spawn if too many beads
      if (Math.random() < this.chance) {
        if (this.beads.length) {
          var lastBead = this.beads[this.beads.length - 1];
          if (
            Math.hypot(lastBead.x - this.x1, lastBead.y - this.y1) <
            this.minDistance
          ) {
            return false; // don't spawn if last bead is within min distance
          }
        }
        totalBeads += 1;
        return true;
      }
      return false;
    }
    draw() {
      var prevLength = this.beads.length;
      // remove beads if they are beyond length of string
      this.beads = this.beads.filter((item) => {
        return (
          item.x >= Math.min(this.x2, this.x1) &&
          item.x <= Math.max(this.x1, this.x2)
        );
      });
      // change the total number of beads
      totalBeads += this.beads.length - prevLength;
      // draw each bead on the string
      this.beads.forEach((obj) => {
        obj.x = obj.x + this.xstep;
        obj.y = obj.y + this.ystep;
        p.push();
        p.noStroke();
        var beadColor = blend_colors(
          this.color1,
          this.color2,
          Math.hypot(obj.x - this.x1, obj.y - this.y1) / this.length
        );
        p.fill(beadColor);
        p.circle(obj.x, obj.y, 10);
        p.pop();
      });
      // decide whether or not to spawn a new bead
      if (this.willSpawn()) {
        this.beads.push({ x: this.x1, y: this.y1 });
      }
    }
  }
  var offset = 3; // arrow size
  function drawEdge(edge, p1, p2) {
    // draw an edge
    // console.log("E", edge);
    var x1 = toScreen(p1).x;
    var y1 = toScreen(p1).y;
    var x2 = toScreen(p2).x;
    var y2 = toScreen(p2).y;
    //var edgeColor = colors[separation[edge.source.id]];
    p.strokeWeight(1);
    const scaling = separation
      ? separation[edge.target.id] < 2
        ? 0.7
        : 0.4
      : 0.6;
    // const color = "rgba(255,255,255," + scaling + ")";
    // separation ? 'rgba(255,255,255,' +  (Math.max(1 - separation[edge.target.id]/4, 0.0)*0.7 + 0.3) + ')'
    //                         : 255;
    const color = cool[meta[edge.data].order - 1];
    p.stroke(color);
    //p.strokeWeight(2);
    p.line(x1, y1, x2, y2);
    // make arrow tip
    p.push(); //start new drawing state
    //p.fill(edgeColor);
    p.fill(color);
    var angle = p.atan2(y1 - y2, x1 - x2); //gets the angle of the line
    var m = (y2 - y1) / (x2 - x1); // slope
    var arrowDistance = nodeSize;
    if (edge.target.id == uid) arrowDistance = arrowDistance * 1.5;
    var xstep = (arrowDistance + offset) / 2 / Math.sqrt(m * m + 1);
    if (x2 < x1 && xstep > 0) xstep = -xstep;
    var ystep = xstep * m;
    if (xstep && ystep) {
      p.translate(x2 - xstep, y2 - ystep); //translates to the destination vertex
      p.rotate(angle - p.HALF_PI); //rotates the arrow point
      p.triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, -offset / 2); //draws the arrow point as a triangle
    }
    p.pop();
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

    const order = meta[node.id].order;
    p.fill(custom[order - 1]);
    p.noStroke();
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
    } else {
      polygon(p, 0.75 * nodeSize, order);
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
    // if (scaling == 1) {
    //   p.stroke(CONST.primaryCol);
    //   p.strokeWeight(3);
    // } else {
    p.noStroke();
    // }
    if (node.id == uid) {
      p.text(node.id, -10, -30);
    } else {
      let text = meta[node.id].label;
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
    fullWidth = props.width;
    fullHeight = props.width;
    width = fullWidth - padding;
    height = fullHeight - padding;
    const cayleyGraph = getCayleyGraph(props.groupName);
    graph = new Springy.Graph();
    graph.loadJSON(cayleyGraph);
    meta = cayleyGraph.meta;
    // fixedGraph = false;
    const oldLayout = layout;
    layout = new Springy.Layout.ForceDirected(
      graph,
      stiffness, // Spring stiffness
      repulsion, // Node repulsion
      0.2 // Damping
    );
    // if (oldLayout) {
    //   layout.tick(0.05);
    //   for (const id in oldLayout.nodePoints) {
    //     // slow it down when changing from previous graph
    //     // tickAmount = Math.min(
    //     //   0.008 + Object.keys(layout.nodePoints).length * 0.0005,
    //     //   0.02
    //     // );
    //     tickAmount = 0.05;
    //     if (id in layout.nodePoints) {
    //       layout.nodePoints[id].p.x = oldLayout.nodePoints[id].p.x;
    //       layout.nodePoints[id].p.y = oldLayout.nodePoints[id].p.y;
    //       layout.nodePoints[id].a.x = oldLayout.nodePoints[id].a.x;
    //       layout.nodePoints[id].a.y = oldLayout.nodePoints[id].a.y;
    //       layout.nodePoints[id].v.x = oldLayout.nodePoints[id].v.x;
    //       layout.nodePoints[id].v.y = oldLayout.nodePoints[id].v.y;
    //     }
    //   }
    // }
    layout.tick(0.05);
    // triggered when graph hasn't changed, but still need the position
    // highlightedUserId = props.highlightedUserId;
    p.loop();
  };
  const strings = [];
  p.setup = () => {
    let canvas = p.createCanvas(fullWidth || 650, fullHeight);
    p.textFont("Helvetica");
    p.textSize(8);
    layout.tick(0.03);
  };

  p.draw = () => {
    //p.camera(100,0, 380, 0, 0, 0, 0, 1, 0);
    // p.background(CONST.primaryCol);
    p.background("white");
    p.smooth();
    layout.eachEdge(function (edge, spring) {
      drawEdge(edge, spring.point1.p, spring.point2.p);
    });
    // if (!fixedGraph) {
    if (layout.totalEnergy() > 0.01) {
      layout.tick(tickAmount);
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
      //beads = new Beads(edge.x1, edge)
    }
    // } else {
    //   // strings.forEach(string => {
    //   //     string.draw();
    //   // });
    // }
    layout.eachNode(function (node, point) {
      drawNode(node, point.p);
    });
  };
};
export default sketch;
