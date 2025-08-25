import { describe, it, expect } from 'vitest';
import { Ndarray } from './ndarray.js';
import { DTypes } from './dtypes.js';

describe('Ndarray', () => {
  describe('constructor', () => {
    it('should create a 1D array with default parameters', () => {
      const arr = new Ndarray([5], DTypes.Float32Array);
      
      expect(arr.shape).toEqual([5]);
      expect(arr.dtype).toBe(DTypes.Float32Array);
      expect(arr.size).toBe(5);
      expect(arr.ndim).toBe(1);
      expect(arr.strides).toEqual([1]);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
    });

    it('should create a 2D array with default parameters', () => {
      const arr = new Ndarray([2, 3], DTypes.Int32Array);
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.dtype).toBe(DTypes.Int32Array);
      expect(arr.size).toBe(6);
      expect(arr.ndim).toBe(2);
      expect(arr.strides).toEqual([3, 1]);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
    });

    it('should create a 3D array with correct strides', () => {
      const arr = new Ndarray([2, 3, 4], DTypes.Uint8Array);
      
      expect(arr.shape).toEqual([2, 3, 4]);
      expect(arr.size).toBe(24);
      expect(arr.ndim).toBe(3);
      expect(arr.strides).toEqual([12, 4, 1]);
    });

    it('should accept custom buffer', () => {
      const buffer = new Float64Array([1, 2, 3, 4, 5, 6]);
      const arr = new Ndarray([2, 3], DTypes.Float64Array, buffer);
      
      expect(arr.buffer).toBe(buffer);
      expect(arr.at(0, 0)).toBe(1);
      expect(arr.at(1, 2)).toBe(6);
    });

    it('should accept custom strides', () => {
      const customStrides = [1, 2];
      const arr = new Ndarray([2, 3], DTypes.Float32Array, undefined, 0, customStrides);
      
      expect(arr.strides).toEqual([1, 2]);
    });

    it('should accept custom offset', () => {
      const buffer = new Int32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const arr = new Ndarray([2, 2], DTypes.Int32Array, buffer, 3);
      
      expect(arr.at(0, 0)).toBe(3);
      expect(arr.at(0, 1)).toBe(4);
      expect(arr.at(1, 0)).toBe(5);
      expect(arr.at(1, 1)).toBe(6);
    });

    it('should create defensive copies of shape and strides', () => {
      const shape = [2, 3];
      const strides = [3, 1];
      const arr = new Ndarray(shape, DTypes.Float32Array, undefined, 0, strides);
      
      shape[0] = 999;
      strides[0] = 999;
      
      expect(arr.shape).toEqual([2, 3]);
      expect(arr.strides).toEqual([3, 1]);
    });
  });

  describe('data types', () => {
    it('should create Int8Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Int8Array);
      expect(arr.buffer).toBeInstanceOf(Int8Array);
    });

    it('should create Uint8Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Uint8Array);
      expect(arr.buffer).toBeInstanceOf(Uint8Array);
    });

    it('should create Uint8ClampedArray buffer', () => {
      const arr = new Ndarray([3], DTypes.Uint8ClampedArray);
      expect(arr.buffer).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should create Int16Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Int16Array);
      expect(arr.buffer).toBeInstanceOf(Int16Array);
    });

    it('should create Uint16Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Uint16Array);
      expect(arr.buffer).toBeInstanceOf(Uint16Array);
    });

    it('should create Int32Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Int32Array);
      expect(arr.buffer).toBeInstanceOf(Int32Array);
    });

    it('should create Uint32Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Uint32Array);
      expect(arr.buffer).toBeInstanceOf(Uint32Array);
    });

    it('should create Float32Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Float32Array);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
    });

    it('should create Float64Array buffer', () => {
      const arr = new Ndarray([3], DTypes.Float64Array);
      expect(arr.buffer).toBeInstanceOf(Float64Array);
    });

    it('should create BigInt64Array buffer', () => {
      const arr = new Ndarray([3], DTypes.BigInt64Array);
      expect(arr.buffer).toBeInstanceOf(BigInt64Array);
    });

    it('should create BigUint64Array buffer', () => {
      const arr = new Ndarray([3], DTypes.BigUint64Array);
      expect(arr.buffer).toBeInstanceOf(BigUint64Array);
    });

    it('should throw error for Float16Array', () => {
      expect(() => {
        new Ndarray([3], DTypes.Float16Array);
      }).toThrow('Float16Array not supported in this environment');
    });

    it('should throw error for unsupported dtype', () => {
      expect(() => {
        new Ndarray([3], 'InvalidType' as DTypes);
      }).toThrow('Unsupported dtype: InvalidType');
    });
  });

  describe('property getters', () => {
    it('should return correct shape', () => {
      const arr = new Ndarray([2, 3, 4], DTypes.Float32Array);
      expect(arr.shape).toEqual([2, 3, 4]);
    });

    it('should return correct dtype', () => {
      const arr = new Ndarray([5], DTypes.Int32Array);
      expect(arr.dtype).toBe(DTypes.Int32Array);
    });

    it('should return correct size for various shapes', () => {
      expect(new Ndarray([5], DTypes.Float32Array).size).toBe(5);
      expect(new Ndarray([2, 3], DTypes.Float32Array).size).toBe(6);
      expect(new Ndarray([2, 3, 4], DTypes.Float32Array).size).toBe(24);
      expect(new Ndarray([1], DTypes.Float32Array).size).toBe(1);
    });

    it('should return correct ndim', () => {
      expect(new Ndarray([5], DTypes.Float32Array).ndim).toBe(1);
      expect(new Ndarray([2, 3], DTypes.Float32Array).ndim).toBe(2);
      expect(new Ndarray([2, 3, 4], DTypes.Float32Array).ndim).toBe(3);
    });

    it('should return defensive copy of strides', () => {
      const arr = new Ndarray([2, 3], DTypes.Float32Array);
      const strides = arr.strides;
      strides[0] = 999;
      
      expect(arr.strides).toEqual([3, 1]);
    });
  });

  describe('array access', () => {
    it('should set and get values in 1D array', () => {
      const arr = new Ndarray([5], DTypes.Float32Array);
      
      arr.set(42, 0);
      arr.set(3.14, 4);
      
      expect(arr.at(0)).toBe(42);
      expect(arr.at(4)).toBeCloseTo(3.14);
      expect(arr.at(1)).toBe(0); // default value
    });

    it('should set and get values in 2D array', () => {
      const arr = new Ndarray([2, 3], DTypes.Int32Array);
      
      arr.set(10, 0, 0);
      arr.set(20, 0, 2);
      arr.set(30, 1, 1);
      
      expect(arr.at(0, 0)).toBe(10);
      expect(arr.at(0, 2)).toBe(20);
      expect(arr.at(1, 1)).toBe(30);
      expect(arr.at(0, 1)).toBe(0);
      expect(arr.at(1, 0)).toBe(0);
    });

    it('should set and get values in 3D array', () => {
      const arr = new Ndarray([2, 2, 2], DTypes.Float64Array);
      
      arr.set(1.5, 0, 0, 0);
      arr.set(2.5, 0, 1, 0);
      arr.set(3.5, 1, 0, 1);
      arr.set(4.5, 1, 1, 1);
      
      expect(arr.at(0, 0, 0)).toBe(1.5);
      expect(arr.at(0, 1, 0)).toBe(2.5);
      expect(arr.at(1, 0, 1)).toBe(3.5);
      expect(arr.at(1, 1, 1)).toBe(4.5);
    });

    it('should work with BigInt arrays', () => {
      const arr = new Ndarray([2, 2], DTypes.BigInt64Array);
      
      arr.set(123n, 0, 0);
      arr.set(-456n, 1, 1);
      
      expect(arr.at(0, 0)).toBe(123n);
      expect(arr.at(1, 1)).toBe(-456n);
      expect(arr.at(0, 1)).toBe(0n);
    });

    it('should handle memory layout correctly with custom strides', () => {
      const buffer = new Float32Array([1, 2, 3, 4, 5, 6]);
      // Column-major layout: strides [1, 2] for shape [2, 3]
      const arr = new Ndarray([2, 3], DTypes.Float32Array, buffer, 0, [1, 2]);
      
      expect(arr.at(0, 0)).toBe(1); // buffer[0]
      expect(arr.at(1, 0)).toBe(2); // buffer[1]
      expect(arr.at(0, 1)).toBe(3); // buffer[2]
      expect(arr.at(1, 1)).toBe(4); // buffer[3]
    });
  });

  describe('error handling', () => {
    describe('at() method', () => {
      it('should throw error for wrong number of indices', () => {
        const arr = new Ndarray([2, 3], DTypes.Float32Array);
        
        expect(() => arr.at(0)).toThrow('Expected 2 indices, got 1');
        expect(() => arr.at(0, 1, 2)).toThrow('Expected 2 indices, got 3');
      });

      it('should throw error for out of bounds indices', () => {
        const arr = new Ndarray([2, 3], DTypes.Float32Array);
        
        expect(() => arr.at(-1, 0)).toThrow('Index -1 is out of bounds for dimension 0 with size 2');
        expect(() => arr.at(2, 0)).toThrow('Index 2 is out of bounds for dimension 0 with size 2');
        expect(() => arr.at(0, 3)).toThrow('Index 3 is out of bounds for dimension 1 with size 3');
        expect(() => arr.at(1, -1)).toThrow('Index -1 is out of bounds for dimension 1 with size 3');
      });
    });

    describe('set() method', () => {
      it('should throw error for wrong number of indices', () => {
        const arr = new Ndarray([2, 3], DTypes.Float32Array);
        
        expect(() => arr.set(42, 0)).toThrow('Expected 2 indices, got 1');
        expect(() => arr.set(42, 0, 1, 2)).toThrow('Expected 2 indices, got 3');
      });

      it('should throw error for out of bounds indices', () => {
        const arr = new Ndarray([2, 3], DTypes.Float32Array);
        
        expect(() => arr.set(42, -1, 0)).toThrow('Index -1 is out of bounds for dimension 0 with size 2');
        expect(() => arr.set(42, 2, 0)).toThrow('Index 2 is out of bounds for dimension 0 with size 2');
        expect(() => arr.set(42, 0, 3)).toThrow('Index 3 is out of bounds for dimension 1 with size 3');
        expect(() => arr.set(42, 1, -1)).toThrow('Index -1 is out of bounds for dimension 1 with size 3');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle single element arrays', () => {
      const arr = new Ndarray([1], DTypes.Float32Array);
      
      expect(arr.size).toBe(1);
      expect(arr.strides).toEqual([1]);
      
      arr.set(42, 0);
      expect(arr.at(0)).toBe(42);
    });

    it('should handle arrays with zero dimension', () => {
      const arr = new Ndarray([0], DTypes.Float32Array);
      
      expect(arr.size).toBe(0);
      expect(arr.strides).toEqual([1]);
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(0);
    });

    it('should handle arrays with one zero dimension in multidimensional', () => {
      const arr = new Ndarray([2, 0, 3], DTypes.Int32Array);
      
      expect(arr.size).toBe(0);
      expect(arr.strides).toEqual([0, 3, 1]);
    });

    it('should work with null buffer parameter', () => {
      const arr = new Ndarray([2, 2], DTypes.Float32Array, null);
      
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(4);
    });

    it('should work with undefined buffer parameter', () => {
      const arr = new Ndarray([2, 2], DTypes.Float32Array, undefined);
      
      expect(arr.buffer).toBeInstanceOf(Float32Array);
      expect((arr.buffer as Float32Array).length).toBe(4);
    });
  });

  describe('memory layout verification', () => {
    it('should use C-order (row-major) memory layout by default', () => {
      const arr = new Ndarray([2, 3], DTypes.Float32Array);
      
      // Fill array in C-order
      let value = 0;
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          arr.set(value++, i, j);
        }
      }
      
      // Verify values are stored in expected order
      expect(arr.at(0, 0)).toBe(0);
      expect(arr.at(0, 1)).toBe(1);
      expect(arr.at(0, 2)).toBe(2);
      expect(arr.at(1, 0)).toBe(3);
      expect(arr.at(1, 1)).toBe(4);
      expect(arr.at(1, 2)).toBe(5);
    });

    it('should correctly calculate multidimensional indices', () => {
      const arr = new Ndarray([2, 3, 4], DTypes.Int32Array);
      
      // Set a value and verify it's at the correct memory position
      arr.set(999, 1, 2, 3);
      
      // Manual calculation: offset = 1*12 + 2*4 + 3*1 = 12 + 8 + 3 = 23
      const buffer = arr.buffer as Int32Array;
      expect(buffer[23]).toBe(999);
    });
  });
});