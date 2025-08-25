# NumPy.js

A TypeScript/JavaScript library for N-dimensional arrays with NumPy-compatible API. Built on top of JavaScript's TypedArrays for optimal performance.

[![npm version](https://badge.fury.io/js/numpyjs.svg)](https://badge.fury.io/js/numpyjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

## Features

- 🚀 **High Performance**: Built on TypedArrays for efficient memory usage and fast computations
- 📐 **N-Dimensional Arrays**: Full support for multi-dimensional arrays with arbitrary shapes
- 🧮 **NumPy API**: Familiar API for users coming from NumPy/Python
- 🔧 **TypeScript**: Full type safety with comprehensive TypeScript definitions
- 🎯 **Zero Dependencies**: Lightweight with no external dependencies
- ✅ **Well Tested**: Comprehensive test suite with 200+ tests

## Installation

```bash
npm install numpyjs
```

```bash
yarn add numpyjs
```

```bash
pnpm add numpyjs
```

## Quick Start

```typescript
import { zeros, ones, eye, identity, empty, Ndarray, DTypes } from 'numpyjs';

// Create arrays filled with specific values
const zeroArray = zeros([3, 3]);           // 3×3 array of zeros
const onesArray = ones([2, 4]);            // 2×4 array of ones
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
import { zeros, ones, DTypes } from 'numpyjs';

// Create and manipulate 2D array
const matrix = zeros([3, 4], DTypes.Float32Array);

// Fill diagonal with ones
for (let i = 0; i < Math.min(3, 4); i++) {
  matrix.set(1, i, i);
}

// Access elements
console.log(matrix.at(0, 0)); // 1
console.log(matrix.at(0, 1)); // 0
```

### Working with Different Shapes

```typescript
import { empty, ones } from 'numpyjs';

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
import { empty, zeros } from 'numpyjs';

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
│   │   ├── operations/     # Array creation functions
│   │   │   ├── zeros.ts
│   │   │   ├── ones.ts
│   │   │   ├── empty.ts
│   │   │   ├── eye.ts
│   │   │   └── identity.ts
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