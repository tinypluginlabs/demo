export interface PromiseState<T> {
    isLoading: boolean;
    error: Error | null;
    data: T | null;
    isResolved: boolean;
}
export declare function usePromise<T>(promise: Promise<T>): PromiseState<T>;
