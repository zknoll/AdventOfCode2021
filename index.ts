import { Day1 } from "./days/day1";
import { Day2 } from "./days/day2";
import { Day3 } from "./days/day3";
import { Day4 } from "./days/day4";
import { Day5 } from "./days/day5";
import { Day6 } from "./days/day6";
import { Day7 } from "./days/day7";
import { Day8 } from "./days/day8";
import { Day9 } from "./days/day9";
import { Day10 } from "./days/day10";
import { Day11 } from "./days/day11";
import { Day12 } from "./days/day12";
import { Day13 } from "./days/day13";
import { Day14 } from "./days/day14";
import { Day15 } from "./days/day15";
import { Day16 } from "./days/day16";
import { Day17 } from "./days/day17";
import { Day18 } from "./days/day18";
import { Day19 } from "./days/day19";
import { Day20 } from "./days/day20";
import { Day21 } from "./days/day21";
import { Day22 } from "./days/day22";
import { Day23 } from "./days/day23";
import { Day24 } from "./days/day24";
import { Day25 } from "./days/day25";
import { Day } from "./day";


const inputFile = `./inputs/input${+process.env.DAY!}.txt`;
const testFile = "./inputs/test.txt";
let file: string;
if (process.env.TEST === "true") {
  file = testFile;
} else {
  file = inputFile;
}
let day: Day;
switch(+process.env.DAY!) {
  case 1:
    day = new Day1(file);
    break;
  case 2:
    day = new Day2(file);
    break;
  case 3:
    day = new Day3(file);
    break;
  case 4:
    day = new Day4(file);
    break;
  case 5:
    day = new Day5(file);
    break;
  case 6:
    day = new Day6(file);
    break;
  case 7:
    day = new Day7(file);
    break;
  case 8:
    day = new Day8(file);
    break;
  case 9:
    day = new Day9(file);
    break;
  case 10:
    day = new Day10(file);
    break;
  case 11:  
    day = new Day11(file);
    break;
  case 12:
    day = new Day12(file);
    break;
  case 13:
    day = new Day13(file);
    break;
  case 14:
    day = new Day14(file);
    break;
  case 15:
    day = new Day15(file);
    break;
  case 16:
    day = new Day16(file);
    break;
  case 17:
    day = new Day17(file);
    break;
  case 18:
    day = new Day18(file);
    break;
  case 19:
    day = new Day19(file);
    break;
  case 20:
    day = new Day20(file);
    break;
  case 21:
    day = new Day21(file);
    break;
  case 22:
    day = new Day22(file);
    break;
  case 23:
    day = new Day23(file);
    break;
  case 24:
    day = new Day24(file);
    break;
  case 25:
    day = new Day25(file);
    break;
  default: 
    day = new Day1("./inputs/test.txt");
}

console.log("");
console.log("");
console.log("-------------------");
console.log("EXECUTING PART 1...");
console.log("-------------------");
console.log("");
let start1 = process.hrtime();
let result1 = day.part1();
let end1 = process.hrtime(start1);
console.log(`${end1[0] + end1[1]/1000000000} seconds`);

console.log("");
console.log("");
console.log("-------------------");
console.log("EXECUTING PART 2...");
console.log("-------------------");
console.log("");
let start2 = process.hrtime();
let result2 = day.part2();
let end2 = process.hrtime(start2);
console.log(`${end2[0] + end2[1]/1000000000} seconds`);

console.log("-------------------");
console.log(`Part 1 Answer: ${result1}`)
console.log(`Part 2 Answer: ${result2}`)
console.log(`Part 1 executed in ${end1[0] + end1[1]/1000000000} seconds`);
console.log(`Part 2 executed in ${end2[0] + end2[1]/1000000000} seconds`);


