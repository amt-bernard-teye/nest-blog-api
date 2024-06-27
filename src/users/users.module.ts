import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule, MailerModule, SharedModule]
})
export class UsersModule {}
