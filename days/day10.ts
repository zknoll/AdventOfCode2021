import { reverse } from "../helpers/objectHelpers";
import { Day } from "../day";
import { median } from "../helpers/arrayHelpers";

export class Day10 extends Day {
  pointsMap: any = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
  }
  autoPointsMap: any = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
  }

  openingChars = new Set("([{<".split(""));
  closingChars = new Set(")]}>".split(""));
  closeToOpen: any = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
  };

  override part1 = () => {
    const rows = this.inputLines.map(row => row.trim().split(""));
    return rows.map(row => {
      let stack: string[] = [];
      let points = 0;
      row.some((entry) => {
        if (this.openingChars.has(entry)) {
          stack.push(entry);
        } else {
          if (!stack.length || this.closeToOpen[entry] !== stack[stack.length - 1]) {
            points = this.pointsMap[entry];
            return true; // hi
          } else {
            stack.pop(); // we have matched open to close
          }
        }
      });
      return points;
    }).reduce((acc, b) => acc + b)
  }

  override part2 = () => {
    const rows = this.inputLines.map(row => row.trim().split(""));
    let autoScore = rows.map(row => {
      let stack: string[] = [];
      let corrupted = row.some(entry => {
        if (this.openingChars.has(entry)) {
          stack.push(entry);
        } else {
          if (!stack.length || this.closeToOpen[entry] !== stack[stack.length - 1]) {
            return true;
          } else {
            stack.pop(); // we have matched open to close
          }
        }
      });
      if (!corrupted) return stack.reverse()
        .map(openingChar => this.autoPointsMap[reverse(this.closeToOpen)[openingChar]])
        .reduce((acc, b) => 5*acc + b, 0);
    })
    return median(autoScore.filter(a => a));
  }
}