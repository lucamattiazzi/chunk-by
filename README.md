# Chunk By

A small function that chunks an array according to a specific function applied to each growing chunk. Whenever this function returns `true`, the chunk is completed and a new one is created.

As a condition it's also possible to use a number to create chunks of the same size.

e.g.

```ts
import { chunkBy } from 'chunkier'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const fn = chunk => {
  const sum = chunk.reduce((a, v) => a + v, 0)
  return sum % 3 === 0
}

const chunked = chunkBy(array, fn)
// [ [ 1, 2 ], [ 3 ], [ 4, 5 ], [ 6 ], [ 7, 8 ], [ 9 ] ]
```
