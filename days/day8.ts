import { reverse } from "../helpers/objectHelpers";
import { Day } from "../day";

type SegmentData = {
  patterns: string[],
  output: string[]
}

type DigitMap = {
  [pattern: string]: number
}
type SegmentMap = {
  [seg: string]: string | null
}
export class Day8 extends Day {
  override part1 = () => {
    const relevantDigits = this.inputLines
      .map((line) => line.split(" | ",)[1].split(" ").map((a) => a.trim())) // parse the input into a array of string arrays `string[][]`
      .map((output) => output.map((digit) => digit.length)) // count the segments lit
      .map((lscs) => lscs.filter((sc) => (sc === 2 || sc === 3 || sc === 4 || sc === 7))).flat() // filter those segments if they are 2,3,4,or 7 in length
    return {
      relevantDigits,
      answer: relevantDigits.length
    };
  }

  override part2 = () => {
    const segmentData = this.inputLines
      .map((line) => ({
        patterns: line.split(" | ")[0].split(" "),
        output: line.split(" | ")[1].split(" ")
      } as SegmentData));

    let sum = 0;
    for (const segmentDatum of segmentData) {
      const patterns = segmentDatum.patterns;
      const digitMap: DigitMap = {};
      const segmentMap: SegmentMap = {};

      // ROUND 0 -- Easy shit
      digitMap[patterns.find(value => (value.length === 2))!] = 1
      digitMap[patterns.find(value => (value.length === 4))!] = 4;
      digitMap[patterns.find(value => (value.length === 3))!] = 7;
      digitMap[patterns.find(value => (value.length === 7))!] = 8;
      let digitOne: string = reverse(digitMap)[1];
      let digitSeven: string = reverse(digitMap)[7];
      segmentMap.h = getMissingSegments(digitOne, digitSeven)[0]; // should be 1

      //ROUND 1
      digitMap[
        patterns
          .filter(value => value.length === 6)
          .filter(value => (getMissingSegments(digitOne, value).length === 1))[0]
      ] = 6
      let digitSix = reverse(digitMap)[6];
      segmentMap.j = getMissingSegments(digitOne, digitSix)[0]
      segmentMap.m = digitOne.replace(segmentMap.j, "");

      // ROUND 2
      const fiveSegmentPatterns = patterns.filter(value => (value.length === 5));
      digitMap[
        fiveSegmentPatterns.filter(value => (getMissingSegments(digitOne, value).length === 0))[0]
      ] = 3
      fiveSegmentPatterns.splice(fiveSegmentPatterns.indexOf(reverse(digitMap)[3]), 1)
      digitMap[
        fiveSegmentPatterns.filter(value => hasSegment(segmentMap.j!, value))[0]
      ] = 2;
      fiveSegmentPatterns.splice(fiveSegmentPatterns.indexOf(reverse(digitMap)[2]), 1)
      digitMap[
        fiveSegmentPatterns[0]
      ] = 5;
      segmentMap.l = getMissingSegments(reverse(digitMap)[2], reverse(digitMap)[5]).filter(value => (value != segmentMap.j))[0]
      segmentMap.i = getMissingSegments(reverse(digitMap)[5], reverse(digitMap)[2]).filter(value => (value != segmentMap.m))[0]

      // ROUND 3
          digitMap[
        patterns.filter(value => (value.length === 6 && value.search(segmentMap.l!) === -1))[0]
      ] = 9;
      digitMap[
        patterns.filter(value => Object.keys(digitMap).find(key => key === value) === undefined)[0]
      ] = 0;

      const sortedDigitMap: DigitMap = {};
      Object.keys(digitMap).forEach(key => {
        sortedDigitMap[key.split("").sort().join("")] = digitMap[key]
      });
      const result = +segmentDatum.output.map(digit => sortedDigitMap[digit.split("").sort().join("")]).join("")
      sum += result;
    }
    return sum;
  }
}

function hasSegment(segment: string, pattern: string) {
  if (segment.length > 1) {
    throw new Error('no');
  }
  return pattern.search(segment) !== -1
}

function getMissingSegments(pattern1: string, pattern2: string): string[] {
  const diff: string[] = [];
  for (let i = 0; i < pattern1.length; i++) {
    if (!hasSegment(pattern1[i], pattern2)) {
      diff.push(pattern1[i]);
    }
  }
  return diff;
}