import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;
}