import { Day } from "../day";

type GammaAndEpsilon = {
  gamma: number,
  epsilon: number
}

export class Day3 extends Day {


  override part1 = () => {
    const { gamma, epsilon } = this.findGammaAndEpsilon(this.inputLines);
    console.log(`gamma = ${gamma}`)
    console.log(`epsilon = ${epsilon}`)
    return gamma * epsilon
  }

  findGammaAndEpsilon(input: Array<string>): GammaAndEpsilon {
    let positionCounts: Array<number> = new Array(input[0].length).fill(0);
    let mostCommonDigits = ""

    input.forEach((value) => {
      for (let i = 0; i < value.length; i++) {
        positionCounts[i] += +value[i];
      }
    });
    for (let i = 0; i < positionCounts.length; i++) {
      //console.log(positionCounts);
      (positionCounts[i] >= input.length / 2) ? mostCommonDigits +="1" : mostCommonDigits += "0";
    }
    //console.log(mostCommonDigits);

    
    const gamma = +("0b"+mostCommonDigits);
    const epsilon = ~gamma & +("0b"+ new Array(input[0].length).fill("1").join(''));//0b11111//0b111111111111
    return {
      gamma,
      epsilon
    }
    
  }

  override part2 = () => {
    let oGenRating: Array<string> = this.inputLines;
    let co2ScrubRating: Array<string> = this.inputLines;
    for (let i = 0; i < this.inputLines[0].length; i++) {
      const { gamma } = this.findGammaAndEpsilon(oGenRating);
      const gammaString = gamma.toString(2).padStart(this.inputLines[0].length, "0");
      oGenRating = oGenRating.filter((value) => (value[i] === gammaString[i]));
      if (oGenRating.length === 1) {
        console.log(`found oxygen generator rating! ${oGenRating[0]}`)
        break;
      }
      //console.log(oGenRating)
    }
    for (let i = 0; i < this.inputLines[0].length; i++) {
      const { epsilon } = this.findGammaAndEpsilon(co2ScrubRating);
      //console.log(epsilon.toString(2));
      const epsilonString = epsilon.toString(2).padStart(this.inputLines[0].length, "0");
      co2ScrubRating = co2ScrubRating.filter((value) => (value[i] === epsilonString[i]));
      if (co2ScrubRating.length === 1) {
        console.log(`found CO2 Scrubber rating! ${co2ScrubRating[0]}`)
        break;
      } 
      //console.log(co2ScrubRating)
    }
    let oRating = +("0b"+oGenRating[0]);
    let co2Rating = +("0b"+co2ScrubRating[0]);

    return oRating * co2Rating;
  }
}