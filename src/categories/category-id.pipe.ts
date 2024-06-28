import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CategoryRespository } from "src/database/repository/category.repository";

@Injectable()
export class CategoryIdPipe implements PipeTransform<string, Promise<number>> {
    constructor(private categoryRepo: CategoryRespository) { }

    async transform(value: string, metadata: ArgumentMetadata) {
        if (isNaN(+value)) {
            throw new BadRequestException("Invalid value");
        }

        const existingCategory = await this.categoryRepo.find(+value);

        if (!existingCategory) {
            throw new BadRequestException("Category doesn't exist");
        }

        return existingCategory.id;
    }
}