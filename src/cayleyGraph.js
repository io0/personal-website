// 
let example_json_graph = {
  nodes: ["1", "(12)", "(13)", "(23)", "(123)", "(132)"],
  meta: {
    "1": {
      order: 1,
      label: "𝟙"
    },
    "(12)" : {
      order: 2,
      label: "(12)"
    }
    //"labels": Object.fromEntries(nodes.map(nodeId => ([nodeId, nodeId == 7 ? "You" : "???"])))
  },
  // edges format: [node 1, node 2, generator] -when you left multiply node1 by the generator you get node 2
  edges: [["(12)(134)", "(12)", "(13)"], ["(12)", "(13)", "(123)"]],
};
// takes a permutation in the format [[1,2,3],[4,5],[6,8,7]]
// and converts it to the string "(123)(45)(687)"
function permToString(perm) {
  let stringRep = "";
  for (let cycle of perm) {
    stringRep = stringRep + "(";
    for (let i of cycle) {
      stringRep = stringRep + i.toString();
    }
    stringRep = stringRep + ")";
  }
  return stringRep;
}
const IDEN = "()";
/**
 *
 * @param {number} num
 * the symetry group S_n acts on a set K (with |K|=n), num is an element of K we want to know the destination of
 * @param {*} perms
 * array of arrays (cycles) in written order, each sub-array is a little cycle
 */
function getDestination(number, perms) {
  let reversedPerms = perms.slice().reverse();
  //   console.log("reverse", reversedPerms);
  // reverse perms to apply the rightmost permutation first
  let nxt = number;
  for (const per of reversedPerms) {
    // for each cycle in the permutation
    if (per.includes(nxt)) {
      nxt = per[(per.indexOf(nxt) + 1) % per.length];
    }
  }
  return nxt;
}

function getOrder(element) {
  let currentElement = element;
  let order = 1;
  while (permToString(currentElement) != IDEN) {
    currentElement = mult([...element, ...currentElement]);
    order++;
  }
  return order;
}

function getLabel(element,groupName) {
  let currentElement = element;
  if (permToString(currentElement) == IDEN){
    return "𝟙";
  }
  else if (groupName == "Q8" ) {
    const i = groupGenerators["Q8"][0];
    const j = groupGenerators["Q8"][1];
    if (permToString(currentElement)==permToString(i)){
      return "i";
    } else if (permToString(currentElement)==permToString(j)){
      return "j";
    } else if (getOrder(currentElement)==2){
      return "-1"
    } else if (permToString(currentElement)==permToString(mult([...i, ...j]))) {
      return "k";
    } else if (permToString(currentElement)==permToString(mult([...j, ...i]))) {
      return "-k";
    } else if (permToString(currentElement)==permToString(mult([...i, ...i, ...i]))) {
      return "-i";
    } else if (permToString(currentElement)==permToString(mult([...j, ...j, ...j]))) {
      return "-j";
    } else {
      console.log("Error!!! in getLabel");
      return permToString(currentElement);
    }
  }
  else {
    return permToString(currentElement);
  }
}

/**
 *
 * @param {*} perms
 * 2D array of cycles to be simplified, e.g. [(1,2,3),(1,2)]
 * @param {*} n
 * integer, size of the permutation group
 * @returns disjoint cycles in 2D array
 */

function mult(perms) {
  const product = [];
  const done = []; // elements that have been computed
  const n = Math.max(...perms.map((el) => Math.max(...el))); // max over all perms

  for (let i = 0; i < n; i++) {
    let num = i + 1;
    if (!done.includes(num)) {
      const currentCycle = [];
      while (!currentCycle.includes(num)) {
        currentCycle.push(num);
        let nxt = getDestination(num, perms);
        num = nxt;

        done.push(num);
      }
      if (currentCycle.length >= 2) {
        product.push([...currentCycle]);
      }
    }
  }
  if (!product.length) {
    return [[]];
  }
  return product;
}

// function conjugate_element()

const groupGenerators = {
  Z2: [[[1, 2]]],
  Z2xZ2: [[[1, 2]], [[3, 4]]],
  Z2xZ2xZ2: [[[1, 2]], [[3, 4]], [[5, 6]]],
  Z2xZ2xZ4: [[[1, 2]], [[3, 4]], [[5, 6, 7, 8]]],
  Z2xZ2xZ2xZ2: [[[1, 2]], [[3, 4]], [[5, 6]], [[7, 8]]],
  Z2xZ3: [[[1, 2]], [[3, 4, 5]]],
  Z3: [[[1, 2, 3]]],
  Z3xZ3: [[[1, 2, 3]], [[4, 5, 6]]],
  Z3xZ3xZ3: [[[1, 2, 3]], [[4, 5, 6]], [[7, 8, 9]]],
  Z4: [[[1, 2, 3, 4]]],
  Z5: [[[1, 2, 3, 4, 5]]],
  S3: [[[1, 2]], [[1, 2, 3]]],
  S4: [[[1, 2]], [[1, 2, 3, 4]]],
  S5: [[[1, 2]], [[1, 2, 3, 4, 5]]],
  A4: [[[1, 2],[3, 4]],[[1, 2, 3]]],
  A5: [[[1, 2],[3, 4]],[[1, 3, 5]]],
  Q8: [[[1,3,2,4],[5,7,6,8]],[[1,5,2,6],[3,8,4,7]]],
};
export const groupNames = Object.keys(groupGenerators);

function DFS(currentNode, nGraph, generators, groupName) {
  // add the current node and the edges to nGraph (depth first search)
  let currentNodeName = permToString(currentNode);
  const order = getOrder(currentNode);
  const label = getLabel(currentNode, groupName);
  nGraph.meta[currentNodeName] = {order,
  label};  // add the meta information - note: label is short for label:label

  nGraph.nodes.push(currentNodeName); // mark node as visited
  for (const gen of generators) {
    const child = mult([...gen, ...currentNode]);
    // console.log("multiplier", [...gen, ...currentNode]);
    // console.log("child", child);
    const childName = permToString(child);
    const genName = permToString(gen);
    nGraph.edges.push([currentNodeName, childName, genName]);
    if (!nGraph.nodes.includes(childName)) {
      // call DFS  on child recursively
      DFS(child, nGraph, generators, groupName);
    }
  }
}

export const getCayleyGraph = (groupName) => {
  const generators = groupGenerators[groupName];
  const currentNode = [[]];
  let newGraph = {
    nodes: [],
    meta: {},
    edges: [],
  };
  DFS(currentNode, newGraph, generators, groupName);
  console.log("\nnewGraph", newGraph);
  return newGraph;
};
