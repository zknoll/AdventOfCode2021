import { Day } from "../day";
import input from "../inputs/input2.json"

export class Day2 extends Day {
  override part1 = () => {
    let vertPos = input.lines
      .filter((value) => !(value.search("forward") === 0) )
      .map((value) =>  +(value.replace("up ", "-").replace("down ", "+")) )
      .reduce((acc, b) => acc + b)

    let horizPos = input.lines
      .filter((value) => (value.search("forward") === 0))
      .map((value) => +(value.replace("forward ", "")))
      .reduce((acc, b) => acc + b)

    console.log(vertPos);
    console.log(horizPos);
    return vertPos * horizPos;

  }

  override part2 = () => {
    let aim = 0;
    let horiz = 0;
    let depth = 0;1234

    input.lines.forEach((value) => {
      if (value.search("forward") === 0) {
        horiz += +value.replace("forward ", "")
        depth += aim * +value.replace("forward ", "");
      } else if (value.search("up") === 0) {
        aim += +value.replace("up ", "-");
      } else if (value.search("down") === 0) {
        aim += +value.replace("down ", "+");
      } else {
        throw new Error("failed!");
      }
    });
    console.log(aim);
    console.log(horiz);
    console.log(depth);
    return (horiz * depth);
  }
}