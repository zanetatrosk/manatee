//function that add + or - to the number
export function addPlusOrMinus(number: number): string {
  return number >= 0 ? `+${number}` : `${number}`;
}
