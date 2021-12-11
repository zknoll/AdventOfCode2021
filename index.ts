
import { Day10 } from "./days/day10";
import { Day11 } from "./days/day11";

let day = new Day11("./inputs/input11.txt");
let start1 = process.hrtime()
console.log(day.part1());
let end1 = process.hrtime(start1);
console.log(`${end1[0] + end1[1]/1000000000} seconds`);
let start2 = process.hrtime()
console.log(day.part2());
let end2 = process.hrtime(start2);
console.log(`${end2[0] + end2[1]/1000000000} seconds`);