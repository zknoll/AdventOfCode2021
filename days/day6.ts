import { Day } from "../day";

function mod (a: number, b: number): number {
  return ((a % b) + b) % b;
};

export class Day6 extends Day {
  override part1 = () => {
    const ages = this.inputLines[0].split(",").map(num => +num);
    const fish: Array<Lanternfish> = ages.map((age) => new Lanternfish(age))
    for (let i = 0; i < 80; i++) {
      //console.log(i);
      if (i%7 === 0) {
        console.log(`population = ${fish.length}`)
      }
      const newFish: Array<Lanternfish> = [];
      fish.forEach((f) => {
        let offspring = f.age();
        if (offspring) {
          newFish.push(offspring);
        }
      })
      //fish.push(...newFish)
      newFish.forEach((nf) => fish.push(nf));
    }
    console.log(`There were ${fish.length} fish after 80 days`)
  }

  override part2 = () => {
    const ages = this.inputLines[0].split(",").map(num => +num);
    const fish: Array<Lanternfish> = ages.map((age) => new Lanternfish(age))
    let fishAges = [
      fish.filter((f) => f.rn === 0).length,
      fish.filter((f) => f.rn === 1).length,
      fish.filter((f) => f.rn === 2).length,
      fish.filter((f) => f.rn === 3).length,
      fish.filter((f) => f.rn === 4).length,
      fish.filter((f) => f.rn === 5).length,
      fish.filter((f) => f.rn === 6).length,
      0,
      0
    ];

    let i = 0;
    while (i < 252) {
      //age 7, everyone gets an offspring who has rn < 7.  Sum all the lengths and add that to fishAges[8]
      //also anyone who had rn = 8 now has rn = 1 so store that before we age, then add at the end.
      // we shouldn't have any new zeroes

      // this should be easy to do like this but I don't want to think anymore
      //const newFish = new Array(8).map((_, index) => fishAges[mod(index-2, 9)])
      const newFish = [
        fishAges[7], // anything that was age 7 will become age 0
        fishAges[8], // anything that was age 8 will become age 1
        fishAges[0], // new twos
        fishAges[1],
        fishAges[2],
        fishAges[3],
        fishAges[4],
        fishAges[5], // anything age 5 will produce offspring on the second to last day and therfore those offspring will be age 7
        fishAges[6]  // anything age 6 will produce offspring on the last day and therefore those offspring will be age 8
      ];

      fishAges = fishAges.map((count, index) =>  {if (index < 7) { return count + newFish[index]} else { return newFish[index] }});
      console.log(fishAges);
      console.log(fishAges.reduce((acc,b) => acc + b))
      i += 7;
    }
    // one final aging...
    console.log(fishAges);
    fishAges[8] += fishAges.filter((_, i) => i < 4).reduce((acc, b) => acc + b);
    console.log(fishAges);

    console.log(`There were ${fishAges.reduce((acc, b) => acc + b)} fish after 256 days`)
  }
}

class Lanternfish {
  rn: number;
  private baseRate: number;
  constructor(rn: number = 8, baseRate: number = 7) {
    this.rn = rn;
    this.baseRate = baseRate
  }

  age(): Lanternfish | null {
    this.rn = this.rn - 1;
    if (this.rn < 0) {
      return this.reproduce();
    }
    return null;
  }

  reproduce(): Lanternfish {
    this.rn = this.baseRate - 1;
    return new Lanternfish();
  }
}