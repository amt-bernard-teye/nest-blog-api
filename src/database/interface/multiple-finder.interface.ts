export interface MultipleFinder<Type> {
    findAll: (page: number, rows: number, sortBy: string) => Promise<Type[]>;
}