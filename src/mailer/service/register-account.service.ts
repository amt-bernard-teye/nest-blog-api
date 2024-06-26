import { renderFile } from "ejs";
import { join } from "path";
import { Injectable } from "@nestjs/common";

import { BaseMailer } from "./base-mailer.service";
import { AccountRegistration } from "../interface/account-registration.interface";

@Injectable()
export class RegisterAccountService extends BaseMailer<AccountRegistration> {
    protected getHtmlContent(content: AccountRegistration): Promise<string> {
        return renderFile(
            join(__dirname, "../", "../", "../", "views", "register-account.ejs"), content
        );
    }

    async sendMail(content: AccountRegistration): Promise<void> {
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