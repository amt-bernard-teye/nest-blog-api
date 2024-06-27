import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { AuthGuard } from 'src/shared/guard/auth.guard';
import { CategoryDto } from './dto/category.dto';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { CategoriesService } from './categories.service';
import { UserRoles } from 'src/shared/decorators/user-roles.decorator';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerAllCategorySuccess } from './swagger/all-category.swagger';
import { swaggerCreateCategoryBadRequest, swaggerCreateCategorySuccess } from './swagger/create-category.swagger';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Get()
    @ApiTags("Categories")
    @ApiResponse(swaggerAllCategorySuccess)
    @ApiResponse(swaggerInternalError)
    async findAll(
        @Query("page") page: string,
        @Query("rows") rows: string,
        @Query("sortBy") sortBy: string
    ) {
        const parsedPage = page ? +page : 0;
        const parsedRows = rows ? +rows : 10;
        const parsedSort = sortBy ? sortBy.toString() : "";

        return await this.categoriesService.findAll(parsedPage, parsedRows, parsedSort);
    }

    @Post()
    @ApiTags("Categories")
    @ApiBearerAuth()
    @ResponseMessage("Category added successfully")
    @UseInterceptors(DataMessageInterceptor)
    @UserRoles([Role.ADMIN])
    @UseGuards(AuthGuard)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCreateCategorySuccess)
    @ApiResponse(swaggerCreateCategoryBadRequest)
    async create(@Body() body: CategoryDto) {
        return await this.categoriesService.create(body.name);
    }
}
