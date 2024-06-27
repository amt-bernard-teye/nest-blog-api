import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";

export const imageValidator = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({maxSize: 1000000}),
        new FileTypeValidator({fileType: "image/*"})
    ]
});