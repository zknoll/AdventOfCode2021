import { Day } from "../day";

export class Day9 extends Day {

  parseInput(): Array<Elev> {
    let positions = this.inputLines.map(line => line.split(""));
    let elevs = positions.map((row, y) => row.map((pos, x) => new Elev(y, x, +pos)));
    this.setNeighbors(elevs);
    return elevs.flat();
  }
  override part1 = () => {
    let elevsFlat = this.parseInput();
    return elevsFlat.filter(elev => elev.isLocalMinimum()).map(value => { console.log(value.value); return value.value}).reduce((acc, b) => acc + (b+1), 0);
  }

  override part2 = () => {
    let elevs = this.parseInput();
    const largestBasins = elevs.filter(elev => elev.isLocalMinimum()).map(value => value.findBasin(new Set()).size).sort((a,b) => (b - a)).slice(0, 3);
    return {
      largestBasins,
      answer: largestBasins.reduce((acc, b) => acc * b)
    }
  }

  setNeighbors(elevs: Elev[][]) {
    // set norths
    elevs.forEach((row, i) => {
      if (i !== 0) {
        row.forEach((elev, j) => {
          elev.north = elevs[i-1][j];
        });
      }
    });

    // set souths
    elevs.forEach((row, i) => {
      if (i !== elevs.length - 1) {
        row.forEach((elev, j) => {
          elev.south = elevs[i+1][j];
        });
      }
    });

    elevs.forEach((row, i) => {
      row.forEach((elev, j) => {
        if (j !== 0) {
          elev.east = elevs[i][j-1];
        }
      });
    });

    elevs.forEach((row, i) => {
      row.forEach((elev, j) => {
        if (j !== row.length - 1) {
          elev.west = elevs[i][j+1];
        }
      });
    });
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
    const adjacents: Array<Elev> = []
    this.north ? adjacents.push(this.north) : null // do nothing
    this.south ? adjacents.push(this.south) : null // do nothing
    this.east ? adjacents.push(this.east) : null // do nothing
    this.west ? adjacents.push(this.west) : null // do nothing
    return adjacents;
  }
  isLocalMinimum(): boolean {
    return (!this.north || this.north.value > this.value) &&
      (!this.south || this.south.value > this.value) &&
      (!this.east || this.east.value > this.value) &&
      (!this.west || this.west.value > this.value);
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
    //console.log(`Found basin of size ${establishedBasin.size}`)
    return establishedBasin;
  }
}