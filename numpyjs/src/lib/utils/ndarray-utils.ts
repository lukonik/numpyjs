/**
 * Utility functions for working with N-dimensional arrays
 */

/**
 * Iterates over all possible index combinations in an N-dimensional array shape
 * and calls the provided callback function for each set of indices.
 * 
 * This is a generic utility for operations that need to visit every element
 * in a multi-dimensional array, such as filling arrays with values, 
 * applying transformations, or performing reductions.
 * 
 * @param shape - The shape of the N-dimensional array as an array of positive integers
 * @param callback - Function to call for each set of indices. Receives the complete indices array.
 * @param startDimension - Internal parameter for recursion (do not use directly)
 * @param currentIndices - Internal parameter for recursion (do not use directly)
 * 
 * @example
 * ```typescript
 * // Fill a 2x3 array with a specific value
 * forEachIndex([2, 3], (indices) => {
 *   console.log(`Setting value at [${indices.join(', ')}]`);
 *   // Output: [0,0], [0,1], [0,2], [1,0], [1,1], [1,2]
 * });
 * 
 * // Use with Ndarray
 * const arr = new Ndarray([2, 2], DTypes.Float32Array);
 * forEachIndex(arr.shape, (indices) => {
 *   arr.set(42, ...indices);
 * });
 * ```
 * 
 * @throws {Error} If shape is empty or contains non-positive integers
 */
export function forEachIndex(
  shape: readonly number[],
  callback: (indices: number[]) => void,
  startDimension = 0,
  currentIndices: number[] = new Array(shape.length)
): void {
  // Validation on first call
  if (startDimension === 0) {
    if (!Array.isArray(shape)) {
      throw new Error('Shape must be an array of numbers');
    }
    
    if (shape.length === 0) {
      throw new Error('Shape cannot be empty');
    }
    
    for (let i = 0; i < shape.length; i++) {
      if (!Number.isInteger(shape[i]) || shape[i] < 0) {
        throw new Error(`Shape values must be non-negative integers, got ${shape[i]} at index ${i}`);
      }
    }
    
    // Early return for zero-sized arrays
    if (shape.some(dim => dim === 0)) {
      return;
    }
  }
  
  // Base case: we have indices for all dimensions
  if (startDimension === shape.length) {
    callback([...currentIndices]); // Create a copy to avoid mutation
    return;
  }
  
  // Recursive case: iterate through current dimension
  for (let i = 0; i < shape[startDimension]; i++) {
    currentIndices[startDimension] = i;
    forEachIndex(shape, callback, startDimension + 1, currentIndices);
  }
}

/**
 * Calculates the total number of elements in an N-dimensional array
 * given its shape. This is equivalent to the product of all dimensions.
 * 
 * @param shape - The shape of the N-dimensional array
 * @returns The total number of elements (size) of the array
 * 
 * @example
 * ```typescript
 * calculateSize([2, 3, 4]); // Returns 24
 * calculateSize([5]);       // Returns 5
 * calculateSize([2, 0, 3]); // Returns 0 (zero-sized array)
 * ```
 */
export function calculateSize(shape: readonly number[]): number {
  return shape.reduce((acc, dim) => acc * dim, 1);
}

/**
 * Validates that a shape array contains only non-negative integers.
 * 
 * @param shape - The shape to validate
 * @throws {Error} If shape is invalid
 * 
 * @example
 * ```typescript
 * validateShape([2, 3, 4]); // OK
 * validateShape([2, -1]);   // Throws error
 * validateShape([2.5, 3]);  // Throws error
 * ```
 */
export function validateShape(shape: readonly number[]): void {
  if (!Array.isArray(shape)) {
    throw new Error('Shape must be an array of numbers');
  }
  
  if (shape.length === 0) {
    throw new Error('Shape cannot be empty');
  }
  
  for (let i = 0; i < shape.length; i++) {
    if (!Number.isInteger(shape[i]) || shape[i] < 0) {
      throw new Error(`Shape values must be non-negative integers, got ${shape[i]} at index ${i}`);
    }
  }
}