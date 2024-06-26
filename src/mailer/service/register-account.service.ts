import { renderFile } from "ejs";
import { join } from "path";
import { Injectable } from "@nestjs/common";

import { BaseMailer } from "./base-mailer.service";
import { AccountRegistratrion } from "../interface/account-registration.interface";

@Injectable()
export class RegisterAccountService extends BaseMailer<AccountRegistratrion> {
    protected getHtmlContent(content: AccountRegistratrion): Promise<string> {
        console.log(__dirname);
        return renderFile(
            join(__dirname, "../", "../", "../", "views", "register-account.ejs"), content
        );
    }

    async sendMail(content: AccountRegistratrion): Promise<void> {
        let htmlContent = await this.getHtmlContent(content);
        let transporter = this.createTransporter();
        let subject = "Verify email"

        await transporter.sendMail({
            from: this.configService.get("MAIL_ADDRESS"),
            to: content.email,
            subject: subject,
            html: htmlContent
        });
    }
}