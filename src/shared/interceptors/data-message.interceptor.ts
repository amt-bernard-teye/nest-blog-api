import { Injectable } from "@nestjs/common";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, map } from "rxjs";
import { ResponseMessage } from "../decorators/response-message.decorator";

@Injectable()
export class DataMessageInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector){ }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const responseMessage = this.reflector.get(ResponseMessage, context.getHandler());

        return next.handle()
            .pipe(
                map(value => ({
                    message: responseMessage,
                    data: value
                }))
            );
    }   
}