import { BadRequestException, Body, Controller, HttpCode, Post, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { UsersService } from './users.service';
import { uploadImage } from './upload/image-upload';
import { ChangeImageDto } from './dto/change-image.dto';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { imageValidator } from 'src/shared/file-validators/image-validator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { User } from 'src/shared/interface/user.interface';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { swaggerChangePasswordBadRequest, swaggerChangePasswordSuccess } from './swagger/change-password.swagger';
import { swaggerChangeImageBadRequest, swaggerChangeImageSuccess } from "./swagger/change-image.swagger";
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Post("image")
    @ApiBearerAuth()
    @ApiTags("Users")
    @ApiResponse(swaggerChangeImageSuccess)
    @ApiResponse(swaggerChangeImageBadRequest)
    @ApiResponse(swaggerInternalError)
    @ApiConsumes("multipart/form-data")
    @ApiBody({type: ChangeImageDto})
    @UseInterceptors(FileInterceptor("image", uploadImage))
    @UseInterceptors(MessageOnlyInterceptor)
    @HttpCode(200)
    async changeImage(
        @Req() request: Request,
        @UploadedFile(imageValidator) file: Express.Multer.File
    ) {
        const existingUser = <User>request["user"];
        await this.usersService.changeImage(existingUser, file.path);
        return "Changed profile image successfully";
    }

    @Post("password")
    @HttpCode(200)
    @ApiTags("Users")
    @ApiBearerAuth()
    @ApiResponse(swaggerChangePasswordSuccess)
    @ApiResponse(swaggerChangePasswordBadRequest)
    @ApiResponse(swaggerInternalError)
    async changePassword(@Req() request: Request, @Body(ValidationPipe) body: ResetPasswordDto) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        const existingUser = <User>request["user"];
        await this.usersService.changePassword(existingUser, body.password);

        return "Password changed successfully";
    }
}
