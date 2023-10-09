export function getRandom(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal) + 1);
}
