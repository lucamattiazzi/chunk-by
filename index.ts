export interface ConditionFn<T = any> {
  (chunk: T[], i: number, array: T[], chunksSize: number): boolean
}

type Condition<T = any> = ConditionFn<T> | number

function conditionIsNumber(condition: Condition): condition is number {
  return typeof condition === 'number'
}

function buildSmallerThan<T>(size: number): ConditionFn<T> {
  return chunk => chunk.length >= size
}

function getLast<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

function push<T = any>(array: T[], item: T): T[] {
  array.push(item)
  return array
}

export function chunkBy<T = any>(array: T[], condition: Condition<T>): T[][] {
  if (array === undefined) throw new Error('Missing array')
  if (condition === undefined) throw new Error('Missing condition')
  if (!array.length) return []
  if (conditionIsNumber(condition)) {
    const lengthCondition = buildSmallerThan<T>(condition)
    return chunkBy(array, lengthCondition)
  }
  const chunks = array.reduce<T[][]>((acc, item, idx) => {
    const lastChunk = getLast<T[]>(acc)
    if (!lastChunk) return push(acc, [item])
    const isValid = condition(lastChunk, idx, array, acc.length)
    if (isValid) return push(acc, [item])
    lastChunk.push(item)
    return acc
  }, [])
  return chunks
}
