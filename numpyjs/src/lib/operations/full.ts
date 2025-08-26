import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { forEachIndex } from '../utils/ndarray-utils.js';

/**
 * Return a new array of given shape and type, filled with fill_value.
 * 
 * @param shape - Shape of the new array
 * @param fillValue - Fill value
 * @param dtype - The desired data type for the array. If not given, then the type will be determined as the minimum type required to hold the objects in the sequence.
 * @returns Array of fill_value with the given shape and dtype
 * 
 * @example
 * ```typescript
 * import { full, DTypes } from '@tony-builder/numpyjs';
 * 
 * // Create 2x2 array filled with 7
 * const arr = full([2, 2], 7);
 * console.log(arr.at(0, 0)); // 7
 * console.log(arr.at(1, 1)); // 7
 * 
 * // Create array with specific dtype
 * const floatArr = full([3, 3], 3.14, DTypes.Float32Array);
 * console.log(floatArr.dtype); // DTypes.Float32Array
 * 
 * // Create array filled with negative values
 * const negArr = full([2, 3], -5, DTypes.Int32Array);
 * console.log(negArr.at(0, 0)); // -5
 * ```
 * 
 * @see https://numpy.org/devdocs/reference/generated/numpy.full.html
 */
export function full(
  shape: readonly number[], 
  fillValue: number, 
  dtype: DTypes = DTypes.Float64Array
): Ndarray {
  // Create new array with specified shape and dtype
  const arr = new Ndarray([...shape], dtype);
  
  // Fill all elements with the specified value
  forEachIndex(shape, (indices) => {
    arr.set(fillValue, ...indices);
  });
  
  return arr;
}