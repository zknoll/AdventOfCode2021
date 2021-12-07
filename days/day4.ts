import { Day } from "../day"
import * as fs from "fs"

export class Day4 extends Day {

  numberOrder: number[] = []
  boards: Array<BingoBoard> = []  
  parseInput() {
    // read first line
    let fileString = this.inputRaw;
    let fileDoubleBreaks = fileString.split("\n\n").map(value => value.trim())
    this.numberOrder = fileDoubleBreaks.shift()?.split(",").map(value => +value) || [];
    let boardStrings = fileDoubleBreaks;
    this.boards = boardStrings.map(boardString => boardString.split("\n").map(row => row.trim().split(/\s+/i).map(value => +value))).map(board => new BingoBoard(board));
  }


  override part1 = () => {
    this.parseInput()
    let winningBoard: BingoBoard | null = null;
    let winningNumber: number | null = null;
    for (let number of this.numberOrder) {
      for (let board of this.boards) {
        board.entries.filter(entry => (entry.value === number)).forEach( entry => entry.set())
        if (board.checkWins()) {
          winningBoard = board;
          winningNumber = number;
          break;
        }
      }
      if (winningBoard) break;
    }
    let score = (winningBoard!.entries.filter(entry => (!entry.state)).map(entry => entry.value).reduce((acc, b) => acc + b)) * winningNumber!;
    //console.log(winningBoard);
    console.log(score);
    console.log(winningBoard?.raw);
    console.log(winningNumber);

  }

  override part2 = () => {
    this.parseInput()
    let winningBoard: BingoBoard | null = null;
    let winningNumber: number | null = null;
    for (let number of this.numberOrder) {
      for (let j = this.boards.length - 1; j >= 0; j--) {
        this.boards[j].entries.filter(entry => (entry.value === number)).forEach( entry => entry.set())
        if (this.boards[j].checkWins()) {
          winningBoard = this.boards[j];
          winningNumber = number;
          this.boards.splice(j,1);
        }
      }
    }
    let score = (winningBoard!.entries.filter(entry => (!entry.state)).map(entry => entry.value).reduce((acc, b) => acc + b)) * winningNumber!;
    //console.log(winningBoard);
    console.log(score);
    console.log(winningBoard?.raw);
    console.log(winningNumber);
  }
}

class BingoBoard {
  raw: Array<Array<number>>;
  entries: Array<BingoEntry>
  constructor(entries: Array<Array<number>>) {
    this.entries = [];
    this.raw = entries;
    entries.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        this.entries.push(new BingoEntry(value, rowIndex, colIndex))
      })
    })
  }

  checkWins = () => (this.checkRowWins() || this.checkColWins())

  checkRowWins(): boolean {
    for (let row of [0,1,2,3,4]) {
      if (this.entries
        .filter(entry => (entry.location.row === row))
        .map(entry => entry.state)
        .reduce((acc, b) => acc && b)
      ) {
        console.log(`FOUND WINNER: ROW ${row}`)
        return true;
      };
    }
    return false;
  }

  checkColWins(): boolean {
    for (let col of [0,1,2,3,4]) {
      if (this.entries
        .filter(entry => (entry.location.col === col))
        .map(entry => entry.state)
        .reduce((acc, b) => acc && b)
      ) {
        console.log(`FOUND WINNER: COL ${col}`)
        return true;
      };
    }
    return false;
  }

  checkDiagWins(): boolean {
    // check primary diagonal
    if (this.entries
      .filter(entry => (entry.location.col === entry.location.row))
      .map(entry => entry.state)
      .reduce((acc, b) => acc && b)) {
        console.log(`FOUND DIAG WINNER ON PRIMARY`)
        return true;
      };

    // check secondary diagonal
    if (this.entries
      .filter(entry => (entry.location.col + entry.location.row === 4))
      .map(entry => entry.state)
      .reduce((acc, b) => acc && b)) {
        console.log(`FOUND DIAG WINNER ON SECONDARY`)
        return true;
      };

    return false;
  }
}

class BingoEntry {
  value: number;
  state: boolean;
  location: BingoCoord;

  constructor(value: number, row: number, col: number) {
    this.value = value;
    this.state = false;
    this.location = new BingoCoord(row, col);
  }
  set = () => { this.state = true }
}

class BingoCoord {
  row: number;
  col: number;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}