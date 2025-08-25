import { describe, it, expect } from 'vitest';
import { astype } from './astype.js';
import { ones } from './ones.js';
import { zeros } from './zeros.js';
import { DTypes } from '../core/dtypes.js';
import { Ndarray } from '../core/ndarray.js';

describe('astype', () => {
  describe('basic functionality', () => {
    it('should cast float64 to int32', () => {
      const arr = ones([2, 2], DTypes.Float64Array);
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.dtype).toBe(DTypes.Int32Array);
      expect(result.shape).toEqual([2, 2]);
      expect(result.size).toBe(4);
      expect(result.at(0, 0)).toBe(1);
      expect(result.at(1, 1)).toBe(1);
    });

    it('should cast int32 to float32', () => {
      const arr = new Ndarray([3], DTypes.Int32Array);
      arr.set(42, 0);
      arr.set(-10, 1);
      arr.set(0, 2);
      
      const result = astype(arr, DTypes.Float32Array);
      
      expect(result.dtype).toBe(DTypes.Float32Array);
      expect(result.shape).toEqual([3]);
      expect(result.at(0)).toBe(42);
      expect(result.at(1)).toBe(-10);
      expect(result.at(2)).toBe(0);
    });

    it('should cast with fractional truncation', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(1.7, 0);
      arr.set(2.9, 1);
      arr.set(-3.2, 2);
      
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.dtype).toBe(DTypes.Int32Array);
      expect(result.at(0)).toBe(1);  // 1.7 -> 1
      expect(result.at(1)).toBe(2);  // 2.9 -> 2
      expect(result.at(2)).toBe(-3); // -3.2 -> -3
    });

    it('should preserve array shape and size', () => {
      const arr = ones([2, 3, 4], DTypes.Float64Array);
      const result = astype(arr, DTypes.Uint8Array);
      
      expect(result.shape).toEqual([2, 3, 4]);
      expect(result.size).toBe(24);
      expect(result.ndim).toBe(3);
      expect(result.dtype).toBe(DTypes.Uint8Array);
    });

    it('should create independent copy', () => {
      const arr = ones([2, 2], DTypes.Float32Array);
      const result = astype(arr, DTypes.Int16Array);
      
      expect(result).not.toBe(arr);
      expect(result.buffer).not.toBe(arr.buffer);
      
      // Modify original
      arr.set(99, 0, 0);
      
      // Result should be unaffected
      expect(result.at(0, 0)).toBe(1);
      expect(arr.at(0, 0)).toBe(99);
    });
  });

  describe('data type conversions', () => {
    it('should convert between integer types', () => {
      const arr = new Ndarray([4], DTypes.Int8Array);
      arr.set(127, 0);
      arr.set(-128, 1);
      arr.set(50, 2);
      arr.set(0, 3);
      
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.dtype).toBe(DTypes.Int32Array);
      expect(result.at(0)).toBe(127);
      expect(result.at(1)).toBe(-128);
      expect(result.at(2)).toBe(50);
      expect(result.at(3)).toBe(0);
    });

    it('should convert between float types', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(3.14159, 0);
      arr.set(-2.71828, 1);
      arr.set(1.41421, 2);
      
      const result = astype(arr, DTypes.Float32Array);
      
      expect(result.dtype).toBe(DTypes.Float32Array);
      expect(result.at(0)).toBeCloseTo(3.14159, 5);
      expect(result.at(1)).toBeCloseTo(-2.71828, 5);
      expect(result.at(2)).toBeCloseTo(1.41421, 5);
    });

    it('should convert from signed to unsigned integers', () => {
      const arr = new Ndarray([3], DTypes.Int32Array);
      arr.set(100, 0);
      arr.set(0, 1);
      arr.set(255, 2);
      
      const result = astype(arr, DTypes.Uint8Array);
      
      expect(result.dtype).toBe(DTypes.Uint8Array);
      expect(result.at(0)).toBe(100);
      expect(result.at(1)).toBe(0);
      expect(result.at(2)).toBe(255);
    });

    it('should handle type conversion with same type', () => {
      const arr = ones([2, 2], DTypes.Float32Array);
      const result = astype(arr, DTypes.Float32Array);
      
      expect(result.dtype).toBe(DTypes.Float32Array);
      expect(result.shape).toEqual([2, 2]);
      expect(result).not.toBe(arr); // Should still create new copy
      expect(result.at(0, 0)).toBe(1);
    });
  });

  describe('multidimensional arrays', () => {
    it('should handle 2D arrays', () => {
      const arr = new Ndarray([2, 3], DTypes.Float64Array);
      arr.set(1.1, 0, 0);
      arr.set(2.7, 0, 1);
      arr.set(3.9, 0, 2);
      arr.set(4.2, 1, 0);
      arr.set(5.8, 1, 1);
      arr.set(6.3, 1, 2);
      
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.shape).toEqual([2, 3]);
      expect(result.at(0, 0)).toBe(1);
      expect(result.at(0, 1)).toBe(2);
      expect(result.at(0, 2)).toBe(3);
      expect(result.at(1, 0)).toBe(4);
      expect(result.at(1, 1)).toBe(5);
      expect(result.at(1, 2)).toBe(6);
    });

    it('should handle 3D arrays', () => {
      const arr = ones([2, 2, 2], DTypes.Float64Array);
      const result = astype(arr, DTypes.Uint8Array);
      
      expect(result.shape).toEqual([2, 2, 2]);
      expect(result.dtype).toBe(DTypes.Uint8Array);
      expect(result.size).toBe(8);
      
      // Check all values
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            expect(result.at(i, j, k)).toBe(1);
          }
        }
      }
    });

    it('should handle higher dimensional arrays', () => {
      const arr = ones([2, 1, 3, 1], DTypes.Int32Array);
      const result = astype(arr, DTypes.Float32Array);
      
      expect(result.shape).toEqual([2, 1, 3, 1]);
      expect(result.dtype).toBe(DTypes.Float32Array);
      expect(result.ndim).toBe(4);
      
      // Check a few values
      expect(result.at(0, 0, 0, 0)).toBe(1);
      expect(result.at(1, 0, 2, 0)).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should handle zero-sized arrays', () => {
      const arr = zeros([0], DTypes.Float64Array);
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.shape).toEqual([0]);
      expect(result.size).toBe(0);
      expect(result.dtype).toBe(DTypes.Int32Array);
    });

    it('should handle arrays with zero dimensions', () => {
      const arr = zeros([2, 0, 3], DTypes.Float32Array);
      const result = astype(arr, DTypes.Uint16Array);
      
      expect(result.shape).toEqual([2, 0, 3]);
      expect(result.size).toBe(0);
      expect(result.dtype).toBe(DTypes.Uint16Array);
    });

    it('should handle single element arrays', () => {
      const arr = new Ndarray([1], DTypes.Float64Array);
      arr.set(42.7, 0);
      
      const result = astype(arr, DTypes.Int32Array);
      
      expect(result.shape).toEqual([1]);
      expect(result.size).toBe(1);
      expect(result.at(0)).toBe(42);
    });

    it('should handle large arrays efficiently', () => {
      const arr = ones([100, 100], DTypes.Float32Array);
      
      const start = performance.now();
      const result = astype(arr, DTypes.Uint8Array);
      const end = performance.now();
      
      expect(result.size).toBe(10000);
      expect(result.dtype).toBe(DTypes.Uint8Array);
      expect(end - start).toBeLessThan(1000); // Should complete reasonably fast
      
      // Spot check values
      expect(result.at(0, 0)).toBe(1);
      expect(result.at(50, 50)).toBe(1);
      expect(result.at(99, 99)).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should throw error for unsupported target dtype', () => {
      const arr = ones([2, 2], DTypes.Float32Array);
      
      expect(() => {
        astype(arr, 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });

    it('should throw error for Float16Array target', () => {
      const arr = ones([2, 2], DTypes.Float32Array);
      
      expect(() => {
        astype(arr, DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });
  });

  describe('comparison with original array', () => {
    it('should maintain values when converting to compatible types', () => {
      const arr = new Ndarray([2, 2], DTypes.Int32Array);
      arr.set(10, 0, 0);
      arr.set(20, 0, 1);
      arr.set(30, 1, 0);
      arr.set(40, 1, 1);
      
      const result = astype(arr, DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(result.dtype).toBe(DTypes.Float64Array);
      expect(result.at(0, 0)).toBe(10);
      expect(result.at(0, 1)).toBe(20);
      expect(result.at(1, 0)).toBe(30);
      expect(result.at(1, 1)).toBe(40);
    });

    it('should have different buffer instances', () => {
      const arr = ones([3, 3], DTypes.Float32Array);
      const result = astype(arr, DTypes.Int32Array);
      
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(result.buffer).toBeInstanceOf(Int32Array);
      expect(arr.buffer).not.toBe(result.buffer);
    });
  });

  describe('memory and performance', () => {
    it('should use appropriate buffer sizes for different types', () => {
      const arr = ones([10], DTypes.Float64Array);
      
      const uint8Result = astype(arr, DTypes.Uint8Array);
      const float32Result = astype(arr, DTypes.Float32Array);
      const int32Result = astype(arr, DTypes.Int32Array);
      
      expect((uint8Result.buffer as Uint8Array).byteLength).toBe(10); // 1 byte per element
      expect((float32Result.buffer as Float32Array).byteLength).toBe(40); // 4 bytes per element
      expect((int32Result.buffer as Int32Array).byteLength).toBe(40); // 4 bytes per element
    });

    it('should handle memory efficiently for large conversions', () => {
      const arr = zeros([500, 500], DTypes.Float64Array);
      
      const start = performance.now();
      const result = astype(arr, DTypes.Float32Array);
      const end = performance.now();
      
      expect(result.size).toBe(250000);
      expect(result.dtype).toBe(DTypes.Float32Array);
      expect(end - start).toBeLessThan(2000); // Should complete in reasonable time
    });
  });
});