import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { CategoryDto } from './dto/category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
    @Post()
    @ApiTags("Categories")
    async create(@Body() body: CategoryDto) {
        
    }
}
