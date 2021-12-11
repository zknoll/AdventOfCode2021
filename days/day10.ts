import { Day } from "../day";

export class Day10 extends Day {

  PAREN_PTS = 3;
  SQUARE_PTS = 57;
  CURLY_PTS = 1197;
  ANGLE_PTS = 25137;


  override part1 = () => {
      const rows = this.inputLines.map(row => row.trim().split(""));
      rows.forEach(row => {
        let stack = [];
        row.forEach((entry))
      })
  }

  override part2 = () => {

  }
}