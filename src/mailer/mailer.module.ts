import { Module } from '@nestjs/common';
import { RegisterAccountService } from './service/register-account.service';

@Module({
    providers: [
        RegisterAccountService,
    ],
    exports: [
        RegisterAccountService
    ]
})
export class MailerModule {}
