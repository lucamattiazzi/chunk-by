import { chunkBy, ConditionFn } from '../index'

function identitrue(): true {
  return true
}

describe(chunkBy, () => {
  it('Should return an empty array from an empty array', () => {
    const array: number[] = []
    const chunked = chunkBy(array, identitrue)
    expect(chunked).toEqual([])
  })
  it('Should chunk in sized chunks if fn is number', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const size = 2
    const chunked = chunkBy(array, size)
    expect(chunked).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]])
  })
  it('Should chunk when condition is a function on numbers', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const conditionFn: ConditionFn<number> = (chunk: number[]) => {
      const sum = chunk.reduce((a, n) => a + n, 0)
      return sum >= 8
    }
    const chunked = chunkBy(array, conditionFn)
    expect(chunked).toEqual([[1, 2, 3, 4], [5, 6], [7, 8], [9]])
  })
  it('Should chunk when condition is a function that uses more than one param', () => {
    const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const conditionFn: ConditionFn<number> = (
      chunk: number[],
      idx: number,
      array: number[],
      chunksSize: number,
    ) => {
      return chunk.length >= chunksSize
    }
    const chunked = chunkBy(array, conditionFn)
    expect(chunked).toEqual([[1], [2, 3], [4, 5, 6], [7, 8, 9]])
  })
})
