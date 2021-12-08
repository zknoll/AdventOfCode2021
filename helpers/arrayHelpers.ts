export function median(array: number[], useDecimalForEvenLenghtArrays = false): number {
  const mutableArray = array.map((a) => a);
  mutableArray.sort((a, b) => a - b);
  console.log(mutableArray.length);
  console.log(Math.floor(mutableArray.length / 2))
  if(mutableArray.length % 2 === 0) {
    return (mutableArray[mutableArray.length / 2 - 1] + mutableArray[mutableArray.length / 2]) / 2
  } else {
    return mutableArray[Math.floor(mutableArray.length / 2)]
  }
}