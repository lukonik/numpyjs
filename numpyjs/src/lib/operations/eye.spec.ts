import { describe, it, expect } from 'vitest';
import { eye } from './eye.js';
import { DTypes } from '../core/dtypes.js';

describe('eye', () => {
  describe('basic functionality', () => {
    it('should create square identity matrix with default parameters', () => {
      const arr = eye(3);
      
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

    it('should create rectangular matrix when M is specified', () => {
      const arr = eye(2, 4);
      
      expect(arr.shape).toEqual([2, 4]);
      expect(arr.size).toBe(8);
      
      // Check diagonal elements
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
      
      // Check other elements are 0
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(0, 2)).toBe(0);
      expect(arr.at(0, 3)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(1, 2)).toBe(0);
      expect(arr.at(1, 3)).toBe(0);
    });

    it('should create matrix with tall shape', () => {
      const arr = eye(4, 2);
      
      expect(arr.shape).toEqual([4, 2]);
      expect(arr.size).toBe(8);
      
      // Check diagonal elements
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
      
      // Check other elements are 0
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(2, 0)).toBe(0);
      expect(arr.at(2, 1)).toBe(0);
      expect(arr.at(3, 0)).toBe(0);
      expect(arr.at(3, 1)).toBe(0);
    });

    it('should create 1x1 identity matrix', () => {
      const arr = eye(1);
      
      expect(arr.shape).toEqual([1, 1]);
      expect(arr.size).toBe(1);
      expect(arr.at(0, 0)).toBe(1);
    });
  });

  describe('diagonal offset (k parameter)', () => {
    it('should create matrix with ones on upper diagonal (k=1)', () => {
      const arr = eye(3, 3, 1);
      
      expect(arr.shape).toEqual([3, 3]);
      
      // Check upper diagonal (k=1)
      expect(arr.at(0, 1)).toBe(1);
      expect(arr.at(1, 2)).toBe(1);
      
      // Check main diagonal should be 0
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(1, 1)).toBe(0);
      expect(arr.at(2, 2)).toBe(0);
      
      // Check other positions
      expect(arr.at(0, 2)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
      expect(arr.at(2, 0)).toBe(0);
      expect(arr.at(2, 1)).toBe(0);
    });

    it('should create matrix with ones on lower diagonal (k=-1)', () => {
      const arr = eye(3, 3, -1);
      
      expect(arr.shape).toEqual([3, 3]);
      
      // Check lower diagonal (k=-1)
      expect(arr.at(1, 0)).toBe(1);
      expect(arr.at(2, 1)).toBe(1);
      
      // Check main diagonal should be 0
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(1, 1)).toBe(0);
      expect(arr.at(2, 2)).toBe(0);
      
      // Check other positions
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(0, 2)).toBe(0);
      expect(arr.at(1, 2)).toBe(0);
      expect(arr.at(2, 0)).toBe(0);
    });

    it('should create matrix with ones on second upper diagonal (k=2)', () => {
      const arr = eye(4, 4, 2);
      
      // Check second upper diagonal (k=2)
      expect(arr.at(0, 2)).toBe(1);
      expect(arr.at(1, 3)).toBe(1);
      
      // Check all other positions are 0
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (j - i === 2) {
            expect(arr.at(i, j)).toBe(1);
          } else {
            expect(arr.at(i, j)).toBe(0);
          }
        }
      }
    });

    it('should create matrix with ones on second lower diagonal (k=-2)', () => {
      const arr = eye(4, 4, -2);
      
      // Check second lower diagonal (k=-2)
      expect(arr.at(2, 0)).toBe(1);
      expect(arr.at(3, 1)).toBe(1);
      
      // Check all other positions are 0
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (i - j === 2) {
            expect(arr.at(i, j)).toBe(1);
          } else {
            expect(arr.at(i, j)).toBe(0);
          }
        }
      }
    });

    it('should handle diagonal offset outside matrix bounds', () => {
      const arr = eye(3, 3, 5); // k too large
      
      // All elements should be 0 since diagonal is outside matrix
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(0);
        }
      }
    });

    it('should handle negative diagonal offset outside matrix bounds', () => {
      const arr = eye(3, 3, -5); // k too negative
      
      // All elements should be 0 since diagonal is outside matrix
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          expect(arr.at(i, j)).toBe(0);
        }
      }
    });

    it('should work with rectangular matrices and diagonal offsets', () => {
      const arr = eye(3, 5, 1);
      
      expect(arr.shape).toEqual([3, 5]);
      
      // Check upper diagonal (k=1)
      expect(arr.at(0, 1)).toBe(1);
      expect(arr.at(1, 2)).toBe(1);
      expect(arr.at(2, 3)).toBe(1);
      
      // Spot check some zeros
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(1, 1)).toBe(0);
      expect(arr.at(2, 2)).toBe(0);
      expect(arr.at(0, 4)).toBe(0);
    });
  });

  describe('data types', () => {
    it('should work with Int32Array', () => {
      const arr = eye(2, 2, 0, DTypes.Int32Array);
      
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
    });

    it('should work with Float32Array', () => {
      const arr = eye(2, 2, 0, DTypes.Float32Array);
      
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should work with Uint8Array', () => {
      const arr = eye(2, 2, 0, DTypes.Uint8Array);
      
      expect(arr.dtype).toBe(DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 1)).toBe(1);
    });

    it('should throw error for Float16Array', () => {
      expect(() => {
        eye(3, 3, 0, DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        eye(3, 3, 0, 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('error handling', () => {
    it('should throw error for non-positive N', () => {
      expect(() => eye(0)).toThrow('N must be a positive integer, got 0');
      expect(() => eye(-1)).toThrow('N must be a positive integer, got -1');
      expect(() => eye(-5)).toThrow('N must be a positive integer, got -5');
    });

    it('should throw error for non-integer N', () => {
      expect(() => eye(2.5)).toThrow('N must be a positive integer, got 2.5');
      expect(() => eye(3.14)).toThrow('N must be a positive integer, got 3.14');
      expect(() => eye(NaN)).toThrow('N must be a positive integer, got NaN');
      expect(() => eye(Infinity)).toThrow('N must be a positive integer, got Infinity');
    });

    it('should throw error for non-positive M', () => {
      expect(() => eye(3, 0)).toThrow('M must be a positive integer, got 0');
      expect(() => eye(3, -1)).toThrow('M must be a positive integer, got -1');
      expect(() => eye(3, -5)).toThrow('M must be a positive integer, got -5');
    });

    it('should throw error for non-integer M', () => {
      expect(() => eye(3, 2.5)).toThrow('M must be a positive integer, got 2.5');
      expect(() => eye(3, 3.14)).toThrow('M must be a positive integer, got 3.14');
      expect(() => eye(3, NaN)).toThrow('M must be a positive integer, got NaN');
      expect(() => eye(3, Infinity)).toThrow('M must be a positive integer, got Infinity');
    });

    it('should throw error for non-integer k', () => {
      expect(() => eye(3, 3, 1.5)).toThrow('k must be an integer, got 1.5');
      expect(() => eye(3, 3, -1.5)).toThrow('k must be an integer, got -1.5');
      expect(() => eye(3, 3, NaN)).toThrow('k must be an integer, got NaN');
      expect(() => eye(3, 3, Infinity)).toThrow('k must be an integer, got Infinity');
    });
  });

  describe('edge cases', () => {
    it('should create large matrices efficiently', () => {
      const arr = eye(100);
      
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
      const arr1 = eye(3);
      const arr2 = eye(3);
      
      expect(arr1).not.toBe(arr2);
      expect(arr1.buffer).not.toBe(arr2.buffer);
      
      // Modify one array
      arr1.set(42, 0, 1);
      
      // Other array should be unaffected
      expect(arr2.at(0, 1)).toBe(0);
    });
  });

  describe('mathematical properties', () => {
    it('should satisfy identity matrix properties for multiplication', () => {
      const identity = eye(3);
      
      // An identity matrix should have 1s on diagonal and 0s elsewhere
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === j) {
            expect(identity.at(i, j)).toBe(1);
          } else {
            expect(identity.at(i, j)).toBe(0);
          }
        }
      }
    });

    it('should create proper diagonal patterns', () => {
      const size = 5;
      
      // Test multiple diagonal offsets
      for (let k = -2; k <= 2; k++) {
        const arr = eye(size, size, k);
        
        // Check every position
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (j - i === k) {
              expect(arr.at(i, j)).toBe(1);
            } else {
              expect(arr.at(i, j)).toBe(0);
            }
          }
        }
      }
    });
  });

  describe('performance', () => {
    it('should handle large matrices reasonably fast', () => {
      const start = performance.now();
      const arr = eye(500, 500);
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