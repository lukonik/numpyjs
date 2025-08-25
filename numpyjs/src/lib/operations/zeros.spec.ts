import { describe, it, expect } from 'vitest';
import { zeros } from './zeros.js';
import { DTypes } from '../core/dtypes.js';

describe('zeros', () => {
  describe('basic functionality', () => {
    it('should create 1D array filled with zeros using default dtype', () => {
      const arr = zeros([5]);
      
      expect(arr.shape).toEqual([5]);
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.size).toBe(5);
      expect(arr.ndim).toBe(1);
      
      // Check all values are 0
      for (let i = 0; i < 5; i++) {
        expect(arr.at(i)).toBe(0);
      }
    });

    it('should create 2D array filled with zeros', () => {
      const arr = zeros([2, 3], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(2);
      
      // Check all values are 0
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(0);
        }
      }
    });

    it('should create 3D array filled with zeros', () => {
      const arr = zeros([2, 2, 2], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 2, 2]);
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.size).toBe(8);
      expect(arr.ndim).toBe(3);
      
      // Check all values are 0
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            expect(arr.at(i, j, k)).toBe(0);
          }
        }
      }
    });

    it('should create single element array', () => {
      const arr = zeros([1], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([1]);
      expect(arr.size).toBe(1);
      expect(arr.at(0)).toBe(0);
    });

    it('should create higher dimensional arrays', () => {
      const arr = zeros([2, 1, 3, 1], DTypes.Float64Array);
      
      expect(arr.shape).toEqual([2, 1, 3, 1]);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(4);
      
      // Check a few values
      expect(arr.at(0, 0, 0, 0)).toBe(0);
      expect(arr.at(1, 0, 2, 0)).toBe(0);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = zeros([3], DTypes.Int8Array);
      
      expect(arr.dtype).toBe(DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
      expect(arr.at(0)).toBe(0);
      expect(arr.at(1)).toBe(0);
      expect(arr.at(2)).toBe(0);
    });

    it('should work with Uint8Array', () => {
      const arr = zeros([3], DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Uint8ClampedArray', () => {
      const arr = zeros([3], DTypes.Uint8ClampedArray);
      
      expect(arr.dtype).toBe(DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Int16Array', () => {
      const arr = zeros([3], DTypes.Int16Array);
      
      expect(arr.dtype).toBe(DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Uint16Array', () => {
      const arr = zeros([3], DTypes.Uint16Array);
      
      expect(arr.dtype).toBe(DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Int32Array', () => {
      const arr = zeros([3], DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Uint32Array', () => {
      const arr = zeros([3], DTypes.Uint32Array);
      
      expect(arr.dtype).toBe(DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Float32Array', () => {
      const arr = zeros([3], DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(arr.at(0)).toBe(0);
    });

    it('should work with Float64Array', () => {
      const arr = zeros([3], DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      expect(arr.at(0)).toBe(0);
    });


    it('should throw error for Float16Array', () => {
      expect(() => {
        zeros([3], DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        zeros([3], 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('edge cases', () => {
    it('should handle zero-sized dimensions', () => {
      const arr = zeros([0], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([0]);
      expect(arr.size).toBe(0);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(0);
    });

    it('should handle arrays with one zero dimension', () => {
      const arr = zeros([2, 0, 3], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 0, 3]);
      expect(arr.size).toBe(0);
    });

    it('should handle large arrays efficiently', () => {
      const arr = zeros([100, 100], DTypes.Uint8Array);
      
      expect(arr.size).toBe(10000);
      
      // Spot check some values
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(50, 50)).toBe(0);
      expect(arr.at(99, 99)).toBe(0);
    });

    it('should create new instances on each call', () => {
      const arr1 = zeros([2, 2], DTypes.Float32Array);
      const arr2 = zeros([2, 2], DTypes.Float32Array);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(42, 0, 0);
      
      // Other array should be unaffected
      expect(arr2.at(0, 0)).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-array shape', () => {
      expect(() => {
        zeros(5 as any);
      }).toThrow('Shape must be an array of numbers');
    });

    it('should throw error for empty shape', () => {
      expect(() => {
        zeros([]);
      }).toThrow('Shape cannot be empty');
    });

    it('should throw error for negative dimensions', () => {
      expect(() => {
        zeros([-1, 2]);
      }).toThrow('Shape values must be non-negative integers, got -1 at index 0');
      
      expect(() => {
        zeros([2, -3]);
      }).toThrow('Shape values must be non-negative integers, got -3 at index 1');
    });

    it('should throw error for non-integer dimensions', () => {
      expect(() => {
        zeros([2.5, 3]);
      }).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
      
      expect(() => {
        zeros([2, 3.14]);
      }).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
    });

    it('should throw error for NaN dimensions', () => {
      expect(() => {
        zeros([NaN, 3]);
      }).toThrow('Shape values must be non-negative integers, got NaN at index 0');
    });

    it('should throw error for Infinity dimensions', () => {
      expect(() => {
        zeros([Infinity, 3]);
      }).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
    });
  });

  describe('performance and memory', () => {
    it('should efficiently fill large arrays', () => {
      const start = performance.now();
      const arr = zeros([1000, 1000], DTypes.Float32Array);
      const end = performance.now();
      
      expect(arr.size).toBe(1000000);
      expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
      
      // Verify some values
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(999, 999)).toBe(0);
    });

    it('should use appropriate buffer sizes', () => {
      const arr8 = zeros([100], DTypes.Uint8Array);
      const arr32 = zeros([100], DTypes.Float32Array);
      const arr64 = zeros([100], DTypes.Float64Array);
      
      expect((arr8.buffer as Uint8Array).byteLength).toBe(100);
      expect((arr32.buffer as Float32Array).byteLength).toBe(400); // 4 bytes per float32
      expect((arr64.buffer as Float64Array).byteLength).toBe(800); // 8 bytes per float64
    });
  });

  describe('comparison with ones function', () => {
    it('should create arrays with different values than ones', () => {
      const zerosArr = zeros([2, 3], DTypes.Float32Array);
      
      // All values should be 0
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(zerosArr.at(i, j)).toBe(0);
        }
      }
    });

    it('should have same shape and properties as equivalent ones array', () => {
      const zerosArr = zeros([3, 4, 2], DTypes.Int32Array);
      
      expect(zerosArr.shape).toEqual([3, 4, 2]);
      expect(zerosArr.dtype).toBe(DTypes.Int32Array);
      expect(zerosArr.size).toBe(24);
      expect(zerosArr.ndim).toBe(3);
      expect(zerosArr.strides).toEqual([8, 2, 1]);
    });
  });
});