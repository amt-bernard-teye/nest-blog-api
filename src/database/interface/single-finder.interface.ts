export interface ISingleFinder<TypeId, Type> {
    find: (entityId: TypeId) => Promise<Type>;
}