import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { forEachIndex, validateShape } from '../utils/ndarray-utils.js';

/**
 * Creates an Ndarray filled with ones.
 * 
 * This function creates a new array of given shape and type, filled with ones.
 * Similar to NumPy's ones() function.
 * 
 * @param shape - The shape of the array as an array of positive integers
 * @param dtype - The desired data type for the array (default: Float64Array)
 * @returns A new Ndarray filled with ones
 * 
 * @example
 * ```typescript
 * // Create a 1D array with 3 ones
 * const arr1d = ones([3]);
 * console.log(arr1d.at(0)); // 1
 * 
 * // Create a 2x3 array of ones with Int32 type
 * const arr2d = ones([2, 3], DTypes.Int32Array);
 * console.log(arr2d.at(1, 2)); // 1
 * 
 * // Create a 3D array of ones
 * const arr3d = ones([2, 2, 2], DTypes.Float32Array);
 * console.log(arr3d.size); // 8, all filled with ones
 * ```
 * 
 * @throws {Error} If shape contains non-positive numbers
 * @throws {Error} If dtype is not supported
 * 
 * @see {@link https://numpy.org/doc/stable/reference/generated/numpy.ones.html | NumPy ones documentation}
 */
export function ones(shape: number[], dtype: DTypes = DTypes.Float64Array): Ndarray {
  // Validate shape using utility function
  validateShape(shape);
  
  // Create the array
  const arr = new Ndarray(shape, dtype);
  
  // Fill with ones using the Ndarray set method and forEachIndex utility
  const value = (dtype === DTypes.BigInt64Array || dtype === DTypes.BigUint64Array) ? 1n : 1;
  
  forEachIndex(shape, (indices) => {
    arr.set(value, ...indices);
  });
  
  return arr;
}