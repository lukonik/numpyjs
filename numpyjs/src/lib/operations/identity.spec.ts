import { describe, it, expect } from 'vitest';
import { identity } from './identity.js';
import { eye } from './eye.js';
import { DTypes } from '../core/dtypes.js';

describe('identity', () => {
  describe('basic functionality', () => {
    it('should create square identity matrix with default parameters', () => {
      const arr = identity(3);
      
      expect(arr.shape).toEqual([3, 3]);
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.size).toBe(9);
      expect(arr.ndim).toBe(2);
      
      // Check diagonal elements are 1
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
      expect(arr.at(2, 2)).toBe(1);
      
      // Check off-diagonal elements are 0
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(0, 2)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(1, 2)).toBe(0);
      expect(arr.at(2, 0)).toBe(0);
      expect(arr.at(2, 1)).toBe(0);
    });

    it('should create 1x1 identity matrix', () => {
      const arr = identity(1);
      
      expect(arr.shape).toEqual([1, 1]);
      expect(arr.size).toBe(1);
      expect(arr.at(0, 0)).toBe(1);
    });

    it('should create 2x2 identity matrix', () => {
      const arr = identity(2);
      
      expect(arr.shape).toEqual([2, 2]);
      expect(arr.size).toBe(4);
      
      // Check all elements
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should create larger identity matrices', () => {
      const arr = identity(5);
      
      expect(arr.shape).toEqual([5, 5]);
      expect(arr.size).toBe(25);
      
      // Check diagonal elements
      for (let i = 0; i < 5; i++) {
        expect(arr.at(i, i)).toBe(1);
      }
      
      // Check some off-diagonal elements
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(2, 4)).toBe(0);
      expect(arr.at(4, 2)).toBe(0);
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = identity(3, DTypes.Int8Array);
      
      expect(arr.dtype).toBe(DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
      expect(arr.at(2, 2)).toBe(1);
      expect(arr.at(0, 1)).toBe(0);
    });

    it('should work with Uint8Array', () => {
      const arr = identity(2, DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Uint8ClampedArray', () => {
      const arr = identity(2, DTypes.Uint8ClampedArray);
      
      expect(arr.dtype).toBe(DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Int16Array', () => {
      const arr = identity(2, DTypes.Int16Array);
      
      expect(arr.dtype).toBe(DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Uint16Array', () => {
      const arr = identity(2, DTypes.Uint16Array);
      
      expect(arr.dtype).toBe(DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Int32Array', () => {
      const arr = identity(2, DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Uint32Array', () => {
      const arr = identity(2, DTypes.Uint32Array);
      
      expect(arr.dtype).toBe(DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Float32Array', () => {
      const arr = identity(2, DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Float64Array', () => {
      const arr = identity(2, DTypes.Float64Array);
      
      expect(arr.dtype).toBe(DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should throw error for Float16Array', () => {
      expect(() => {
        identity(3, DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        identity(3, 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('error handling', () => {
    it('should throw error for non-positive n', () => {
      expect(() => identity(0)).toThrow('n must be a positive integer, got 0');
      expect(() => identity(-1)).toThrow('n must be a positive integer, got -1');
      expect(() => identity(-5)).toThrow('n must be a positive integer, got -5');
    });

    it('should throw error for non-integer n', () => {
      expect(() => identity(2.5)).toThrow('n must be a positive integer, got 2.5');
      expect(() => identity(3.14)).toThrow('n must be a positive integer, got 3.14');
      expect(() => identity(NaN)).toThrow('n must be a positive integer, got NaN');
      expect(() => identity(Infinity)).toThrow('n must be a positive integer, got Infinity');
    });
  });

  describe('equivalence with eye function', () => {
    it('should produce same result as eye(n, n, 0, dtype)', () => {
      const n = 4;
      const dtype = DTypes.Float32Array;
      
      const identityResult = identity(n, dtype);
      const eyeResult = eye(n, n, 0, dtype);
      
      expect(identityResult.shape).toEqual(eyeResult.shape);
      expect(identityResult.dtype).toBe(eyeResult.dtype);
      expect(identityResult.size).toBe(eyeResult.size);
      
      // Compare all elements
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          expect(identityResult.at(i, j)).toBe(eyeResult.at(i, j));
        }
      }
    });

    it('should be equivalent to eye for different sizes', () => {
      const sizes = [1, 2, 3, 5, 10];
      
      for (const n of sizes) {
        const identityResult = identity(n);
        const eyeResult = eye(n);
        
        expect(identityResult.shape).toEqual(eyeResult.shape);
        expect(identityResult.dtype).toBe(eyeResult.dtype);
        
        // Compare all elements
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            expect(identityResult.at(i, j)).toBe(eyeResult.at(i, j));
          }
        }
      }
    });

    it('should be equivalent to eye for different dtypes', () => {
      const dtypes = [
        DTypes.Int32Array,
        DTypes.Float32Array,
        DTypes.Float64Array,
        DTypes.Uint8Array
      ];
      
      for (const dtype of dtypes) {
        const n = 3;
        const identityResult = identity(n, dtype);
        const eyeResult = eye(n, n, 0, dtype);
        
        expect(identityResult.shape).toEqual(eyeResult.shape);
        expect(identityResult.dtype).toBe(eyeResult.dtype);
        
        // Compare all elements
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            expect(identityResult.at(i, j)).toBe(eyeResult.at(i, j));
          }
        }
      }
    });
  });

  describe('mathematical properties', () => {
    it('should create proper identity matrix', () => {
      const arr = identity(4);
      
      // Verify identity matrix properties
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i === j) {
            expect(arr.at(i, j)).toBe(1); // Diagonal elements are 1
          } else {
            expect(arr.at(i, j)).toBe(0); // Off-diagonal elements are 0
          }
        }
      }
    });

    it('should have correct trace (sum of diagonal elements)', () => {
      const n = 5;
      const arr = identity(n);
      
      // Calculate trace (sum of diagonal elements)
      let trace = 0;
      for (let i = 0; i < n; i++) {
        trace += arr.at(i, i) as number;
      }
      
      expect(trace).toBe(n); // Trace of n×n identity matrix should be n
    });
  });

  describe('edge cases', () => {
    it('should create large matrices efficiently', () => {
      const arr = identity(100);
      
      expect(arr.shape).toEqual([100, 100]);
      expect(arr.size).toBe(10000);
      
      // Spot check diagonal elements
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(50, 50)).toBe(1);
      expect(arr.at(99, 99)).toBe(1);
      
      // Spot check off-diagonal elements
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(50, 51)).toBe(0);
      expect(arr.at(99, 0)).toBe(0);
    });

    it('should create new instances on each call', () => {
      const arr1 = identity(3);
      const arr2 = identity(3);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(42, 0, 1);
      
      // Other array should be unaffected
      expect(arr2.at(0, 1)).toBe(0);
    });
  });

  describe('performance', () => {
    it('should handle large matrices reasonably fast', () => {
      const start = performance.now();
      const arr = identity(500);
      const end = performance.now();
      
      expect(arr.size).toBe(250000);
      expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
      
      // Verify correctness with spot checks
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(250, 250)).toBe(1);
      expect(arr.at(499, 499)).toBe(1);
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(250, 251)).toBe(0);
    });
  });
});