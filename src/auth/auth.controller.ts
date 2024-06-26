import { BadRequestException, Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    @UseInterceptors(MessageOnlyInterceptor)
    async register(@Body(ValidationPipe) body: RegisterDto) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        const {confirmPassword, ...userToRegister} = body;
        await this.authService.register(userToRegister);

        return "Check your email inbox to complete your registration process";
    }
}
