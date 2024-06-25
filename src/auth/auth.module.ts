import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule],
  providers: [AuthService]
})
export class AuthModule {}
