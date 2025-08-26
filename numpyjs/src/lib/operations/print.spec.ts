import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { print } from './print.js';
import { full } from './full.js';
import { zeros } from './zeros.js';
import { ones } from './ones.js';
import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';

describe('print', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('1D arrays', () => {
    it('should print 1D integer array', () => {
      const arr = new Ndarray([4], DTypes.Int32Array);
      arr.set(1, 0); arr.set(2, 1); arr.set(3, 2); arr.set(4, 3);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 2 3 4]');
    });

    it('should print 1D float array with default precision', () => {
      const arr = full([3], 3.14159265, DTypes.Float64Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[3.141593 3.141593 3.141593]');
    });

    it('should print 1D float array with custom precision', () => {
      const arr = full([3], 3.14159265, DTypes.Float64Array);
      
      print(arr, { precision: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[3.14 3.14 3.14]');
    });

    it('should print single element array', () => {
      const arr = full([1], 42, DTypes.Int32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[42]');
    });

    it('should print empty 1D array', () => {
      const arr = new Ndarray([0], DTypes.Float64Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[]');
    });
  });

  describe('2D arrays', () => {
    it('should print 2D integer array', () => {
      const arr = new Ndarray([2, 3], DTypes.Int32Array);
      arr.set(1, 0, 0); arr.set(2, 0, 1); arr.set(3, 0, 2);
      arr.set(4, 1, 0); arr.set(5, 1, 1); arr.set(6, 1, 2);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[1 2 3]\n [4 5 6]]'
      );
    });

    it('should print 2D float array', () => {
      const arr = full([2, 2], 1.5, DTypes.Float32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[1.5 1.5]\n [1.5 1.5]]'
      );
    });

    it('should print 2D array with zeros', () => {
      const arr = zeros([2, 3], DTypes.Int32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[0 0 0]\n [0 0 0]]'
      );
    });

    it('should print 2D array with ones', () => {
      const arr = ones([3, 2], DTypes.Int32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[1 1]\n [1 1]\n [1 1]]'
      );
    });

    it('should print empty 2D array', () => {
      const arr = new Ndarray([0, 0], DTypes.Float32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[][]');
    });

    it('should print 2D array with zero dimension', () => {
      const arr = new Ndarray([2, 0], DTypes.Float32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[]');
    });
  });

  describe('3D arrays', () => {
    it('should print 3D array', () => {
      const arr = new Ndarray([2, 2, 2], DTypes.Int32Array);
      let value = 1;
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            arr.set(value++, i, j, k);
          }
        }
      }
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[[1 2]\n  [3 4]]\n\n\n [[5 6]\n  [7 8]]]'
      );
    });

    it('should print 3D array with same values', () => {
      const arr = full([2, 1, 2], 7, DTypes.Int32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[[7 7]]\n\n\n [[7 7]]]'
      );
    });
  });

  describe('precision and formatting', () => {
    it('should handle different precision values', () => {
      const arr = full([2], Math.PI, DTypes.Float64Array);
      
      print(arr, { precision: 0 });
      expect(consoleSpy).toHaveBeenLastCalledWith('[3 3]');
      
      print(arr, { precision: 3 });
      expect(consoleSpy).toHaveBeenLastCalledWith('[3.142 3.142]');
      
      print(arr, { precision: 8 });
      expect(consoleSpy).toHaveBeenLastCalledWith('[3.14159265 3.14159265]');
    });

    it('should handle integer values correctly', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(1.0, 0); arr.set(2.0, 1); arr.set(3.0, 2);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 2 3]');
    });

    it('should handle negative numbers', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(-1.5, 0); arr.set(-2.25, 1); arr.set(-3.0, 2);
      
      print(arr, { precision: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[-1.5 -2.25 -3]');
    });

    it('should handle very small numbers with suppressSmall', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(1e-8, 0); arr.set(1e-5, 1); arr.set(1.0, 2);
      
      print(arr, { suppressSmall: true, precision: 6 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[0 0.00001 1]');
    });

    it('should handle special values (Infinity, -Infinity, NaN)', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(Infinity, 0); arr.set(-Infinity, 1); arr.set(NaN, 2);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[Infinity -Infinity NaN]');
    });
  });

  describe('large arrays', () => {
    it('should summarize large 1D arrays', () => {
      const arr = ones([10], DTypes.Int32Array);
      
      print(arr, { threshold: 8, edgeItems: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 1 ... 1 1]');
    });

    it('should print full array when under threshold', () => {
      const arr = ones([5], DTypes.Int32Array);
      
      print(arr, { threshold: 10, edgeItems: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 1 1 1 1]');
    });

    it('should handle edge case where array size equals edgeItems * 2', () => {
      const arr = ones([6], DTypes.Int32Array);
      
      print(arr, { threshold: 5, edgeItems: 3 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 1 1 1 1 1]');
    });

    it('should indicate large array for higher dimensions', () => {
      const arr = ones([50, 50], DTypes.Int32Array);
      
      print(arr, { threshold: 100 });
      
      const output = consoleSpy.mock.calls[0][0] as string;
      expect(output).toContain('(Large array - showing all elements)');
    });
  });

  describe('data types', () => {
    it('should work with Int8Array', () => {
      const arr = full([3], 127, DTypes.Int8Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[127 127 127]');
    });

    it('should work with Uint8Array', () => {
      const arr = full([3], 255, DTypes.Uint8Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[255 255 255]');
    });

    it('should work with Float32Array', () => {
      const arr = full([2], 3.14, DTypes.Float32Array);
      
      print(arr, { precision: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[3.14 3.14]');
    });

    it('should work with Float64Array', () => {
      const arr = full([2], 2.718281828, DTypes.Float64Array);
      
      print(arr, { precision: 3 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[2.718 2.718]');
    });
  });

  describe('edge cases', () => {
    it('should handle arrays with mixed positive and negative values', () => {
      const arr = new Ndarray([4], DTypes.Float64Array);
      arr.set(-1.5, 0); arr.set(0, 1); arr.set(2.7, 2); arr.set(-3.14, 3);
      
      print(arr, { precision: 2 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[-1.5 0 2.7 -3.14]');
    });

    it('should handle zero values correctly', () => {
      const arr = zeros([2, 2], DTypes.Float32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[[0 0]\n [0 0]]');
    });

    it('should handle arrays with very large numbers', () => {
      const arr = new Ndarray([2], DTypes.Float64Array);
      arr.set(1e10, 0); arr.set(-1e10, 1);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith('[10000000000 -10000000000]');
    });

    it('should remove trailing zeros in decimal formatting', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      arr.set(1.0, 0); arr.set(2.50, 1); arr.set(3.100, 2);
      
      print(arr, { precision: 3 });
      
      expect(consoleSpy).toHaveBeenCalledWith('[1 2.5 3.1]');
    });
  });

  describe('higher dimensional arrays', () => {
    it('should print 4D array', () => {
      const arr = ones([2, 1, 2, 1], DTypes.Int32Array);
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[[[1]\n  [1]]]\n\n\n [[[1]\n  [1]]]]'
      );
    });

    it('should handle complex nested structures', () => {
      const arr = new Ndarray([1, 3, 2], DTypes.Int32Array);
      let value = 1;
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 2; k++) {
            arr.set(value++, i, j, k);
          }
        }
      }
      
      print(arr);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[[[1 2]\n  [3 4]\n  [5 6]]]'
      );
    });
  });
});