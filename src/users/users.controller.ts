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
import { swaggerChangePasswordBadRequest, swaggerChangePasswordSuccess } from './swagger/change-password.swagger';
import { swaggerChangeImageBadRequest, swaggerChangeImageSuccess } from "./swagger/change-image.swagger";
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { PersonalInfoDto } from './dto/personal-info.dto';
import { swaggerPersonalInfoBadRequest, swaggerPersonalInfoSuccess } from './swagger/personal-info.swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserRoles } from 'src/shared/decorators/user-roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(AuthGuard)
@UserRoles([Role.ADMIN, Role.READER])
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
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerChangePasswordSuccess)
    @ApiResponse(swaggerChangePasswordBadRequest)
    @ApiResponse(swaggerInternalError)
    async changePassword(@Req() request: Request, @Body(ValidationPipe) body: ChangePasswordDto) {
        if (body.newPassword !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        const existingUser = <User>request["user"];
        await this.usersService.changePassword(existingUser, body.newPassword, body.currentPassword);

        return "Password changed successfully";
    }

    @Post("personal")
    @HttpCode(200)
    @ApiTags("Users")
    @ApiBearerAuth()
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerPersonalInfoSuccess)
    @ApiResponse(swaggerPersonalInfoBadRequest)
    @ApiResponse(swaggerInternalError)
    async changePersonalInfo(@Req() request: Request, @Body(ValidationPipe) body: PersonalInfoDto) {
        const existingUser = <User>request["user"];
        await this.usersService.changePersonalInfo(existingUser, body.name, body.email);
        return "Changed personal info successfully";
    }
}
