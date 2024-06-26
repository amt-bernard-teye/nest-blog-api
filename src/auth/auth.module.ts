import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule, MailerModule],
  providers: [AuthService]
})
export class AuthModule {}
