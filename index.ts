
import { Day8 } from "./days/day8";

let day = new Day8("./inputs/input8.txt");
let start1 = process.hrtime()
console.log(day.part1());
let end1 = process.hrtime(start1);
console.log(`${end1[0] + end1[1]/1000000000} seconds`);
let start2 = process.hrtime()
console.log(day.part2());
let end2 = process.hrtime(start1);
console.log(`${end2[0] + end2[1]/1000000000} seconds`);