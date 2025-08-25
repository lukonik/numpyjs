import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { eye } from './eye.js';

/**
 * Creates the identity array - a square 2-D array with ones on the main diagonal.
 * 
 * This function creates a square identity matrix with ones on the main diagonal and zeros elsewhere.
 * It's a convenience function equivalent to `eye(n, n, 0, dtype)` but specifically for square matrices.
 * Similar to NumPy's identity() function.
 * 
 * @param n - Number of rows (and columns) in the n x n output array
 * @param dtype - The desired data type for the array (default: Float64Array)
 * @returns A n x n Ndarray with ones on the main diagonal and zeros elsewhere
 * 
 * @example
 * ```typescript
 * // Create a 3x3 identity matrix
 * const I = identity(3);
 * console.log(I.at(0, 0)); // 1
 * console.log(I.at(0, 1)); // 0
 * console.log(I.at(1, 1)); // 1
 * 
 * // Create a 4x4 identity matrix with Int32 type
 * const I32 = identity(4, DTypes.Int32Array);
 * console.log(I32.dtype); // 'Int32Array'
 * 
 * // Create a 1x1 identity matrix
 * const I1 = identity(1);
 * console.log(I1.at(0, 0)); // 1
 * ```
 * 
 * @throws {Error} If n is not a positive integer
 * @throws {Error} If dtype is not supported
 * 
 * @see {@link https://numpy.org/doc/stable/reference/generated/numpy.identity.html | NumPy identity documentation}
 * @see {@link eye} For more general diagonal matrix creation with offset support
 */
export function identity(n: number, dtype: DTypes = DTypes.Float64Array): Ndarray {
  // Validate n
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(`n must be a positive integer, got ${n}`);
  }
  
  // Use the eye function with default parameters for square identity matrix
  return eye(n, n, 0, dtype);
}