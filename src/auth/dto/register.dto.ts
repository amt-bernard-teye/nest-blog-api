import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string;
}