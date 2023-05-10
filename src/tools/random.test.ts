import { describe } from "node:test";
import { randomIntInRange, randomItem } from "./random";

describe("random tools", () => {
  describe("randomItem never goes out the array limits", () => {
    test("wide array", () => {
      const arr = Array.from({ length: 100 }, () => 1);
      const checks = arr.length * 10;

      for (let i = 0; i < checks; i++) {
        expect(randomItem(arr)).toBeDefined();
      }
    });

    test("narrow array", () => {
      const arr = [1];
      const checks = arr.length * 100;

      for (let i = 0; i < checks; i++) {
        expect(randomItem(arr)).toBeDefined();
      }
    });

    test("empty array", () => {
      const arr = [];
      const checks = arr.length * 100;

      for (let i = 0; i < checks; i++) {
        expect(randomItem(arr)).toBe(undefined);
      }
    });
  });

  describe("randomIntInRange", () => {
    test("wide range", () => {
      const min = 75;
      const max = 100;
      const checks = (max - min) * 10;

      for (let i = 0; i < checks; i++) {
        const num = randomIntInRange(min, max);
        expect(num >= min && num < max).toBe(true);
      }
    });

    test("narrow range", () => {
      const min = 4;
      const max = 5;
      const checks = (max - min) * 100;

      for (let i = 0; i < checks; i++) {
        const num = randomIntInRange(min, max);
        expect(num).toBe(min);
      }
    });

    test("wrong params", () => {
      expect(randomIntInRange.bind(null, 5, 4)).toThrow();
    });
  });
});
