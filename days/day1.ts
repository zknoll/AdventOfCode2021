import input from "../inputs/input1.json"
import { Day } from "../day";

export class Day1 extends Day {
  override part1 = () => input.value.reduce((acc, value, index) => { return value > input.value[index-1] ? acc + 1 : acc}, 0) 

  override part2 = () => input.value.reduce((acc, _, index) => { return (input.value[index+3] + input.value[index+1] + input.value[index+2]) > (input.value[index] + input.value[index+1] + input.value[index+2]) ? acc + 1 : acc}, 0);
}