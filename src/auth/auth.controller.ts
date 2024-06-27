import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { swaggerForgotPasswordBadRequest, swaggerForgotPasswordSuccess } from './swagger/forgot-password.swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { swaggerResetPasswordSuccess } from './swagger/reset-password.swagger';
import { swaggerCheckEmailBadRequest, swaggerCheckEmailSuccess } from './swagger/check-email.swagger';

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
    @HttpCode(200)
    @ResponseMessage("Access granted")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerLoginSuccess)
    @ApiResponse(swaggerLoginBadRequest)
    @ApiResponse(swaggerInternalError)
    @ApiTags("Auth")
    async login(@Body(ValidationPipe) body: LoginDto) {
        return await this.authService.login(body.email, body.password);
    }

    @Post("forgot-password")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerForgotPasswordSuccess)
    @ApiResponse(swaggerForgotPasswordBadRequest)
    @ApiResponse(swaggerInternalError)
    async forgotPassword(@Body(ValidationPipe) body: ForgotPasswordDto) {
        await this.authService.requestPasswordChange(body.email);
        return "Check your email to complete your password reset process";
    }

    @Post("reset-password")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerResetPasswordSuccess)
    @ApiResponse(swaggerForgotPasswordBadRequest)
    @ApiResponse(swaggerInternalError)
    async resetPassword(@Body(ValidationPipe) body: ResetPasswordDto, @Query("token") token: string) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        await this.authService.resetPassword(token, body.password);
        return "Password changed, move to the login page to login";
    }

    @Get("check-email")
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerCheckEmailSuccess)
    @ApiResponse(swaggerCheckEmailBadRequest)
    @ApiResponse(swaggerInternalError)
    async checkIfEmailExist(@Query("email") email: string) {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new BadRequestException("Invalid email address");
        }

        await this.authService.checkIfEmailExist(email);
        return "Free to use";
    }
}
