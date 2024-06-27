import { ApiProperty } from "@nestjs/swagger";

export class ChangeImageDto {
    @ApiProperty({type: "string", format: "binary"})
    image: string;
}