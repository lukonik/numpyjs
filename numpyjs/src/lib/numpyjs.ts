export function numpyjs(): string {
  return 'numpyjs';
}

// Export core classes and types
export { Ndarray } from './core/ndarray.js';
export { DTypes } from './core/dtypes.js';

// Export operations
export * from './operations/index.js';
