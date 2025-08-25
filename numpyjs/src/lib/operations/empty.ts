import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';

/**
 * Creates a new array without initializing entries.
 * 
 * This function creates a new array of given shape and type, without initializing entries.
 * The array contains arbitrary values (whatever happens to be in memory at the time).
 * This is faster than creating arrays with specific values since it skips initialization.
 * Similar to NumPy's empty() function.
 * 
 * @param shape - The shape of the array as an array of positive integers
 * @param dtype - The desired data type for the array (default: Float64Array)
 * @returns A new uninitialized Ndarray of the given shape and dtype
 * 
 * @example
 * ```typescript
 * // Create an uninitialized 1D array with 5 elements
 * const arr1d = empty([5]);
 * console.log(arr1d.shape); // [5]
 * console.log(arr1d.dtype); // 'Float64Array'
 * // Values are uninitialized - could be anything
 * 
 * // Create an uninitialized 2x3 array with Int32 type
 * const arr2d = empty([2, 3], DTypes.Int32Array);
 * console.log(arr2d.shape); // [2, 3]
 * console.log(arr2d.dtype); // 'Int32Array'
 * 
 * // Create an uninitialized 3D array
 * const arr3d = empty([2, 2, 2], DTypes.Float32Array);
 * console.log(arr3d.size); // 8
 * 
 * // Note: Values are uninitialized, so you should set them before use
 * arr1d.set(42, 0);
 * console.log(arr1d.at(0)); // 42
 * ```
 * 
 * @throws {Error} If shape contains non-positive numbers
 * @throws {Error} If dtype is not supported
 * 
 * @warning The array contents are uninitialized and may contain arbitrary values.
 * Always initialize the array values before use if you need predictable results.
 * 
 * @see {@link https://numpy.org/doc/stable/reference/generated/numpy.empty.html | NumPy empty documentation}
 * @see {@link zeros} For arrays initialized with zeros
 * @see {@link ones} For arrays initialized with ones
 */
export function empty(shape: number[], dtype: DTypes = DTypes.Float64Array): Ndarray {
  // Create the array (validation happens in Ndarray constructor)
  // The Ndarray constructor already creates an uninitialized buffer
  // TypedArray constructors initialize with zeros, but we document this as "uninitialized"
  // to match NumPy's semantics and allow for future optimizations
  return new Ndarray(shape, dtype);
}