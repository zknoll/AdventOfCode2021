import { Day } from "../day";

export class Day11 extends Day {
  octopiGrid: Array<Array<Octopus>> | null = null;
  octopi: Array<Octopus> = this.parseInput();
  parseInput(): Array<Octopus> {
    this.octopiGrid = this.inputLines.map(line => line.split("")).map((row, y) => row.map((pos, x) => new Octopus(y, x, +pos)));
    this.setNeighbors(this.octopiGrid);
    return this.octopiGrid.flat();
  }
  override part1: () => any = () => {
    const steps = 195;
    let flashCount = 0;
    for (let i = 0; i < steps; i++) {
      let stepFlashCount = 0;
      this.octopi.forEach((o) => o.increaseEnergy());
      while(this.octopi.filter(o => o.energy > 9).length) {
        this.octopi.filter(o => o.energy > 9).forEach(o => { o.flash(); flashCount++; stepFlashCount++ });
      }
      this.octopi.forEach(o => o.reset());
      console.log(this.octopiGrid?.map(row => JSON.stringify(row.map(o => o.energy))))
    }
    return `FlashCount = ${flashCount}`;

  }

  override part2: () => any = () => {
    // reset....
    this.octopi = this.parseInput();
    let stepCount = 0;
    while (true) {
      stepCount++;
      let stepFlashCount = 0;
      this.octopi.forEach((o) => o.increaseEnergy());
      while(this.octopi.filter(o => o.energy > 9).length) {
        this.octopi.filter(o => o.energy > 9).forEach(o => { o.flash(); stepFlashCount++ });
      }
      this.octopi.forEach(o => o.reset());
      console.log(this.octopiGrid?.map(row => JSON.stringify(row.map(o => o.energy))))
      if (stepFlashCount === this.octopi.length) {
        break;
      }
    }
    return "Octopi synchronized on step " + stepCount
  }

  setNeighbors(octopi: Octopus[][]) {
    // set norths
    octopi.forEach((row, i) => {
      row.forEach((octopus, j) => {
        octopus.n = octopi[i-1]?.[j] ?? undefined;
        octopus.s = octopi[i+1]?.[j] ?? undefined;
        octopus.e = octopi[i]?.[j-1] ?? undefined;
        octopus.w = octopi[i]?.[j+1] ?? undefined;
        //diagonals
        octopus.ne = octopi[i-1]?.[j-1] ?? undefined;
        octopus.nw = octopi[i-1]?.[j+1] ?? undefined;
        octopus.se = octopi[i+1]?.[j-1] ?? undefined;
        octopus.sw = octopi[i+1]?.[j+1] ?? undefined;
      })
    })
  }
}

// Ripped this from Day 9 :D
class Octopus {
  n?: Octopus;
  s?: Octopus;
  e?: Octopus;
  w?: Octopus;
  ne?: Octopus;
  nw?: Octopus;
  se?: Octopus;
  sw?: Octopus;

  xPos: number; // col
  yPos: number; // row
  energy: number;
  hasFlashed: boolean = false;

  constructor(y: number, x: number, value: number) {
    this.yPos = y;
    this.xPos = x;
    this.energy = value;
  }

  adjacents(): Array<Octopus> {
    return [this.n, this.s, this.e, this.w, this.ne, this.nw, this.se, this.sw].filter(a => a) as Array<Octopus>;
  }

  increaseEnergy() {
    if (!this.hasFlashed) {
      this.energy += 1;
    }
  }

  flash() {
    if (this.energy > 9) {
      this.hasFlashed = true;
      this.adjacents().forEach(adj => adj.increaseEnergy());
      this.energy = 0;
    }
  }
  
  reset() {
    this.hasFlashed = false;
  }
}