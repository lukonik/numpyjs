/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { ones } from './ones.js';
import { DTypes } from '../core/dtypes.js';

describe('ones', () => {
  describe('basic functionality', () => {
    it('should create 1D array filled with ones using default dtype', () => {
      const arr = ones([5]);
      
      expect(arr.shape).toEqual([5]);
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.size).toBe(5);
      expect(arr.ndim).toBe(1);
      
      // Check all values are 1
      for (let i = 0; i < 5; i++) {
        expect(arr.at(i)).toBe(1);
      }
    });

    it('should create 2D array filled with ones', () => {
      const arr = ones([2, 3], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(2);
      
      // Check all values are 1
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(1);
        }
      }
    });

    it('should create 3D array filled with ones', () => {
      const arr = ones([2, 2, 2], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 2, 2]);
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.size).toBe(8);
      expect(arr.ndim).toBe(3);
      
      // Check all values are 1
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            expect(arr.at(i, j, k)).toBe(1);
          }
        }
      }
    });

    it('should create single element array', () => {
      const arr = ones([1], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([1]);
      expect(arr.size).toBe(1);
      expect(arr.at(0)).toBe(1);
    });

    it('should create higher dimensional arrays', () => {
      const arr = ones([2, 1, 3, 1], DTypes.Float64Array);
      
      expect(arr.shape).toEqual([2, 1, 3, 1]);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(4);
      
      // Check a few values
      expect(arr.at(0, 0, 0, 0)).toBe(1);
      expect(arr.at(1, 0, 2, 0)).toBe(1);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = ones([3], DTypes.Int8Array);
      
      expect(arr.dtype).toBe(DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
      expect(arr.at(0)).toBe(1);
      expect(arr.at(1)).toBe(1);
      expect(arr.at(2)).toBe(1);
    });

    it('should work with Uint8Array', () => {
      const arr = ones([3], DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Uint8ClampedArray', () => {
      const arr = ones([3], DTypes.Uint8ClampedArray);
      
      expect(arr.dtype).toBe(DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Int16Array', () => {
      const arr = ones([3], DTypes.Int16Array);
      
      expect(arr.dtype).toBe(DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Uint16Array', () => {
      const arr = ones([3], DTypes.Uint16Array);
      
      expect(arr.dtype).toBe(DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Int32Array', () => {
      const arr = ones([3], DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Uint32Array', () => {
      const arr = ones([3], DTypes.Uint32Array);
      
      expect(arr.dtype).toBe(DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Float32Array', () => {
      const arr = ones([3], DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(arr.at(0)).toBe(1);
    });

    it('should work with Float64Array', () => {
      const arr = ones([3], DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      expect(arr.at(0)).toBe(1);
    });


    it('should throw error for Float16Array', () => {
      expect(() => {
        ones([3], DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        ones([3], 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('edge cases', () => {
    it('should handle zero-sized dimensions', () => {
      const arr = ones([0], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([0]);
      expect(arr.size).toBe(0);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(0);
    });

    it('should handle arrays with one zero dimension', () => {
      const arr = ones([2, 0, 3], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 0, 3]);
      expect(arr.size).toBe(0);
    });

    it('should handle large arrays efficiently', () => {
      const arr = ones([100, 100], DTypes.Uint8Array);
      
      expect(arr.size).toBe(10000);
      
      // Spot check some values
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(50, 50)).toBe(1);
      expect(arr.at(99, 99)).toBe(1);
    });

    it('should create new instances on each call', () => {
      const arr1 = ones([2, 2], DTypes.Float32Array);
      const arr2 = ones([2, 2], DTypes.Float32Array);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(42, 0, 0);
      
      // Other array should be unaffected
      expect(arr2.at(0, 0)).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-array shape', () => {
      expect(() => {
        ones(5 as any);
      }).toThrow('Shape must be an array of numbers');
    });

    it('should throw error for empty shape', () => {
      expect(() => {
        ones([]);
      }).toThrow('Shape cannot be empty');
    });

    it('should throw error for negative dimensions', () => {
      expect(() => {
        ones([-1, 2]);
      }).toThrow('Shape values must be non-negative integers, got -1 at index 0');
      
      expect(() => {
        ones([2, -3]);
      }).toThrow('Shape values must be non-negative integers, got -3 at index 1');
    });

    it('should throw error for non-integer dimensions', () => {
      expect(() => {
        ones([2.5, 3]);
      }).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
      
      expect(() => {
        ones([2, 3.14]);
      }).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
    });

    it('should throw error for NaN dimensions', () => {
      expect(() => {
        ones([NaN, 3]);
      }).toThrow('Shape values must be non-negative integers, got NaN at index 0');
    });

    it('should throw error for Infinity dimensions', () => {
      expect(() => {
        ones([Infinity, 3]);
      }).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
    });
  });

  describe('performance and memory', () => {
    it('should efficiently fill large arrays', () => {
      const start = performance.now();
      const arr = ones([1000, 1000], DTypes.Float32Array);
      const end = performance.now();
      
      expect(arr.size).toBe(1000000);
      expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
      
      // Verify some values
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(999, 999)).toBe(1);
    });

    it('should use appropriate buffer sizes', () => {
      const arr8 = ones([100], DTypes.Uint8Array);
      const arr32 = ones([100], DTypes.Float32Array);
      const arr64 = ones([100], DTypes.Float64Array);
      
      expect((arr8.buffer as Uint8Array).byteLength).toBe(100);
      expect((arr32.buffer as Float32Array).byteLength).toBe(400); // 4 bytes per float32
      expect((arr64.buffer as Float64Array).byteLength).toBe(800); // 8 bytes per float64
    });
  });
});