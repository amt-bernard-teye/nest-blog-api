import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string;
}