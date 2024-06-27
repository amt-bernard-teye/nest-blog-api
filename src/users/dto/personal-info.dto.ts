import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class PersonalInfoDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z ]+$/)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    email: string;
}