import { Ndarray } from '../core/ndarray.js';
import { DTypes } from '../core/dtypes.js';
import { forEachIndex } from '../utils/ndarray-utils.js';

/**
 * Cast array to a specified type.
 * 
 * Creates a copy of the array cast to a new data type.
 * 
 * @param arr - Input Ndarray to cast
 * @param dtype - Target data type
 * @returns New Ndarray with specified data type
 * 
 * @example
 * ```typescript
 * import { ones, astype, DTypes } from '@tony-builder/numpyjs';
 * 
 * const arr = ones([2, 2], DTypes.Float64Array);
 * const intArr = astype(arr, DTypes.Int32Array);
 * console.log(intArr.dtype); // DTypes.Int32Array
 * ```
 * 
 * @see https://numpy.org/doc/stable/reference/generated/numpy.ndarray.astype.html
 */
export function astype(arr: Ndarray, dtype: DTypes): Ndarray {
  // Create new array with target dtype
  const newArray = new Ndarray(arr.shape, dtype);
  
  // Copy all values with type conversion
  forEachIndex(arr.shape, (indices) => {
    const value = arr.at(...indices);
    if (value !== undefined) {
      newArray.set(value, ...indices);
    }
  });
  
  return newArray;
}