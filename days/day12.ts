import path from "path/posix";
import { getEnabledCategories } from "trace_events";
import { Day } from "../day";

export class Day12 extends Day {
  parseInput(): Array<Vertex> {
    let input = this.inputLines.map(row => row.split("-"));
    // initialize the vertices first
    let vertices = [...new Set(input.flat())].map(x => new Vertex(x));
    // now add edges
    input.forEach(conn => {
      vertices.find(v => v.index === conn[0])!.connectedVertices.push(vertices.find(v => v.index === conn[1])!);
      vertices.find(v => v.index === conn[1])!.connectedVertices.push(vertices.find(v => v.index === conn[0])!);
    })
    // and remove orphans
    return vertices.filter(v => !v.isOrphaned())
  }

  override part1: () => any = () => {
    const vertices = this.parseInput();
    const start = vertices.find(v => v.index === "start")!;
    const end   = vertices.find(v => v.index === "end")!;
    vertices.forEach(v => v.connectedVertices.forEach(cv => console.log(`${v.index} connects to ${cv.index}`)))
    const graph = new Graph(vertices);
    graph.findAllPaths(start, end, []);
    console.log(`Found ${graph.paths.length} paths from start to end`)
    return graph.paths.length;
  };

  override part2: () => any = () => {
    const vertices = this.parseInput();
    const start = vertices.find(v => v.index === "start")!;
    const end   = vertices.find(v => v.index === "end")!;
    const graph = new Graph(vertices);
    graph.findAllPaths2(start, end);
    console.log(`Found ${graph.paths2.size} paths from start to end`)
    return graph.paths2.size;
  };
}

class Graph {
  vertices: Array<Vertex>;
  constructor(vertices: Array<Vertex>) { this.vertices = vertices }

  paths: Array<Array<Vertex>> = [];
  paths2: Set<String> = new Set();

  findAllPaths(a: Vertex, b: Vertex, currentPath: Array<Vertex>) {
    currentPath.push(a);
    if (a === b) {
      console.log(`Found path = ${currentPath.map(v => v.index)}`)
      this.paths.push(new Array(...currentPath));
      currentPath.pop();
      return;
    }
    a.connectedVertices.forEach(cv => {
      if (cv.isLarge ||
        (!cv.isSmallPlus && !currentPath.find(v => v === cv)) ||
        (cv.isSmallPlus && !(currentPath.filter(v => v === cv).length >= 2))
      ) {
        this.findAllPaths(cv, b, currentPath);
      }
    });
    currentPath.pop();
  }

  findAllPaths2(a: Vertex, b: Vertex) {
    this.vertices.filter(v => !v.isLarge && v.index !== "start" && v.index !== "end").forEach(smallV => {
      smallV.isSmallPlus = true; // promote to "Small Plus"
      this.findAllPaths(a, b, []);
      smallV.isSmallPlus = false;
    });
    // uhhh... deduplicate?  the original paths were duplicated in this count, idk if this happens every time
    this.paths.map(p => p.map(v => v.index).join("")).map(ps => this.paths2.add(ps));
  }
}
class Vertex {
  index: string;
  isLarge: boolean;
  isSmallPlus: boolean = false;
  connectedVertices: Array<Vertex> = [];
  constructor (index: string) {
    this.index = index;
    this.isLarge = index.match(/[a-z]+/) === null;
  }

  isOrphaned(): boolean {
    return !this.isLarge && this.connectedVertices.length === 1 && !this.connectedVertices[0]?.isLarge
  }
}