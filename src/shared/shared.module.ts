import { Module } from "@nestjs/common";

import { MessageOnlyInterceptor } from "./interceptors/message-only.interceptor";
import { DataMessageInterceptor } from "./interceptors/data-message.interceptor";
import { DatabaseModule } from "src/database/database.module";
import { AuthGuard } from "./guard/auth.guard";

@Module({
    providers: [
        MessageOnlyInterceptor,
        DataMessageInterceptor,
        AuthGuard
    ],
    imports: [
        DatabaseModule
    ],
    exports: [
        AuthGuard,
        MessageOnlyInterceptor,
        DataMessageInterceptor,
    ]
})
export class SharedModule {}