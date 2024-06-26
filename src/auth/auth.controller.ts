import { BadRequestException, Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerRegisterBadRequest, swaggerRegisterSuccess } from './swagger/register.swagger';
import { swaggerLoginBadRequest, swaggerLoginSuccess } from './swagger/login.swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerRegisterSuccess)
    @ApiResponse(swaggerRegisterBadRequest)
    @ApiResponse(swaggerInternalError)
    @ApiTags("Auth")
    async register(@Body(ValidationPipe) body: RegisterDto) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        const {confirmPassword, ...userToRegister} = body;
        await this.authService.register(userToRegister);

        return "Check your email inbox to complete your registration process";
    }

    @Post("login")
    @ResponseMessage("Access granted")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerLoginSuccess)
    @ApiResponse(swaggerLoginBadRequest)
    @ApiResponse(swaggerInternalError)
    @ApiTags("Auth")
    async login(@Body(ValidationPipe) body: LoginDto) {
        return await this.authService.login(body.email, body.password);
    }
}
