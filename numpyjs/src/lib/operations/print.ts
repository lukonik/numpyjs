import { Ndarray } from '../core/ndarray.js';

/**
 * Print an array to the console in a formatted way.
 * 
 * @param arr - The Ndarray to print
 * @param options - Optional formatting options
 * @param options.precision - Number of decimal places for floating point numbers (default: 6)
 * @param options.suppressSmall - Suppress very small numbers (default: false)
 * @param options.threshold - Total number of array elements which trigger summarization (default: 1000)
 * @param options.edgeItems - Number of array items in summary at beginning and end (default: 3)
 * 
 * @example
 * ```typescript
 * import { full, ones, print, DTypes } from '@tony-builder/numpyjs';
 * 
 * // Print 1D array
 * const arr1d = full([5], 3.14159);
 * print(arr1d); 
 * // Output: [3.14159 3.14159 3.14159 3.14159 3.14159]
 * 
 * // Print 2D array
 * const arr2d = ones([3, 4], DTypes.Int32Array);
 * print(arr2d);
 * // Output: 
 * // [[1 1 1 1]
 * //  [1 1 1 1]
 * //  [1 1 1 1]]
 * 
 * // Print with custom precision
 * const arr = full([2, 2], Math.PI, DTypes.Float64Array);
 * print(arr, { precision: 2 });
 * // Output:
 * // [[3.14 3.14]
 * //  [3.14 3.14]]
 * ```
 * 
 * @see https://numpy.org/doc/stable/reference/generated/numpy.print.html
 */
export function print(
  arr: Ndarray, 
  options: {
    precision?: number;
    suppressSmall?: boolean;
    threshold?: number;
    edgeItems?: number;
  } = {}
): void {
  const {
    precision = 6,
    suppressSmall = false,
    threshold = 1000,
    edgeItems = 3
  } = options;

  const output = formatArray(arr, precision, suppressSmall, threshold, edgeItems);
  console.log(output);
}

function formatArray(
  arr: Ndarray, 
  precision: number, 
  suppressSmall: boolean, 
  threshold: number, 
  edgeItems: number
): string {
  if (arr.size === 0) {
    return formatEmptyArray(arr.shape);
  }

  if (arr.size > threshold) {
    return formatLargeArray(arr, precision, suppressSmall, edgeItems);
  }

  return formatFullArray(arr, precision, suppressSmall);
}

function formatEmptyArray(shape: number[]): string {
  // Handle different empty array cases
  if (shape.length === 1 && shape[0] === 0) {
    return '[]';
  }
  if (shape.length === 2 && shape[0] === 0 && shape[1] === 0) {
    return '[][]';
  }
  if (shape.some(dim => dim === 0)) {
    return '[]';
  }
  const brackets = '[]'.repeat(shape.length);
  return brackets;
}

function formatLargeArray(
  arr: Ndarray, 
  precision: number, 
  suppressSmall: boolean, 
  edgeItems: number
): string {
  // For large arrays, show summary with ... in the middle
  if (arr.ndim === 1) {
    const start = Array.from({ length: Math.min(edgeItems, arr.shape[0]) }, (_, i) => 
      formatNumber(arr.at(i) ?? 0, precision, suppressSmall)
    );
    const end = Array.from({ length: Math.min(edgeItems, arr.shape[0]) }, (_, i) => 
      formatNumber(arr.at(arr.shape[0] - edgeItems + i) ?? 0, precision, suppressSmall)
    );
    
    if (arr.shape[0] <= edgeItems * 2) {
      return `[${Array.from({ length: arr.shape[0] }, (_, i) => 
        formatNumber(arr.at(i) ?? 0, precision, suppressSmall)
      ).join(' ')}]`;
    }
    
    return `[${start.join(' ')} ... ${end.join(' ')}]`;
  }

  // For higher dimensions, use recursive formatting with summarization
  return formatFullArray(arr, precision, suppressSmall) + '\n(Large array - showing all elements)';
}

function formatFullArray(arr: Ndarray, precision: number, suppressSmall: boolean): string {
  if (arr.ndim === 0) {
    return formatNumber(arr.at() ?? 0, precision, suppressSmall);
  }

  if (arr.ndim === 1) {
    const elements = Array.from({ length: arr.shape[0] }, (_, i) => 
      formatNumber(arr.at(i) ?? 0, precision, suppressSmall)
    );
    return `[${elements.join(' ')}]`;
  }

  if (arr.ndim === 2) {
    const lines: string[] = [];
    for (let i = 0; i < arr.shape[0]; i++) {
      const elements = Array.from({ length: arr.shape[1] }, (_, j) => 
        formatNumber(arr.at(i, j) ?? 0, precision, suppressSmall)
      );
      lines.push(`[${elements.join(' ')}]`);
    }
    return `[${lines.join('\n ')}]`;
  }

  // For 3D and higher dimensions
  function formatNDArray(indices: number[], depth: number): string {
    if (depth === arr.ndim - 1) {
      // Last dimension - format as 1D array
      const elements = Array.from({ length: arr.shape[depth] }, (_, i) => 
        formatNumber(arr.at(...indices, i) ?? 0, precision, suppressSmall)
      );
      return `[${elements.join(' ')}]`;
    }

    if (depth === arr.ndim - 2) {
      // Second to last dimension - format as 2D array
      const lines: string[] = [];
      for (let i = 0; i < arr.shape[depth]; i++) {
        const elements = Array.from({ length: arr.shape[depth + 1] }, (_, j) => 
          formatNumber(arr.at(...indices, i, j) ?? 0, precision, suppressSmall)
        );
        lines.push(`[${elements.join(' ')}]`);
      }
      return `[${lines.join('\n  ')}]`;
    }

    // Higher dimensions
    const subArrays: string[] = [];
    for (let i = 0; i < arr.shape[depth]; i++) {
      const subArray = formatNDArray([...indices, i], depth + 1);
      subArrays.push(subArray);
    }

    // Calculate proper spacing based on depth
    const spacing = depth === 0 ? '\n\n\n ' : '\n\n' + ' '.repeat(depth + 1);
    return `[${subArrays.join(spacing)}]`;
  }

  return formatNDArray([], 0);
}

function formatNumber(value: number, precision: number, suppressSmall: boolean): string {
  if (suppressSmall && Math.abs(value) < Math.pow(10, -precision)) {
    return '0';
  }
  
  if (Number.isInteger(value)) {
    return value.toString();
  }
  
  if (!isFinite(value)) {
    return value.toString();
  }
  
  // Use fixed precision for consistent formatting
  const formatted = value.toFixed(precision);
  
  // Remove trailing zeros after decimal point
  return formatted.replace(/\.?0+$/, '') || '0';
}