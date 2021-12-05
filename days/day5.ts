import { Day } from "../day";

export class Day5 extends Day {
  size = 1000;
  override part1 = () => {
    const coords: Array<Array<number>> = new Array(this.size).fill([]).map(() => new Array(this.size).fill(0));
    const regex = /(\d+),(\d+) -> (\d+),(\d+)/i;
    this.inputLines.forEach(line => {
      let regexMatch = line.match(regex)!;
      let x1 = +regexMatch[1];
      let y1 = +regexMatch[2];
      let x2 = +regexMatch[3];
      let y2 = +regexMatch[4];
      if (x1 === x2 || y1 === y2) {
        if (x1 === x2) {
          if (y1 < y2) {
            while (y1 <= y2) {
              if (coords[y1][x1]) {
                coords[y1][x1] += 1;
              } else {
                coords[y1][x1] = 1;
              }
              y1++;
            }
          } else {
            while (y2 <= y1) {
              if (coords[y2][x2]) {
                coords[y2][x2] += 1;
              } else{
                coords[y2][x2] = 1;
              }
              y2++;
            }
          }
        } else {
          if (x1 < x2) {
            while (x1 <= x2) {
              if (coords[y1][x1]) {
                coords[y1][x1] += 1;
              } else {
                coords[y1][x1] = 1;
              }
              x1++;
            }
          } else {
            while (x2 <= x1) {
              if (coords[y2][x2]) {
                coords[y2][x2] += 1;
              } else{
                coords[y2][x2] = 1;
              }
              x2++;
            }
          }
        }
      } else {
        console.log(`skipped, diagonal`);
      }
    })
    //console.log(coords);
    let dangerPoints = coords.flatMap(value => value).filter(value => (value >= 2)).length
    return dangerPoints
  
  }

  override part2 = () => {
    const coords: Array<Array<number>> = new Array(this.size).fill([]).map(() => new Array(this.size).fill(0));
    let regex = /(\d+),(\d+) -> (\d+),(\d+)/i;
    this.inputLines.forEach(line => {
      let regexMatch = line.match(regex)!;
      let x1 = +regexMatch[1];
      let y1 = +regexMatch[2];
      let x2 = +regexMatch[3];
      let y2 = +regexMatch[4];
      if (x1 === x2 || y1 === y2) {
        if (x1 === x2) {
          if (y1 < y2) {
            while (y1 <= y2) {
              coords[y1][x1] += 1;
              y1++;
            }
          } else {
            while (y2 <= y1) {
              coords[y2][x2] += 1;
              y2++;
            }
          }
        } else {
          if (x1 < x2) {
            while (x1 <= x2) {
              coords[y1][x1] += 1;
              x1++;
            }
          } else {
            while (x2 <= x1) {
              coords[y2][x2] += 1;
              x2++;
            }
          }
        }
      } else {
        // diagonal...
        // down to right
        if (x1 < x2 && y1 < y2) {
          while (x1 <= x2) {
            coords[y1][x1] +=1;
            x1++;
            y1++;
          }
        } else if (x2 < x1 && y1 < y2) {
          while (x2 <= x1) {
            coords[y1][x1] += 1;
            x1--;
            y1++;
          }
        } else if (x1 < x2 && y2 < y1) {
          while (x1 <= x2) {
            coords[y1][x1] += 1;
            x1++;
            y1--;
          }
        } else if (x2 < x1 && y2 < y1) {
          while(x2 <= x1) {
            coords[y1][x1] += 1;
            x1--;
            y1--;
          }
        }
      }
    });
    console.log(coords.map(value => value.toString()));
    let dangerPoints = coords.flatMap(value => value).filter(value => (value >= 2)).length
    return dangerPoints
  }
}