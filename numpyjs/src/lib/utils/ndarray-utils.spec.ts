/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, vi } from 'vitest';
import { forEachIndex, calculateSize, validateShape } from './ndarray-utils.js';

describe('ndarray-utils', () => {
  describe('forEachIndex', () => {
    describe('basic functionality', () => {
      it('should iterate over 1D array indices', () => {
        const indices: number[][] = [];
        
        forEachIndex([3], (idx) => {
          indices.push(idx);
        });
        
        expect(indices).toEqual([
          [0], [1], [2]
        ]);
      });

      it('should iterate over 2D array indices', () => {
        const indices: number[][] = [];
        
        forEachIndex([2, 3], (idx) => {
          indices.push(idx);
        });
        
        expect(indices).toEqual([
          [0, 0], [0, 1], [0, 2],
          [1, 0], [1, 1], [1, 2]
        ]);
      });

      it('should iterate over 3D array indices', () => {
        const indices: number[][] = [];
        
        forEachIndex([2, 2, 2], (idx) => {
          indices.push(idx);
        });
        
        expect(indices).toEqual([
          [0, 0, 0], [0, 0, 1],
          [0, 1, 0], [0, 1, 1],
          [1, 0, 0], [1, 0, 1],
          [1, 1, 0], [1, 1, 1]
        ]);
      });

      it('should handle single element arrays', () => {
        const indices: number[][] = [];
        
        forEachIndex([1], (idx) => {
          indices.push(idx);
        });
        
        expect(indices).toEqual([[0]]);
      });

      it('should handle higher dimensional arrays', () => {
        const indices: number[][] = [];
        
        forEachIndex([2, 1, 2, 1], (idx) => {
          indices.push(idx);
        });
        
        expect(indices).toEqual([
          [0, 0, 0, 0], [0, 0, 1, 0],
          [1, 0, 0, 0], [1, 0, 1, 0]
        ]);
      });

      it('should provide independent copies of indices to callback', () => {
        const indices: number[][] = [];
        
        forEachIndex([2, 2], (idx) => {
          // Store a copy before mutation
          indices.push([...idx]);
          idx[0] = 999; // Mutate the received array
        });
        
        // All stored indices should be unaffected by mutation
        expect(indices).toEqual([
          [0, 0], [0, 1],
          [1, 0], [1, 1]
        ]);
      });
    });

    describe('edge cases', () => {
      it('should handle zero-sized dimensions gracefully', () => {
        const callback = vi.fn();
        
        forEachIndex([0], callback);
        forEachIndex([2, 0], callback);
        forEachIndex([0, 3, 2], callback);
        
        expect(callback).not.toHaveBeenCalled();
      });

      it('should handle arrays with some zero dimensions', () => {
        const callback = vi.fn();
        
        forEachIndex([2, 0, 3], callback);
        
        expect(callback).not.toHaveBeenCalled();
      });

      it('should call callback correct number of times', () => {
        const callback = vi.fn();
        
        forEachIndex([2, 3, 4], callback);
        
        expect(callback).toHaveBeenCalledTimes(24); // 2 * 3 * 4
      });
    });

    describe('error handling', () => {
      it('should throw error for non-array shape', () => {
        expect(() => {
          forEachIndex(5 as any, () => {});
        }).toThrow('Shape must be an array of numbers');
      });

      it('should throw error for empty shape', () => {
        expect(() => {
          forEachIndex([], () => {});
        }).toThrow('Shape cannot be empty');
      });

      it('should throw error for negative dimensions', () => {
        expect(() => {
          forEachIndex([-1, 2], () => {});
        }).toThrow('Shape values must be non-negative integers, got -1 at index 0');
        
        expect(() => {
          forEachIndex([2, -3], () => {});
        }).toThrow('Shape values must be non-negative integers, got -3 at index 1');
      });

      it('should throw error for non-integer dimensions', () => {
        expect(() => {
          forEachIndex([2.5, 3], () => {});
        }).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
        
        expect(() => {
          forEachIndex([2, 3.14], () => {});
        }).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
      });

      it('should throw error for NaN dimensions', () => {
        expect(() => {
          forEachIndex([NaN, 3], () => {});
        }).toThrow('Shape values must be non-negative integers, got NaN at index 0');
      });

      it('should throw error for Infinity dimensions', () => {
        expect(() => {
          forEachIndex([Infinity, 3], () => {});
        }).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
      });
    });

    describe('performance', () => {
      it('should handle large arrays efficiently', () => {
        const callback = vi.fn();
        const start = performance.now();
        
        forEachIndex([100, 100], callback);
        
        const end = performance.now();
        
        expect(callback).toHaveBeenCalledTimes(10000);
        expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
      });
    });
  });

  describe('calculateSize', () => {
    it('should calculate size for 1D arrays', () => {
      expect(calculateSize([5])).toBe(5);
      expect(calculateSize([1])).toBe(1);
      expect(calculateSize([0])).toBe(0);
    });

    it('should calculate size for 2D arrays', () => {
      expect(calculateSize([2, 3])).toBe(6);
      expect(calculateSize([4, 5])).toBe(20);
      expect(calculateSize([1, 10])).toBe(10);
    });

    it('should calculate size for 3D arrays', () => {
      expect(calculateSize([2, 3, 4])).toBe(24);
      expect(calculateSize([1, 1, 1])).toBe(1);
    });

    it('should handle higher dimensional arrays', () => {
      expect(calculateSize([2, 3, 4, 5])).toBe(120);
      expect(calculateSize([1, 2, 1, 3, 1])).toBe(6);
    });

    it('should return 0 for arrays with zero dimensions', () => {
      expect(calculateSize([0])).toBe(0);
      expect(calculateSize([2, 0])).toBe(0);
      expect(calculateSize([2, 3, 0, 4])).toBe(0);
    });

    it('should return 1 for empty product', () => {
      // Edge case: what happens with empty array?
      expect(calculateSize([])).toBe(1);
    });
  });

  describe('validateShape', () => {
    it('should accept valid shapes', () => {
      expect(() => validateShape([2, 3, 4])).not.toThrow();
      expect(() => validateShape([1])).not.toThrow();
      expect(() => validateShape([0, 2])).not.toThrow();
      expect(() => validateShape([10, 20, 30])).not.toThrow();
    });

    it('should throw error for non-array shapes', () => {
      expect(() => validateShape(5 as any)).toThrow('Shape must be an array of numbers');
      expect(() => validateShape('invalid' as any)).toThrow('Shape must be an array of numbers');
      expect(() => validateShape(null as any)).toThrow('Shape must be an array of numbers');
    });

    it('should throw error for empty shapes', () => {
      expect(() => validateShape([])).toThrow('Shape cannot be empty');
    });

    it('should throw error for negative dimensions', () => {
      expect(() => validateShape([-1, 2])).toThrow('Shape values must be non-negative integers, got -1 at index 0');
      expect(() => validateShape([2, -3, 4])).toThrow('Shape values must be non-negative integers, got -3 at index 1');
    });

    it('should throw error for non-integer dimensions', () => {
      expect(() => validateShape([2.5, 3])).toThrow('Shape values must be non-negative integers, got 2.5 at index 0');
      expect(() => validateShape([2, 3.14])).toThrow('Shape values must be non-negative integers, got 3.14 at index 1');
    });

    it('should throw error for special numeric values', () => {
      expect(() => validateShape([NaN])).toThrow('Shape values must be non-negative integers, got NaN at index 0');
      expect(() => validateShape([Infinity])).toThrow('Shape values must be non-negative integers, got Infinity at index 0');
      expect(() => validateShape([-Infinity])).toThrow('Shape values must be non-negative integers, got -Infinity at index 0');
    });
  });
});