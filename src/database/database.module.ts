import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Module({
    providers: [UserRepository],
    imports: [UserRepository]
})
export class DatabaseModule {}
