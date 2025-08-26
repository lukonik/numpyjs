import { describe, it, expect } from 'vitest';
import { full } from './full.js';
import { DTypes } from '../core/dtypes.js';

describe('full', () => {
  describe('basic functionality', () => {
    it('should create 1D array filled with specified value using default dtype', () => {
      const arr = full([5], 42);
      
      expect(arr.shape).toEqual([5]);
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.size).toBe(5);
      expect(arr.ndim).toBe(1);
      
      // Check all values are the fill value
      for (let i = 0; i < 5; i++) {
        expect(arr.at(i)).toBe(42);
      }
    });

    it('should create 2D array filled with specified value', () => {
      const arr = full([2, 3], 7.5, DTypes.Float32Array);
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(2);
      
      // Check all values are the fill value
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(7.5);
        }
      }
    });

    it('should create 3D array filled with specified value', () => {
      const arr = full([2, 2, 2], -3, DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 2, 2]);
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.size).toBe(8);
      expect(arr.ndim).toBe(3);
      
      // Check all values are the fill value
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            expect(arr.at(i, j, k)).toBe(-3);
          }
        }
      }
    });

    it('should create single element array', () => {
      const arr = full([1], 99, DTypes.Float32Array);
      
      expect(arr.shape).toEqual([1]);
      expect(arr.size).toBe(1);
      expect(arr.at(0)).toBe(99);
    });

    it('should create higher dimensional arrays', () => {
      const arr = full([2, 1, 3, 1], 123, DTypes.Float64Array);
      
      expect(arr.shape).toEqual([2, 1, 3, 1]);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(4);
      
      // Check a few values
      expect(arr.at(0, 0, 0, 0)).toBe(123);
      expect(arr.at(1, 0, 2, 0)).toBe(123);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = full([3], 127, DTypes.Int8Array);
      
      expect(arr.dtype).toBe(DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
      expect(arr.at(0)).toBe(127);
      expect(arr.at(1)).toBe(127);
      expect(arr.at(2)).toBe(127);
    });

    it('should work with Uint8Array', () => {
      const arr = full([3], 255, DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect(arr.at(0)).toBe(255);
    });

    it('should work with Uint8ClampedArray', () => {
      const arr = full([3], 128, DTypes.Uint8ClampedArray);
      
      expect(arr.dtype).toBe(DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
      expect(arr.at(0)).toBe(128);
    });

    it('should work with Int16Array', () => {
      const arr = full([3], -1000, DTypes.Int16Array);
      
      expect(arr.dtype).toBe(DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
      expect(arr.at(0)).toBe(-1000);
    });

    it('should work with Uint16Array', () => {
      const arr = full([3], 50000, DTypes.Uint16Array);
      
      expect(arr.dtype).toBe(DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
      expect(arr.at(0)).toBe(50000);
    });

    it('should work with Int32Array', () => {
      const arr = full([3], -2000000, DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect(arr.at(0)).toBe(-2000000);
    });

    it('should work with Uint32Array', () => {
      const arr = full([3], 4000000000, DTypes.Uint32Array);
      
      expect(arr.dtype).toBe(DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
      expect(arr.at(0)).toBe(4000000000);
    });

    it('should work with Float32Array', () => {
      const arr = full([3], 3.14159, DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(arr.at(0)).toBeCloseTo(3.14159, 5);
    });

    it('should work with Float64Array', () => {
      const arr = full([3], 2.718281828, DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      expect(arr.at(0)).toBeCloseTo(2.718281828, 9);
    });

    it('should throw error for Float16Array', () => {
      expect(() => {
        full([3], 1.5, DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        full([3], 42, 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('fill values', () => {
    it('should handle positive values', () => {
      const arr = full([2, 2], 42.5, DTypes.Float32Array);
      
      expect(arr.at(0, 0)).toBe(42.5);
      expect(arr.at(1, 1)).toBe(42.5);
    });

    it('should handle negative values', () => {
      const arr = full([2, 2], -15.7, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBe(-15.7);
      expect(arr.at(1, 1)).toBe(-15.7);
    });

    it('should handle zero', () => {
      const arr = full([3, 3], 0, DTypes.Int32Array);
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(0);
        }
      }
    });

    it('should handle fractional values', () => {
      const arr = full([2, 2], 0.123456789, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBeCloseTo(0.123456789, 9);
      expect(arr.at(1, 1)).toBeCloseTo(0.123456789, 9);
    });

    it('should handle large values', () => {
      const arr = full([2, 2], 1e10, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBe(1e10);
      expect(arr.at(1, 1)).toBe(1e10);
    });

    it('should handle very small values', () => {
      const arr = full([2, 2], 1e-10, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBe(1e-10);
      expect(arr.at(1, 1)).toBe(1e-10);
    });
  });

  describe('edge cases', () => {
    it('should handle zero-sized dimensions', () => {
      const arr = full([0], 42, DTypes.Float32Array);
      
      expect(arr.shape).toEqual([0]);
      expect(arr.size).toBe(0);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(0);
    });

    it('should handle arrays with one zero dimension', () => {
      const arr = full([2, 0, 3], 99, DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 0, 3]);
      expect(arr.size).toBe(0);
    });

    it('should handle large arrays efficiently', () => {
      const arr = full([100, 100], 77, DTypes.Uint8Array);
      
      expect(arr.size).toBe(10000);
      
      // Spot check some values
      expect(arr.at(0, 0)).toBe(77);
      expect(arr.at(50, 50)).toBe(77);
      expect(arr.at(99, 99)).toBe(77);
    });

    it('should create new instances on each call', () => {
      const arr1 = full([2, 2], 42, DTypes.Float32Array);
      const arr2 = full([2, 2], 42, DTypes.Float32Array);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(999, 0, 0);
      
      // Other array should be unaffected
      expect(arr2.at(0, 0)).toBe(42);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-array shape', () => {
      expect(() => {
        full(5 as any, 42);
      }).toThrow('shape is not iterable');
    });

    it('should throw error for empty shape', () => {
      expect(() => {
        full([], 42);
      }).toThrow('Shape cannot be empty');
    });

    it('should throw error for negative dimensions', () => {
      expect(() => {
        full([-1, 2], 42);
      }).toThrow('Shape values must be non-negative integers, got -1 at index 0');
      
      expect(() => {
        full([2, -3], 42);
      }).toThrow('Shape values must be non-negative integers, got -3 at index 1');
    });

    it('should throw error for non-integer dimensions', () => {
      expect(() => {
        full([2.5, 3], 42);
      }).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
      
      expect(() => {
        full([2, 3.14], 42);
      }).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
    });

    it('should throw error for NaN dimensions', () => {
      expect(() => {
        full([NaN, 3], 42);
      }).toThrow('Shape values must be non-negative integers, got NaN at index 0');
    });

    it('should throw error for Infinity dimensions', () => {
      expect(() => {
        full([Infinity, 3], 42);
      }).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
    });
  });

  describe('performance and memory', () => {
    it('should efficiently fill large arrays', () => {
      const start = performance.now();
      const arr = full([1000, 1000], 3.14, DTypes.Float32Array);
      const end = performance.now();
      
      expect(arr.size).toBe(1000000);
      expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
      
      // Verify some values (use toBeCloseTo for Float32Array precision)
      expect(arr.at(0, 0)).toBeCloseTo(3.14, 5);
      expect(arr.at(999, 999)).toBeCloseTo(3.14, 5);
    });

    it('should use appropriate buffer sizes', () => {
      const arr8 = full([100], 255, DTypes.Uint8Array);
      const arr32 = full([100], 3.14, DTypes.Float32Array);
      const arr64 = full([100], 2.718, DTypes.Float64Array);
      
      expect((arr8.buffer as Uint8Array).byteLength).toBe(100);
      expect((arr32.buffer as Float32Array).byteLength).toBe(400); // 4 bytes per float32
      expect((arr64.buffer as Float64Array).byteLength).toBe(800); // 8 bytes per float64
    });
  });

  describe('comparison with other creation functions', () => {
    it('should create arrays with different values than zeros/ones', () => {
      const fullArr = full([2, 3], 42, DTypes.Float32Array);
      
      // All values should be 42
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          expect(fullArr.at(i, j)).toBe(42);
        }
      }
    });

    it('should have same shape and properties as equivalent zeros/ones arrays', () => {
      const fullArr = full([3, 4, 2], 123, DTypes.Int32Array);
      
      expect(fullArr.shape).toEqual([3, 4, 2]);
      expect(fullArr.dtype).toBe(DTypes.Int32Array);
      expect(fullArr.size).toBe(24);
      expect(fullArr.ndim).toBe(3);
      expect(fullArr.strides).toEqual([8, 2, 1]);
    });

    it('should be equivalent to ones when fill value is 1', () => {
      const fullArr = full([2, 2], 1, DTypes.Float32Array);
      
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          expect(fullArr.at(i, j)).toBe(1);
        }
      }
    });

    it('should be equivalent to zeros when fill value is 0', () => {
      const fullArr = full([2, 2], 0, DTypes.Float32Array);
      
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          expect(fullArr.at(i, j)).toBe(0);
        }
      }
    });
  });

  describe('special values', () => {
    it('should handle Infinity', () => {
      const arr = full([2, 2], Infinity, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBe(Infinity);
      expect(arr.at(1, 1)).toBe(Infinity);
    });

    it('should handle -Infinity', () => {
      const arr = full([2, 2], -Infinity, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBe(-Infinity);
      expect(arr.at(1, 1)).toBe(-Infinity);
    });

    it('should handle NaN', () => {
      const arr = full([2, 2], NaN, DTypes.Float64Array);
      
      expect(arr.at(0, 0)).toBeNaN();
      expect(arr.at(1, 1)).toBeNaN();
    });
  });
});