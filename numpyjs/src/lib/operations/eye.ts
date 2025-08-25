import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { forEachIndex, validateShape } from '../utils/ndarray-utils.js';

/**
 * Creates a 2-D array with ones on the diagonal and zeros elsewhere.
 * 
 * This function creates an identity matrix or a matrix with ones on a specified diagonal.
 * Similar to NumPy's eye() function.
 * 
 * @param N - Number of rows in the output
 * @param M - Number of columns in the output. If undefined, defaults to N (square matrix)
 * @param k - Index of the diagonal: 0 (default) is main diagonal, positive for upper diagonal, negative for lower diagonal
 * @param dtype - The desired data type for the array (default: Float64Array)
 * @returns A 2-D Ndarray with ones on the k-th diagonal and zeros elsewhere
 * 
 * @example
 * ```typescript
 * // Create a 3x3 identity matrix
 * const identity = eye(3);
 * console.log(identity.at(0, 0)); // 1
 * console.log(identity.at(0, 1)); // 0
 * 
 * // Create a 3x4 matrix with ones on main diagonal
 * const rect = eye(3, 4);
 * 
 * // Create a 4x4 matrix with ones on first upper diagonal
 * const upper = eye(4, 4, 1);
 * console.log(upper.at(0, 1)); // 1
 * console.log(upper.at(1, 2)); // 1
 * 
 * // Create a 4x4 matrix with ones on first lower diagonal
 * const lower = eye(4, 4, -1);
 * console.log(lower.at(1, 0)); // 1
 * console.log(lower.at(2, 1)); // 1
 * 
 * // Use specific data type
 * const int32Eye = eye(3, 3, 0, DTypes.Int32Array);
 * ```
 * 
 * @throws {Error} If N is not a positive integer
 * @throws {Error} If M is not a positive integer (when provided)
 * @throws {Error} If k is not an integer
 * @throws {Error} If dtype is not supported
 * 
 * @see {@link https://numpy.org/doc/stable/reference/generated/numpy.eye.html | NumPy eye documentation}
 */
export function eye(
  N: number, 
  M?: number, 
  k = 0, 
  dtype: DTypes = DTypes.Float64Array
): Ndarray {
  // Validate N
  if (!Number.isInteger(N) || N <= 0) {
    throw new Error(`N must be a positive integer, got ${N}`);
  }
  
  // Set M to N if not provided (square matrix)
  const cols = M !== undefined ? M : N;
  
  // Validate M
  if (!Number.isInteger(cols) || cols <= 0) {
    throw new Error(`M must be a positive integer, got ${cols}`);
  }
  
  // Validate k
  if (!Number.isInteger(k)) {
    throw new Error(`k must be an integer, got ${k}`);
  }
  
  // Create the 2D array
  const shape = [N, cols];
  validateShape(shape);
  const arr = new Ndarray(shape, dtype);
  
  // Fill with zeros first, then set diagonal elements to 1
  forEachIndex(shape, (indices) => {
    const [i, j] = indices;
    
    // Check if this position is on the k-th diagonal
    // Main diagonal: i === j (k = 0)
    // Upper diagonal: j - i === k (k > 0)
    // Lower diagonal: i - j === -k (k < 0)
    const isOnDiagonal = (j - i) === k;
    
    arr.set(isOnDiagonal ? 1 : 0, i, j);
  });
  
  return arr;
}