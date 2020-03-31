"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function conditionIsNumber(condition) {
    return typeof condition === 'number';
}
function buildSmallerThan(size) {
    return chunk => chunk.length >= size;
}
function getLast(array) {
    return array[array.length - 1];
}
function push(array, item) {
    array.push(item);
    return array;
}
function chunkBy(array, condition) {
    if (array === undefined)
        throw new Error('Missing array');
    if (condition === undefined)
        throw new Error('Missing condition');
    if (!array.length)
        return [];
    if (conditionIsNumber(condition)) {
        const lengthCondition = buildSmallerThan(condition);
        return chunkBy(array, lengthCondition);
    }
    const chunks = array.reduce((acc, item, idx) => {
        const lastChunk = getLast(acc);
        if (!lastChunk)
            return push(acc, [item]);
        const isValid = condition(lastChunk, idx, array, acc.length);
        if (isValid)
            return push(acc, [item]);
        lastChunk.push(item);
        return acc;
    }, []);
    return chunks;
}
exports.chunkBy = chunkBy;
//# sourceMappingURL=index.js.map