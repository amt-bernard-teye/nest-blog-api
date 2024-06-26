import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";

@Injectable()
export abstract class BaseMailer<Type> {
    constructor(protected configService: ConfigService) { }

    protected createTransporter() {
        return createTransport({
            secure: true,
            host: this.configService.get("MAIL_HOST"),
            port: +this.configService.get("MAIL_PORT"),
            auth: {
                user: this.configService.get("MAIL_ADDRESS"),
                pass: this.configService.get("MAIL_PASSWORD")
            }
        });
    }

    protected abstract getHtmlContent(content: Type): Promise<string>;
    abstract sendMail(content: Type): Promise<void>;
}