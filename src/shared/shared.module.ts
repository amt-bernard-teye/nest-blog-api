import { Module } from "@nestjs/common";
import { MessageOnlyInterceptor } from "./interceptors/message-only.interceptor";

@Module({
    providers: [
        MessageOnlyInterceptor
    ]
})
export class SharedModule {}