import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<Type, TypeProp> {
    private db: PrismaClient | undefined;

    open() {
        this.db = new PrismaClient();
        return this.db;
    }

    async close() {
        await this.db?.$disconnect();
        this.db = undefined;
    }

    abstract selectProps(): TypeProp;
    abstract add(entity: Type): Promise<Type>;
    abstract update(entity: Type): Promise<Type>;
    abstract delete(id: string | number): Promise<void>;
}