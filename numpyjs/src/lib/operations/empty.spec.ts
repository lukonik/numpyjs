/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { empty } from './empty.js';
import { DTypes } from '../core/dtypes.js';

describe('empty', () => {
  describe('basic functionality', () => {
    it('should create 1D array with default dtype', () => {
      const arr = empty([5]);
      
      expect(arr.shape).toEqual([5]);
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.size).toBe(5);
      expect(arr.ndim).toBe(1);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
    });

    it('should create 2D array', () => {
      const arr = empty([2, 3], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(2);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
    });

    it('should create 3D array', () => {
      const arr = empty([2, 2, 2], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 2, 2]);
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.size).toBe(8);
      expect(arr.ndim).toBe(3);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
    });

    it('should create single element array', () => {
      const arr = empty([1], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([1]);
      expect(arr.size).toBe(1);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
    });

    it('should create higher dimensional arrays', () => {
      const arr = empty([2, 1, 3, 1], DTypes.Float64Array);
      
      expect(arr.shape).toEqual([2, 1, 3, 1]);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(4);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = empty([3], DTypes.Int8Array);
      
      expect(arr.dtype).toBe(DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
      expect((arr.buffer as Int8Array).length).toBe(3);
    });

    it('should work with Uint8Array', () => {
      const arr = empty([3], DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect((arr.buffer as Uint8Array).length).toBe(3);
    });

    it('should work with Uint8ClampedArray', () => {
      const arr = empty([3], DTypes.Uint8ClampedArray);
      
      expect(arr.dtype).toBe(DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
      expect((arr.buffer as Uint8ClampedArray).length).toBe(3);
    });

    it('should work with Int16Array', () => {
      const arr = empty([3], DTypes.Int16Array);
      
      expect(arr.dtype).toBe(DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
      expect((arr.buffer as Int16Array).length).toBe(3);
    });

    it('should work with Uint16Array', () => {
      const arr = empty([3], DTypes.Uint16Array);
      
      expect(arr.dtype).toBe(DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
      expect((arr.buffer as Uint16Array).length).toBe(3);
    });

    it('should work with Int32Array', () => {
      const arr = empty([3], DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect((arr.buffer as Int32Array).length).toBe(3);
    });

    it('should work with Uint32Array', () => {
      const arr = empty([3], DTypes.Uint32Array);
      
      expect(arr.dtype).toBe(DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
      expect((arr.buffer as Uint32Array).length).toBe(3);
    });

    it('should work with Float32Array', () => {
      const arr = empty([3], DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(3);
    });

    it('should work with Float64Array', () => {
      const arr = empty([3], DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      expect((arr.buffer as Float64Array).length).toBe(3);
    });

    it('should throw error for Float16Array', () => {
      expect(() => {
        empty([3], DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        empty([3], 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('array properties and access', () => {
    it('should allow setting and getting values', () => {
      const arr = empty([2, 3], DTypes.Float32Array);
      
      // Set some values
      arr.set(1.5, 0, 0);
      arr.set(2.7, 0, 2);
      arr.set(-3.14, 1, 1);
      
      // Verify values
      expect(arr.at(0, 0)).toBeCloseTo(1.5);
      expect(arr.at(0, 2)).toBeCloseTo(2.7);
      expect(arr.at(1, 1)).toBeCloseTo(-3.14);
    });

    it('should have correct strides', () => {
      const arr = empty([3, 4], DTypes.Int32Array);
      
      expect(arr.strides).toEqual([4, 1]);
      
      // Verify striding works by setting values
      arr.set(10, 0, 0);
      arr.set(20, 0, 3);
      arr.set(30, 2, 1);
      
      expect(arr.at(0, 0)).toBe(10);
      expect(arr.at(0, 3)).toBe(20);
      expect(arr.at(2, 1)).toBe(30);
    });

    it('should have correct buffer size', () => {
      const arr8 = empty([10], DTypes.Uint8Array);
      const arr32 = empty([10], DTypes.Float32Array);
      const arr64 = empty([10], DTypes.Float64Array);
      
      expect((arr8.buffer as Uint8Array).byteLength).toBe(10); // 1 byte per element
      expect((arr32.buffer as Float32Array).byteLength).toBe(40); // 4 bytes per element
      expect((arr64.buffer as Float64Array).byteLength).toBe(80); // 8 bytes per element
    });
  });

  describe('edge cases', () => {
    it('should handle zero-sized dimensions', () => {
      const arr = empty([0], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([0]);
      expect(arr.size).toBe(0);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(0);
    });

    it('should handle arrays with one zero dimension', () => {
      const arr = empty([2, 0, 3], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 0, 3]);
      expect(arr.size).toBe(0);
      expect((arr.buffer as Int32Array).length).toBe(0);
    });

    it('should handle large arrays efficiently', () => {
      const arr = empty([1000, 1000], DTypes.Uint8Array);
      
      expect(arr.size).toBe(1000000);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect((arr.buffer as Uint8Array).length).toBe(1000000);
      
      // Verify we can set and get values at various positions
      arr.set(255, 0, 0);
      arr.set(128, 500, 500);
      arr.set(64, 999, 999);
      
      expect(arr.at(0, 0)).toBe(255);
      expect(arr.at(500, 500)).toBe(128);
      expect(arr.at(999, 999)).toBe(64);
    });

    it('should create new instances on each call', () => {
      const arr1 = empty([2, 2], DTypes.Float32Array);
      const arr2 = empty([2, 2], DTypes.Float32Array);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(42, 0, 0);
      
      // Other array should be unaffected (though values are uninitialized)
      arr2.set(99, 0, 0);
      expect(arr2.at(0, 0)).toBe(99);
      expect(arr1.at(0, 0)).toBe(42);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-array shape', () => {
      expect(() => {
        empty(5 as any);
      }).toThrow('Shape must be an array of numbers');
    });

    it('should throw error for empty shape', () => {
      expect(() => {
        empty([]);
      }).toThrow('Shape cannot be empty');
    });

    it('should throw error for negative dimensions', () => {
      expect(() => {
        empty([-1, 2]);
      }).toThrow('Shape values must be non-negative integers, got -1 at index 0');
      
      expect(() => {
        empty([2, -3]);
      }).toThrow('Shape values must be non-negative integers, got -3 at index 1');
    });

    it('should throw error for non-integer dimensions', () => {
      expect(() => {
        empty([2.5, 3]);
      }).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
      
      expect(() => {
        empty([2, 3.14]);
      }).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
    });

    it('should throw error for NaN dimensions', () => {
      expect(() => {
        empty([NaN, 3]);
      }).toThrow('Shape values must be non-negative integers, got NaN at index 0');
    });

    it('should throw error for Infinity dimensions', () => {
      expect(() => {
        empty([Infinity, 3]);
      }).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
    });
  });

  describe('performance', () => {
    it('should create large arrays quickly', () => {
      const start = performance.now();
      const arr = empty([2000, 2000], DTypes.Float32Array);
      const end = performance.now();
      
      expect(arr.size).toBe(4000000);
      expect(end - start).toBeLessThan(100); // Should be very fast since no initialization
      
      // Verify the array works
      arr.set(3.14, 1000, 1000);
      expect(arr.at(1000, 1000)).toBeCloseTo(3.14);
    });

    it('should be faster than initialized arrays (conceptually)', () => {
      // Note: In JavaScript, TypedArrays are always initialized to zero
      // This test exists to document the intended behavior
      const arr = empty([1000], DTypes.Float64Array);
      
      expect(arr.size).toBe(1000);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      
      // In true "empty" semantics, values would be uninitialized
      // But TypedArrays always initialize to zero, so we test that it works
      arr.set(42, 500);
      expect(arr.at(500)).toBe(42);
    });
  });

  describe('comparison with other creation functions', () => {
    it('should have same structure as zeros/ones but no guaranteed initialization', () => {
      const emptyArr = empty([3, 3], DTypes.Int32Array);
      
      expect(emptyArr.shape).toEqual([3, 3]);
      expect(emptyArr.dtype).toBe(DTypes.Int32Array);
      expect(emptyArr.size).toBe(9);
      expect(emptyArr.ndim).toBe(2);
      expect(emptyArr.strides).toEqual([3, 1]);
    });

    it('should be modifiable like other arrays', () => {
      const arr = empty([2, 2], DTypes.Float32Array);
      
      // Fill with specific pattern
      arr.set(1, 0, 0);
      arr.set(2, 0, 1);
      arr.set(3, 1, 0);
      arr.set(4, 1, 1);
      
      // Verify pattern
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(0, 1)).toBe(2);
      expect(arr.at(1, 0)).toBe(3);
      expect(arr.at(1, 1)).toBe(4);
    });
  });
});