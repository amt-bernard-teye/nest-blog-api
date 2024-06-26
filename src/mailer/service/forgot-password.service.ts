import { Injectable } from "@nestjs/common";
import * as ejs from "ejs";
import { join } from "path";

import { BaseMailer } from "./base-mailer.service";
import { AccountRegistration } from "../interface/account-registration.interface";

@Injectable()
export class ForgotPasswordService extends BaseMailer<AccountRegistration> {
    protected getHtmlContent(content: AccountRegistration): Promise<string> {
        return ejs.renderFile(
            join(__dirname, "../", "../", "../", "views", "forgot-password.ejs"),
            content 
        );
    }

    async sendMail(content: AccountRegistration): Promise<void> {
        let htmlContent = await this.getHtmlContent(content) 
        let transporter = this.createTransporter();
        let subject = "Forgot password";

        await transporter.sendMail({
            from: this.configService.get("MAIL_ADDRESS"),
            to: content.email,
            html: htmlContent,
            subject
        });
    }
}