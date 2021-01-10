import { Formula } from "./App";

function getSymbol(op, num) {
  return `\\mathbb ${op}_${num}`;
}
// U+2124 is unicode for \mathbb Z
export const groupMetadata = {
  1: {
    name: "Trivial",
    symbol: "𝟙",
    text: "The most boringest group",
  },
  Z3: {
    name: `Z mod 3`,
    symbol: getSymbol("Z", 3),
    text:
      "\u2124 mod 3 has three elements, every non \
      identity element is a generator.",
  },
  Z2: {
    name: "\u2124 mod 2",
    symbol: getSymbol("Z", 2),
    text: "",
  },
  Z4: {
    name: "\u2124 mod 4",
    symbol: getSymbol("Z", 4),
    text: "",
  },
  Z2xZ2: {
    name: "Klein Four",
    symbol: `${getSymbol("Z", 2)}\\times${getSymbol("Z", 2)}`,
    text: "",
  },
  Z2xZ2xZ2: {
    name: "\u2124 mod 2 Cubed",
    symbol: `(${getSymbol("Z", 2)})^3`,
    text: "",
  },
  Z2xZ2xZ4: {
    name: "Klein Four times \u2124 mod 4",
    symbol: `${getSymbol("K", 4)} \\times ${getSymbol("Z", 4)}`,
    text: "",
  },
  Z2xZ3: {
    name: "\u2124\u2082 times \u2124\u2083",
    symbol: `${getSymbol("Z", 2)}\\times${getSymbol("Z", 3)}`,
    text: "",
  },
  Z2xZ2xZ2xZ2: {
    name: "\u2124\u2082\u2074",
    symbol: `(${getSymbol("Z", 2)})^4`,
    text: "",
  },
  Z3xZ3: {
    name: "\u2124\u2083 squared",
    symbol: `${getSymbol("Z", 3)}\\times${getSymbol("Z", 3)}`,
    text: "",
  },
  Z5: {
    name: "\u2124 mod 5",
    symbol: getSymbol("Z", 5),
    text: "",
  },
  S3: {
    name: "S3: Symmetries of a triangle",
    symbol: "S_3",
    text: "",
  },
  S4: {
    name: "S4: Symmetries of a tetrahedron",
    symbol: "S_4",
    text: "",
  },
  S5: {
    name: "Symmetry group on five elements",
    symbol: "S_5", //\u2085",
    text: "",
  },
  A4: {
    name: "Alternating group on four elements",
    symbol: "A_4",
    text: "",
  },
  A5: {
    name: "Alternating group on five elments",
    symbol: "A_5",
    text: "",
  },
  Z3xZ3xZ3: {
    name: "Z mod 3 cubed",
    symbol: `(${getSymbol("Z", 3)})^3`,
    text: "",
  },
  Q8: {
    name: "The Quaternions",
    symbol: "Q_8",
    text: (
      <div>
        The Quaternions are everyone's favourite group. They were first
        described by Irish mathematician William Rowan Hamilton in 1843 and
        applied to mechanics in three-dimensional space. The vector part of a
        quaternion can be interpreted as a coordinate vector in{" "}
        <Formula tex={`\\mathbb R^3`} />; therefore, the algebraic operations of
        the quaternions reflect the geometry of <Formula tex={`\\mathbb R^3`} />
        ;. Just as complex numbers can be represented as matrices, so can
        quaternions. There are at least two ways of representing quaternions as
        matrices in such a way that quaternion addition and multiplication
        correspond to matrix addition and matrix multiplication.
      </div>
    ),
  },
};

export const latticeData = {
  Q8: {
    nodes: ["Q8", "(i)", "(j)", "(k)", "Z2", "𝟙"],
    edges: [
      ["Q8", "(i)"],
      ["Q8", "(j)"],
      ["Q8", "(k)"],
      ["(i)", "Z2"],
      ["(j)", "Z2"],
      ["(k)", "Z2"],
      ["Z2", "𝟙"],
    ],
  },
};

// export const latticeData = {
//   Q8: (nodes = {
//     Q8: "Q8",
//     "(i)": "Z4",
//     "(j)": "Z4",
//     "(k)": "Z4",
//     "𝟙": "Trivial",
//   }),
// };
