export function reverse(obj: any): any {
  const output: any = {};
  Object.keys(obj).forEach((key) => {
    output[obj[key]] = key;
  });
  return output; 
}