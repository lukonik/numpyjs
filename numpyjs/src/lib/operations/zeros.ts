import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { forEachIndex } from '../utils/ndarray-utils.js';

/**
 * Creates an Ndarray filled with zeros.
 * 
 * This function creates a new array of given shape and type, filled with zeros.
 * Similar to NumPy's zeros() function.
 * 
 * @param shape - The shape of the array as an array of positive integers
 * @param dtype - The desired data type for the array (default: Float64Array)
 * @returns A new Ndarray filled with zeros
 * 
 * @example
 * ```typescript
 * // Create a 1D array with 3 zeros
 * const arr1d = zeros([3]);
 * console.log(arr1d.at(0)); // 0
 * 
 * // Create a 2x3 array of zeros with Int32 type
 * const arr2d = zeros([2, 3], DTypes.Int32Array);
 * console.log(arr2d.at(1, 2)); // 0
 * 
 * // Create a 3D array of zeros
 * const arr3d = zeros([2, 2, 2], DTypes.Float32Array);
 * console.log(arr3d.size); // 8, all filled with zeros
 * ```
 * 
 * @throws {Error} If shape contains non-positive numbers
 * @throws {Error} If dtype is not supported
 * 
 * @see {@link https://numpy.org/doc/stable/reference/generated/numpy.zeros.html | NumPy zeros documentation}
 */
export function zeros(shape: number[], dtype: DTypes = DTypes.Float64Array): Ndarray {
  // Create the array (validation happens in Ndarray constructor)
  const arr = new Ndarray(shape, dtype);
  
  // Fill with zeros using the Ndarray set method and forEachIndex utility
  forEachIndex(shape, (indices) => {
    arr.set(0, ...indices);
  });
  
  return arr;
}