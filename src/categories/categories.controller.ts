import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
import { swaggerCreateAndEditCategoryBadRequest, swaggerCreateCategorySuccess } from './swagger/create-category.swagger';
import { swaggerUpdateCategorySuccess } from './swagger/update-category.swagger';
import { CategoryIdPipe } from './category-id.pipe';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerRemoveCategoryBadRequest, swaggerRemoveCategorySuccess } from './swagger/delete-category.swagger';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { swaggerSearchCategorySuccess } from './swagger/search-category.swagger';

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
    @ApiResponse(swaggerCreateAndEditCategoryBadRequest)
    async create(@Body() body: CategoryDto) {
        return await this.categoriesService.create(body.name);
    }

    @Put(":id")
    @UserRoles([Role.ADMIN])
    @UseGuards(AuthGuard)
    @ResponseMessage("Category updated successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiTags("Categories")
    @ApiBearerAuth()
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerUpdateCategorySuccess)
    @ApiResponse(swaggerCreateAndEditCategoryBadRequest)
    async update(
        @Param("id", CategoryIdPipe) id: number,
        @Body(ValidationPipe) body: CategoryDto
    ) {
        return await this.categoriesService.update(id, body.name);
    }

    @Delete(":id")
    @UserRoles([Role.ADMIN])
    @UseGuards(AuthGuard)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Categories")
    @ApiBearerAuth()
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerRemoveCategorySuccess)
    @ApiResponse(swaggerRemoveCategoryBadRequest)
    async delete(@Param("id", CategoryIdPipe) id: number) {
        await this.categoriesService.delete(id);
        return "Category removed successfully";
    }

    @Get("search")
    @ApiTags("Categories")
    @UseInterceptors(DataOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerSearchCategorySuccess)
    async search(@Query("q") data: string) {
        let categories = await this.categoriesService.search(data);
        return categories.slice(0, 10);
    }
}
