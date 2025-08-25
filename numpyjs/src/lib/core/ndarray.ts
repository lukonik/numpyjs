import { DTypes } from './dtypes.js';

export class Ndarray {
  private _shape: number[];
  private _type: DTypes;
  private _buffer: null | undefined | ArrayBufferView;
  private _offset: number;
  private _strides: number[];

  constructor(
    shape: number[],
    type: DTypes,
    buffer?: null | undefined | ArrayBufferView,
    offset = 0,
    strides?: number[]
  ) {
    this._shape = [...shape];
    this._type = type;
    this._offset = offset;
    
    if (strides) {
      this._strides = [...strides];
    } else {
      this._strides = this._calculateStrides(shape);
    }
    
    if (buffer) {
      this._buffer = buffer;
    } else {
      this._buffer = this._createBuffer();
    }
  }

  get shape(): number[] {
    return [...this._shape];
  }

  get dtype(): DTypes {
    return this._type;
  }

  get size(): number {
    return this._shape.reduce((acc, dim) => acc * dim, 1);
  }

  get ndim(): number {
    return this._shape.length;
  }

  get strides(): number[] {
    return [...this._strides];
  }

  get buffer(): ArrayBufferView | null | undefined {
    return this._buffer;
  }

  private _calculateStrides(shape: number[]): number[] {
    const strides = new Array(shape.length);
    let stride = 1;
    
    for (let i = shape.length - 1; i >= 0; i--) {
      strides[i] = stride;
      stride *= shape[i];
    }
    
    return strides;
  }

  private _createBuffer(): ArrayBufferView {
    const size = this.size;
    
    switch (this._type) {
      case DTypes.Int8Array:
        return new Int8Array(size);
      case DTypes.Uint8Array:
        return new Uint8Array(size);
      case DTypes.Uint8ClampedArray:
        return new Uint8ClampedArray(size);
      case DTypes.Int16Array:
        return new Int16Array(size);
      case DTypes.Uint16Array:
        return new Uint16Array(size);
      case DTypes.Int32Array:
        return new Int32Array(size);
      case DTypes.Uint32Array:
        return new Uint32Array(size);
      case DTypes.Float32Array:
        return new Float32Array(size);
      case DTypes.Float64Array:
        return new Float64Array(size);
      case DTypes.BigInt64Array:
        return new BigInt64Array(size);
      case DTypes.BigUint64Array:
        return new BigUint64Array(size);
      case DTypes.Float16Array:
        throw new Error('Float16Array not supported in this environment');
      default:
        throw new Error(`Unsupported dtype: ${this._type}`);
    }
  }

  at(...indices: number[]): number | bigint | undefined {
    if (indices.length !== this.ndim) {
      throw new Error(`Expected ${this.ndim} indices, got ${indices.length}`);
    }
    
    for (let i = 0; i < indices.length; i++) {
      if (indices[i] < 0 || indices[i] >= this._shape[i]) {
        throw new Error(`Index ${indices[i]} is out of bounds for dimension ${i} with size ${this._shape[i]}`);
      }
    }
    
    const offset = this._offset + indices.reduce((acc, idx, i) => acc + idx * this._strides[i], 0);
    return (this._buffer as ArrayBufferView & { [key: number]: number | bigint })?.[offset];
  }

  set(value: number | bigint, ...indices: number[]): void {
    if (indices.length !== this.ndim) {
      throw new Error(`Expected ${this.ndim} indices, got ${indices.length}`);
    }
    
    for (let i = 0; i < indices.length; i++) {
      if (indices[i] < 0 || indices[i] >= this._shape[i]) {
        throw new Error(`Index ${indices[i]} is out of bounds for dimension ${i} with size ${this._shape[i]}`);
      }
    }
    
    const offset = this._offset + indices.reduce((acc, idx, i) => acc + idx * this._strides[i], 0);
    if (this._buffer) {
      (this._buffer as ArrayBufferView & { [key: number]: number | bigint })[offset] = value;
    }
  }
}
