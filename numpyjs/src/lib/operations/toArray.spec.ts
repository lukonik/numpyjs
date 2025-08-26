import { describe, it, expect } from 'vitest';
import { toArray } from './toArray.js';
import { full } from './full.js';
import { zeros } from './zeros.js';
import { ones } from './ones.js';
import { empty } from './empty.js';
import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';

describe('toArray', () => {
  describe('1D arrays', () => {
    it('should convert 1D array to JavaScript array', () => {
      const arr = full([4], 42, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([42, 42, 42, 42]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should convert 1D array with different values', () => {
      const arr = new Ndarray([3], DTypes.Int32Array);
      arr.set(1, 0);
      arr.set(2, 1);
      arr.set(3, 2);
      
      const result = toArray(arr);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should convert single element array', () => {
      const arr = full([1], 99, DTypes.Float32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([99]);
    });

    it('should convert empty 1D array', () => {
      const arr = new Ndarray([0], DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([]);
    });
  });

  describe('2D arrays', () => {
    it('should convert 2D array to nested JavaScript array', () => {
      const arr = new Ndarray([2, 3], DTypes.Float64Array);
      arr.set(1, 0, 0); arr.set(2, 0, 1); arr.set(3, 0, 2);
      arr.set(4, 1, 0); arr.set(5, 1, 1); arr.set(6, 1, 2);
      
      const result = toArray(arr);
      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6]
      ]);
    });

    it('should convert 2D array filled with same value', () => {
      const arr = full([3, 2], 7.5, DTypes.Float32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [7.5, 7.5],
        [7.5, 7.5],
        [7.5, 7.5]
      ]);
    });

    it('should convert 2D array with zeros', () => {
      const arr = zeros([2, 2], DTypes.Int16Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [0, 0],
        [0, 0]
      ]);
    });

    it('should convert 2D array with ones', () => {
      const arr = ones([2, 4], DTypes.Uint8Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]);
    });

    it('should handle 2D array with zero dimension', () => {
      const arr = new Ndarray([2, 0], DTypes.Float32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([[], []]);
    });

    it('should handle 2D array with one zero dimension', () => {
      const arr = new Ndarray([0, 3], DTypes.Float32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([]);
    });
  });

  describe('3D arrays', () => {
    it('should convert 3D array to nested JavaScript array', () => {
      const arr = new Ndarray([2, 2, 2], DTypes.Int32Array);
      let value = 1;
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            arr.set(value++, i, j, k);
          }
        }
      }
      
      const result = toArray(arr);
      expect(result).toEqual([
        [
          [1, 2],
          [3, 4]
        ],
        [
          [5, 6],
          [7, 8]
        ]
      ]);
    });

    it('should convert 3D array filled with same value', () => {
      const arr = full([2, 1, 3], -5, DTypes.Int8Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [[-5, -5, -5]],
        [[-5, -5, -5]]
      ]);
    });
  });

  describe('higher dimensional arrays', () => {
    it('should convert 4D array', () => {
      const arr = full([2, 1, 2, 1], 123, DTypes.Uint32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [
          [
            [123],
            [123]
          ]
        ],
        [
          [
            [123],
            [123]
          ]
        ]
      ]);
    });

    it('should convert 5D array', () => {
      const arr = ones([1, 2, 1, 1, 2], DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [
          [
            [
              [1, 1]
            ]
          ],
          [
            [
              [1, 1]
            ]
          ]
        ]
      ]);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = full([2, 2], 127, DTypes.Int8Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [127, 127],
        [127, 127]
      ]);
    });

    it('should work with Uint8Array', () => {
      const arr = full([2, 2], 255, DTypes.Uint8Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [255, 255],
        [255, 255]
      ]);
    });

    it('should work with Float32Array', () => {
      const arr = full([2, 2], 3.14159, DTypes.Float32Array);
      const result = toArray(arr);
      
      // Use toBeCloseTo for floating point values
      expect(result[0][0]).toBeCloseTo(3.14159, 5);
      expect(result[1][1]).toBeCloseTo(3.14159, 5);
    });

    it('should work with Float64Array', () => {
      const arr = full([2, 2], 2.718281828, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result[0][0]).toBeCloseTo(2.718281828, 9);
      expect(result[1][1]).toBeCloseTo(2.718281828, 9);
    });
  });

  describe('special values', () => {
    it('should handle arrays with negative values', () => {
      const arr = full([2, 2], -15.7, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [-15.7, -15.7],
        [-15.7, -15.7]
      ]);
    });

    it('should handle arrays with zero values', () => {
      const arr = full([3, 2], 0, DTypes.Int32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [0, 0],
        [0, 0],
        [0, 0]
      ]);
    });

    it('should handle arrays with fractional values', () => {
      const arr = full([2, 2], 0.123456789, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result[0][0]).toBeCloseTo(0.123456789, 9);
      expect(result[1][1]).toBeCloseTo(0.123456789, 9);
    });

    it('should handle Infinity values', () => {
      const arr = full([2, 1], Infinity, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [Infinity],
        [Infinity]
      ]);
    });

    it('should handle -Infinity values', () => {
      const arr = full([1, 2], -Infinity, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([
        [-Infinity, -Infinity]
      ]);
    });

    it('should handle NaN values', () => {
      const arr = full([2, 2], NaN, DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result[0][0]).toBeNaN();
      expect(result[0][1]).toBeNaN();
      expect(result[1][0]).toBeNaN();
      expect(result[1][1]).toBeNaN();
    });
  });

  describe('edge cases', () => {
    it('should handle completely empty array', () => {
      const arr = new Ndarray([0], DTypes.Float64Array);
      const result = toArray(arr);
      
      expect(result).toEqual([]);
    });

    it('should handle arrays with all zero dimensions', () => {
      const arr = new Ndarray([0, 0], DTypes.Float32Array);
      const result = toArray(arr);
      
      expect(result).toEqual([]);
    });

    it('should handle large arrays efficiently', () => {
      const arr = ones([10, 10], DTypes.Uint8Array);
      const result = toArray(arr);
      
      expect(result).toHaveLength(10);
      expect(result[0]).toHaveLength(10);
      expect(result[0][0]).toBe(1);
      expect(result[9][9]).toBe(1);
    });

    it('should create independent nested arrays', () => {
      const arr = full([2, 2], 42, DTypes.Float32Array);
      const result = toArray(arr);
      
      // Modify the result
      result[0][0] = 999;
      
      // Original array should be unchanged
      expect(arr.at(0, 0)).toBe(42);
      
      // Other elements in result should be unchanged
      expect(result[0][1]).toBe(42);
      expect(result[1][0]).toBe(42);
      expect(result[1][1]).toBe(42);
    });

    it('should work with arrays created using empty()', () => {
      const arr = empty([2, 2], DTypes.Float64Array);
      arr.set(1.5, 0, 0);
      arr.set(2.5, 0, 1);
      arr.set(3.5, 1, 0);
      arr.set(4.5, 1, 1);
      
      const result = toArray(arr);
      
      expect(result).toEqual([
        [1.5, 2.5],
        [3.5, 4.5]
      ]);
    });
  });

  describe('comparison with original data', () => {
    it('should preserve exact values for integer types', () => {
      const arr = new Ndarray([3, 3], DTypes.Int32Array);
      let value = -100;
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          arr.set(value, i, j);
          value += 25;
        }
      }
      
      const result = toArray(arr);
      
      expect(result[0][0]).toBe(-100);
      expect(result[0][1]).toBe(-75);
      expect(result[0][2]).toBe(-50);
      expect(result[1][0]).toBe(-25);
      expect(result[1][1]).toBe(0);
      expect(result[1][2]).toBe(25);
      expect(result[2][0]).toBe(50);
      expect(result[2][1]).toBe(75);
      expect(result[2][2]).toBe(100);
    });

    it('should handle mixed positive and negative values', () => {
      const arr = new Ndarray([2, 3], DTypes.Float64Array);
      
      arr.set(-1.1, 0, 0); arr.set(0, 0, 1); arr.set(1.1, 0, 2);
      arr.set(-2.2, 1, 0); arr.set(2.2, 1, 1); arr.set(-3.3, 1, 2);
      
      const result = toArray(arr);
      
      expect(result).toEqual([
        [-1.1, 0, 1.1],
        [-2.2, 2.2, -3.3]
      ]);
    });
  });
});