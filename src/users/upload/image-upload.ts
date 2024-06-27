import { join } from "path";
import { diskStorage } from "multer";

export const uploadImage = {
    storage: diskStorage({
        destination(req, file, callback) {
            const imagePath = join(__dirname, "..", "..", "..", "uploads", "users");
            callback(null, imagePath);
        },
        filename(req, file, callback) {
            callback(null, file.originalname);
        },
    })
};