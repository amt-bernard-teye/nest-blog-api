import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Category, CategoryProp } from "src/shared/interface/category.interface";
import { Status } from "@prisma/client";

@Injectable()
export class CategoryRespository extends BaseRepository<Category, CategoryProp> {
    selectProps(): CategoryProp {
        return {
            id: true,
            name: true
        }
    }

    async add(entity: Category): Promise<Category> {
        const prisma = this.open();

        const addedCategory = await prisma.category.create({
            data: {
                name: entity.name
            },
            select: this.selectProps()
        });

        await this.close();
        return addedCategory;
    }

    async update(entity: Category): Promise<Category> {
        const prisma = this.open();
        
        const updatedCategory = await prisma.category.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name,
                status: entity.status
            }
        });

        await this.close();
        return updatedCategory;
    }


    async delete(id: string | number): Promise<void> {
        const prisma = this.open();

        await prisma.category.update({
            where: {
                id: +id
            },
            data: {
                status: Status.HIDDEN
            }
        });

        await this.close();
    }

}