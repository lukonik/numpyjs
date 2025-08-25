# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo workspace for building NumPy-like functionality in JavaScript/TypeScript. The main library is located in `numpyjs/` and implements n-dimensional arrays using JavaScript TypedArrays.

## Commands

### Building
- `npx nx build numpyjs` - Build the numpyjs library
- `npx nx run-many -t build` - Build all projects (used in release process)

### Testing
- `npx nx test numpyjs` - Run unit tests for the numpyjs library using Vitest
- Tests are located in `numpyjs/src/lib/numpyjs.spec.ts`

### Linting and Type Checking
- `npx nx lint numpyjs` - Run ESLint on the numpyjs project
- `npx nx typecheck numpyjs` - Run TypeScript type checking

### Development
- `npx nx graph` - Visualize the project dependency graph
- `npx nx sync` - Sync TypeScript project references
- `npx nx sync:check` - Verify TypeScript project references are correct (for CI)

### Release
- `npx nx release` - Version and release the library
- `npx nx release --dry-run` - Preview what would be released without actually releasing

## Architecture

### Core Structure
- **Main library**: `numpyjs/src/` contains the core implementation
- **Entry point**: `numpyjs/src/index.ts` exports from `lib/numpyjs.js`
- **Core classes**: 
  - `Ndarray` class in `numpyjs/src/lib/core/ndarray.ts` - Main n-dimensional array implementation
  - `DTypes` enum in `numpyjs/src/lib/core/dtypes.ts` - Data type definitions based on JavaScript TypedArrays

### Configuration Files
- **Nx configuration**: `nx.json` defines build targets and plugins
- **TypeScript**: Uses project references with `tsconfig.lib.json` for library code and `tsconfig.spec.json` for tests
- **Testing**: Vitest configuration in `numpyjs/vite.config.ts`
- **ESLint**: `eslint.config.mjs` for linting rules

### Build System
- Uses Nx with TypeScript and Vite plugins
- Automatic target inference for build, test, lint, and typecheck
- TypeScript project references are automatically maintained
- Library builds to `dist/` directory with both CommonJS and ES module support

### Testing Framework
- Vitest for unit testing with global test functions
- Coverage reports generated to `test-output/vitest/coverage/`
- Tests run in Node.js environment