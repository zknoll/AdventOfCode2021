import { reverse } from "../helpers/objectHelpers";
import { Day } from "../day";
import { median } from "../helpers/arrayHelpers";

export class Day10 extends Day {

  PAREN_PTS = 3;
  SQUARE_PTS = 57;
  CURLY_PTS = 1197;
  ANGLE_PTS = 25137;

  pointsMap: any = {
    ")": this.PAREN_PTS,
    "]": this.SQUARE_PTS,
    "}": this.CURLY_PTS,
    ">": this.ANGLE_PTS
  }

  autoPointsMap: any = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
  }

  openingChars = new Set(["(", "[", "{", "<"]);
  closingChars = new Set(")]}>".split(""));
  closeToOpen: any = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"
  };

  override part1 = () => {
      const rows = this.inputLines.map(row => row.trim().split(""));
      let score = 0;
      return rows.map(row => {
        let stack: string[] = [];
        let points = 0;
        row.some((entry, i) => {
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
      return score;
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