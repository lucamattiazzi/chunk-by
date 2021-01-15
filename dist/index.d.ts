export interface ConditionFn<T = any> {
    (chunk: T[], i: number, array: T[], chunksSize: number): boolean;
}
export declare function chunkBy<T = any>(array: T[], condition: number): T[][];
export declare function chunkBy<T = any>(array: T[], condition: ConditionFn<T>): T[][];
