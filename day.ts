import * as fs from 'fs';
export abstract class Day {
  inputLines: Array<string>
  inputRaw: string
  constructor(filepath: string) {
    this.inputLines = this.readInput(filepath);
    this.inputRaw = fs.readFileSync(filepath).toString('utf-8');
  }

  abstract part1: () => any
  abstract part2: () => any

  readInput(filepath: string): Array<string> {
    let inputBuffer = fs.readFileSync(filepath).toString('utf-8');
    return inputBuffer.split("\n").map((value) => (value.trim()))
  }
}