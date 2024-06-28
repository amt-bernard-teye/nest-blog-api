import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryRespository } from 'src/database/repository/category.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoryRepo: CategoryRespository) { }

    async findAll(page: number, rows: number, sortBy: string) {
        const data = await this.categoryRepo.findAll(page, rows, sortBy);
        const count = await this.categoryRepo.count();

        return {count, data};
    }

    async create(name: string) {
        try {
            return await this.categoryRepo.add({name});
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async update(id: number, name: string) {
        try {
            const existingCategory = await this.categoryRepo.find(id);
            existingCategory.name = name;
            
            return await this.categoryRepo.update(existingCategory);
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async findById(id: number) {
        try {
            return await this.categoryRepo.find(id);
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async delete(id: number) {
        try {
            await this.categoryRepo.delete(id);
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
