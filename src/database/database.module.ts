import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CategoryRespository } from './repository/category.repository';

@Module({
    providers: [UserRepository, CategoryRespository],
    exports: [UserRepository, CategoryRespository]
})
export class DatabaseModule {}
