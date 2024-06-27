import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
}
