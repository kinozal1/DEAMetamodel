export function mapToAny<T, V>(inputArray: T[]): V[] {
  return inputArray as unknown as V[];
}
