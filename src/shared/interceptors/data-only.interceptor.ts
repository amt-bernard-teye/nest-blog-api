import { NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class DataOnlyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map(value => ({
                    data: value
                }))
            );
    }
} 