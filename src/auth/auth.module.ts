import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule]
})
export class AuthModule {}
