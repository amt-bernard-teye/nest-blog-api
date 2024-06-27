export interface IMultipleFinder<Type> {
    findAll: (page: number, rows: number, sortBy: string) => Promise<Type[]>;
    count(): Promise<number>;
}