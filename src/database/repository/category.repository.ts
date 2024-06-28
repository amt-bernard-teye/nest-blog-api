import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Category, CategoryProp } from "src/shared/interface/category.interface";
import { Prisma, Status } from "@prisma/client";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { ISearchable } from "../interface/searchable.interface";

@Injectable()
export class CategoryRespository extends BaseRepository<Category, CategoryProp> 
    implements ISingleFinder<number | string, Category>, IMultipleFinder<Category>, ISearchable<Category> {
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

    async find (value: number | string): Promise<Category> {
        const prisma = this.open();

        const category = await prisma.category.findFirst({
            where: {
                OR: [
                    {id: +value},
                    {name: value.toString()}
                ],
                status: Status.ACTIVE
            },
            select: this.selectProps()
        });

        await this.close();
        return category;
    }

    async findAll(page: number, rows: number, sortBy: string): Promise<Category[]> {
        const prisma = this.open();
        const sort = this.createSortKind(sortBy);

        const categories = await prisma.category.findMany({
            skip: page * rows,
            take: rows,
            where: {
                status: Status.ACTIVE
            },
            orderBy: [ sort ],
            select: this.selectProps()
        });

        await this.close();
        return categories;
    }

    private createSortKind(sortBy: string) {
        const columns = ["id", "name"];
        const column = columns.find(value => value === sortBy);

        let sort = {};

        if (column === "id") {
            sort = {name: 'desc'};
        }
        else if (column === "name") {
            sort = {id: 'desc'};
        }

        return sort;
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const count = await prisma.category.count({
            where: {
                status: Status.ACTIVE
            }
        });

        await this.close();
        return count;
    }

    async search(value: string): Promise<Category[]> {
        const prisma = this.open();

        const categories = await prisma.category.findMany({
            where: {
                name: { 
                    contains: value, 
                    mode: "insensitive" 
                }
            },
            select: this.selectProps()
        });

        await this.close();
        return categories;
    }
}