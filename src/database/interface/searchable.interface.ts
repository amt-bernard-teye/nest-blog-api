export interface ISearchable<Type> {
    search: (value: string) => Promise<Type[]>;
}