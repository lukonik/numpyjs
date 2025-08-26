import { Ndarray } from '../core/ndarray.js';

type NestedNumberArray = number | NestedNumberArray[];

/**
 * Convert an n-dimensional array to a nested JavaScript array.
 * 
 * @param arr - The Ndarray to convert
 * @returns A nested JavaScript array representing the same data structure
 * 
 * @example
 * ```typescript
 * import { full, toArray, DTypes } from '@tony-builder/numpyjs';
 * 
 * // 1D array
 * const arr1d = full([3], 42);
 * console.log(toArray(arr1d)); // [42, 42, 42]
 * 
 * // 2D array  
 * const arr2d = full([2, 3], 5, DTypes.Int32Array);
 * console.log(toArray(arr2d)); // [[5, 5, 5], [5, 5, 5]]
 * 
 * // 3D array
 * const arr3d = full([2, 1, 2], 1.5, DTypes.Float32Array);
 * console.log(toArray(arr3d)); // [[[1.5, 1.5]], [[1.5, 1.5]]]
 * 
 * // Empty array
 * const empty = full([0], 0);
 * console.log(toArray(empty)); // []
 * ```
 * 
 * @see https://numpy.org/doc/stable/reference/generated/numpy.ndarray.tolist.html
 */
export function toArray(arr: Ndarray): NestedNumberArray {
  if (arr.size === 0) {
    return createNestedArray(arr.shape, []);
  }
  
  return createNestedArray(arr.shape, []);

  function createNestedArray(shape: number[], currentIndices: number[]): NestedNumberArray {
    if (currentIndices.length === shape.length) {
      return arr.at(...currentIndices) ?? 0;
    }
    
    const result: NestedNumberArray[] = [];
    const currentDim = shape[currentIndices.length];
    
    for (let i = 0; i < currentDim; i++) {
      result.push(createNestedArray(shape, [...currentIndices, i]));
    }
    
    return result;
  }
}