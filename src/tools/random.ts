export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomIntInRange(min, max) {
  if (min >= max) {
    throw new Error("Min should me smaller then max");
  }

  return Math.floor(Math.random() * (max - min) + min);
}
