import { Day } from "../day";

export class Day9 extends Day {
  elevsFlat: Array<Elev> = this.parseInput();
  parseInput(): Array<Elev> {
    let elevs = this.inputLines.map(line => line.split("")).map((row, y) => row.map((pos, x) => new Elev(y, x, +pos)));
    this.setNeighbors(elevs);
    return elevs.flat();
  }

  override part1 = () => {
    return this.elevsFlat.filter(elev => elev.isLocalMinimum()).map(value => value.value).reduce((acc, b) => acc + (b+1), 0);
  }

  override part2 = () => {
    let elevs = this.parseInput();
    return elevs.filter(elev => elev.isLocalMinimum()).map(value => value.findBasin(new Set()).size).sort((a,b) => (b - a)).slice(0, 3)
      .reduce((acc, b) => acc * b)
  }

  setNeighbors(elevs: Elev[][]) {
    // set norths
    elevs.forEach((row, i) => {
      row.forEach((elev, j) => {
        elev.north = elevs[i-1]?.[j] ?? undefined;
        elev.south = elevs[i+1]?.[j] ?? undefined;
        elev.east = elevs[i]?.[j-1] ?? undefined;
        elev.west = elevs[i]?.[j+1] ?? undefined;
      })
    })
  }
}

class Elev {
  
  north?: Elev;
  south?: Elev;
  east?: Elev;
  west?: Elev;

  xPos: number; // col
  yPos: number; // row
  value: number;

  constructor(y: number, x: number, value: number) {
    this.yPos = y;
    this.xPos = x;
    this.value = value;
  }

  adjacents(): Array<Elev> {
    return [this.north, this.south, this.east, this.west].filter(a => a) as Array<Elev>;
  }
  isLocalMinimum(): boolean {
    return this.adjacents().map(adj => (!adj || adj.value > this.value)).reduce((acc, b) => acc && b);
  }

  findBasin(establishedBasin: Set<Elev>): Set<Elev> {
    establishedBasin.add(this);
    if (this.adjacents().map(adj => establishedBasin.has(adj) || adj.value === 9).reduce((acc, b) => acc && b)) {
      return establishedBasin;
    } else {
      this.adjacents().forEach(adj => {
        if (!establishedBasin.has(adj) && adj.value !== 9) {
          adj.findBasin(establishedBasin);
        }
      })
    }
    return establishedBasin;
  }
}