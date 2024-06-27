import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class CategoryDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z ]+$/)
    @ApiProperty()
    name: string;
}