export interface ConditionFn<T = any> {
    (chunk: T[], i: number, array: T[], chunksSize: number): boolean;
}
declare type Condition<T = any> = ConditionFn<T> | number;
export declare function chunkBy<T = any>(array: T[], condition: Condition<T>): T[][];
export {};
