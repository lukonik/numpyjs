# NumPy.js

A TypeScript/JavaScript library for N-dimensional arrays with NumPy-compatible API. Built on top of JavaScript's TypedArrays for optimal performance.

[![npm version](https://badge.fury.io/js/@tony-builder%2Fnumpyjs.svg)](https://badge.fury.io/js/@tony-builder%2Fnumpyjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

## Features

- 🚀 **High Performance**: Built on TypedArrays for efficient memory usage and fast computations
- 📐 **N-Dimensional Arrays**: Full support for multi-dimensional arrays with arbitrary shapes
- 🧮 **NumPy API**: Familiar API for users coming from NumPy/Python
- 🔧 **TypeScript**: Full type safety with comprehensive TypeScript definitions
- 🎯 **Zero Dependencies**: Lightweight with no external dependencies
- ✅ **Well Tested**: Comprehensive test suite with 330+ tests

## Installation

```bash
npm install @tony-builder/numpyjs
```

```bash
yarn add @tony-builder/numpyjs
```

```bash
pnpm add @tony-builder/numpyjs
```

## Quick Start

```typescript
import { zeros, ones, full, eye, identity, empty, toArray, print, Ndarray, DTypes } from '@tony-builder/numpyjs';

// Create arrays filled with specific values
const zeroArray = zeros([3, 3]);           // 3×3 array of zeros
const onesArray = ones([2, 4]);            // 2×4 array of ones  
const fullArray = full([2, 3], 7.5);       // 2×3 array filled with 7.5
const emptyArray = empty([5, 5]);          // 5×5 uninitialized array

// Create identity and diagonal matrices
const I = identity(4);                     // 4×4 identity matrix
const diag = eye(3, 3, 1);                // 3×3 with ones on upper diagonal

// Work with different data types
const int32Array = zeros([10], DTypes.Int32Array);
const float32Array = ones([2, 3], DTypes.Float32Array);

// Access and modify elements
const arr = zeros([2, 3]);
arr.set(42, 1, 2);                        // Set value at position [1, 2]
console.log(arr.at(1, 2));               // Get value at position [1, 2] → 42

// Array properties
console.log(arr.shape);                   // [2, 3]
console.log(arr.size);                    // 6
console.log(arr.ndim);                    // 2
console.log(arr.dtype);                   // 'Float64Array'
console.log(arr.strides);                 // [3, 1]

// Convert to JavaScript arrays and print
const jsArray = toArray(arr);             // Convert to nested JS array
print(arr);                               // Pretty print to console
```

## API Reference

### Array Creation Functions

#### `zeros(shape, dtype?)`
Creates an array filled with zeros.

```typescript
const arr = zeros([2, 3]);                // 2×3 array of zeros
const arr32 = zeros([5], DTypes.Float32Array); // 1D float32 array
```

#### `ones(shape, dtype?)`
Creates an array filled with ones.

```typescript
const arr = ones([3, 2]);                 // 3×2 array of ones  
const intArr = ones([4, 4], DTypes.Int32Array); // 4×4 int32 array
```

#### `empty(shape, dtype?)`
Creates an uninitialized array (fastest creation).

```typescript
const arr = empty([1000, 1000]);          // Large uninitialized array
arr.set(3.14, 500, 500);                 // Set values as needed
```

#### `eye(N, M?, k?, dtype?)`
Creates a 2D array with ones on a diagonal.

```typescript
const I = eye(3);                         // 3×3 identity matrix
const upper = eye(4, 4, 1);               // 4×4 with ones on upper diagonal
const lower = eye(4, 4, -1);              // 4×4 with ones on lower diagonal
const rect = eye(3, 5);                   // 3×5 rectangular identity
```

#### `identity(n, dtype?)`
Creates a square identity matrix.

```typescript
const I = identity(5);                    // 5×5 identity matrix
const I32 = identity(3, DTypes.Int32Array); // 3×3 int32 identity
```

#### `full(shape, fillValue, dtype?)`
Creates an array filled with a specific value.

```typescript
const arr = full([2, 3], 7.5);           // 2×3 array filled with 7.5
const intArr = full([4], -1, DTypes.Int32Array); // 1D int32 array of -1s
const piArray = full([3, 3], Math.PI);   // 3×3 array filled with π
```

### Ndarray Class

#### Properties
- `shape: number[]` - Array dimensions
- `size: number` - Total number of elements
- `ndim: number` - Number of dimensions
- `dtype: DTypes` - Data type
- `strides: number[]` - Memory layout strides
- `buffer: ArrayBufferView` - Underlying TypedArray buffer

#### Methods
- `at(...indices: number[]): number` - Get element at indices
- `set(value: number, ...indices: number[]): void` - Set element at indices

### Array Manipulation Functions

#### `toArray(arr)`
Converts an n-dimensional array to a nested JavaScript array.

```typescript
const arr = full([2, 3], 42);
const jsArray = toArray(arr);             // [[42, 42, 42], [42, 42, 42]]

// Works with any dimensions
const arr3d = full([2, 1, 2], 1.5);
const nested = toArray(arr3d);            // [[[1.5, 1.5]], [[1.5, 1.5]]]
```

### Display Functions

#### `print(arr, options?)`
Prints an array to the console in a formatted way, similar to NumPy's print.

```typescript
const matrix = full([3, 3], Math.PI);
print(matrix);
// Output:
// [[3.141593 3.141593 3.141593]
//  [3.141593 3.141593 3.141593]
//  [3.141593 3.141593 3.141593]]

// Customize formatting
print(matrix, { precision: 2 });         // Show 2 decimal places
print(matrix, { threshold: 10 });        // Summarize if array > 10 elements
```

**Options:**
- `precision?: number` - Number of decimal places (default: 6)
- `suppressSmall?: boolean` - Suppress very small numbers (default: false)  
- `threshold?: number` - Total elements that trigger summarization (default: 1000)
- `edgeItems?: number` - Items shown at beginning/end when summarizing (default: 3)

### Supported Data Types

```typescript
enum DTypes {
  Int8Array = 'Int8Array',
  Uint8Array = 'Uint8Array',
  Uint8ClampedArray = 'Uint8ClampedArray',
  Int16Array = 'Int16Array',
  Uint16Array = 'Uint16Array', 
  Int32Array = 'Int32Array',
  Uint32Array = 'Uint32Array',
  Float32Array = 'Float32Array',
  Float64Array = 'Float64Array',        // Default
  Float16Array = 'Float16Array',        // Throws error (not supported)
}
```

## Examples

### Basic Array Operations

```typescript
import { zeros, ones, full, toArray, print, DTypes } from '@tony-builder/numpyjs';

// Create and manipulate 2D array
const matrix = zeros([3, 4], DTypes.Float32Array);

// Fill diagonal with ones
for (let i = 0; i < Math.min(3, 4); i++) {
  matrix.set(1, i, i);
}

// Access elements
console.log(matrix.at(0, 0)); // 1
console.log(matrix.at(0, 1)); // 0

// Convert to JavaScript array
const jsMatrix = toArray(matrix);
console.log(jsMatrix[0]); // [1, 0, 0, 0]

// Pretty print the matrix
print(matrix);
// Output:
// [[1 0 0 0]
//  [0 1 0 0] 
//  [0 0 1 0]]
```

### Working with Custom Fill Values

```typescript
import { full, print } from '@tony-builder/numpyjs';

// Create arrays with custom values
const temperatures = full([7], 23.5);     // Week of temperatures (°C)
const prices = full([3, 4], 9.99);        // 3×4 price matrix
const flags = full([10], -1, DTypes.Int8Array); // Array of flags

// Print with custom formatting
print(temperatures, { precision: 1 });   // [23.5 23.5 23.5 23.5 23.5 23.5 23.5]
print(prices, { precision: 2 });         // Show currency with 2 decimals
```

### Working with Different Shapes

```typescript
import { empty, ones, zeros } from '@tony-builder/numpyjs';

// 1D array
const vector = ones([5]);

// 2D array  
const matrix = ones([3, 3]);

// 3D array
const tensor = empty([2, 3, 4]);

// 4D array
const hyperTensor = zeros([2, 2, 2, 2]);
```

### Performance Considerations

```typescript
import { empty, zeros } from '@tony-builder/numpyjs';

// For best performance, use empty() when you'll initialize all values
const fastArray = empty([1000, 1000]);
// ... initialize values as needed

// Use zeros() when you need guaranteed zero initialization
const safeArray = zeros([1000, 1000]);
```

## Development

### Building

```bash
# Build the library
npx nx build numpyjs

# Run tests  
npx nx test numpyjs

# Lint code
npx nx lint numpyjs

# Type checking
npx nx typecheck numpyjs
```

### Project Structure

```
numpyjs/
├── src/
│   ├── lib/
│   │   ├── core/           # Core classes
│   │   │   ├── ndarray.ts  # Ndarray class
│   │   │   └── dtypes.ts   # Data type definitions
│   │   ├── operations/     # Array functions
│   │   │   ├── zeros.ts    # Array creation
│   │   │   ├── ones.ts
│   │   │   ├── empty.ts
│   │   │   ├── full.ts
│   │   │   ├── eye.ts
│   │   │   ├── identity.ts
│   │   │   ├── toArray.ts  # Array manipulation
│   │   │   ├── print.ts    # Display functions
│   │   │   └── astype.ts
│   │   └── utils/          # Utility functions
│   │       └── ndarray-utils.ts
│   └── index.ts           # Main entry point
└── dist/                  # Built output
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Make sure all tests pass (`npx nx test numpyjs`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Compatibility

- **Node.js**: 14.0.0 or higher
- **Browser**: All modern browsers with TypedArray support
- **TypeScript**: 4.0 or higher

## Roadmap

- [ ] Mathematical operations (add, subtract, multiply, divide)
- [ ] Broadcasting support
- [ ] Array slicing and indexing
- [ ] Reduction operations (sum, mean, max, min)
- [ ] Linear algebra operations
- [ ] FFT operations
- [ ] Random number generation
- [ ] File I/O operations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [NumPy](https://numpy.org/) - The fundamental package for scientific computing with Python
- Built with [Nx](https://nx.dev/) - Smart monorepos for JavaScript & TypeScript
- Powered by [TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) - Efficient binary data handling

## Related Projects

- [NumPy](https://numpy.org/) - The original Python library
- [NumJs](https://github.com/nicolaspanel/numjs) - Another JavaScript NumPy implementation
- [ML-Matrix](https://github.com/mljs/matrix) - Matrix operations for machine learning

---

⭐ **Star this repo if you find it useful!** ⭐