import { Module } from "@nestjs/common";
import { MessageOnlyInterceptor } from "./interceptors/message-only.interceptor";
import { DataMessageInterceptor } from "./interceptors/data-message.interceptor";

@Module({
    providers: [
        MessageOnlyInterceptor,
        DataMessageInterceptor
    ]
})
export class SharedModule {}