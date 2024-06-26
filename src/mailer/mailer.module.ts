import { Module } from '@nestjs/common';
import { RegisterAccountService } from './service/register-account.service';
import { ForgotPasswordService } from './service/forgot-password.service';

@Module({
    providers: [
        RegisterAccountService,
        ForgotPasswordService
    ],
    exports: [
        RegisterAccountService,
        ForgotPasswordService
    ]
})
export class MailerModule {}
