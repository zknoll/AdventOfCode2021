import { Day } from "../day";
import { median } from "../helpers/arrayHelpers";

export class Day7 extends Day {
  override part1 = () => {
    let crabPositions = this.inputLines[0].split(",").map((a) => +a);
    let medianPosition = median(crabPositions);
    console.log(crabPositions);
    console.log(medianPosition);
    return crabPositions.map((pos) => Math.abs(pos - medianPosition)).reduce((acc, b) => acc + b)
  }

  override part2 = () => {
    let crabPositions = this.inputLines[0].split(",").map((a) => +a);
    let avg = Math.floor(crabPositions.reduce((acc, b) => acc + b) / crabPositions.length);

    return Math.min(...([avg-2, avg-1, avg, avg+1, avg+2].map((value) => {
      return crabPositions.map(pos => this.sumDistance(Math.abs(pos - value))).reduce((acc, b) => acc + b)
    })))
  }

  sumDistance(num: number) {
    let x = num;
    let sum = 0;
    while (x > 0) {
      sum += x;
      x--;
    }
    return sum;
  }
}