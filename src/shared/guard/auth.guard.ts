import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import { UserRepository } from "src/database/repository/user.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private userRepo: UserRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = <Request>context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const [bearer, token] = authorization ? authorization.split(" ") : [];

        if (authorization === "" || bearer !== "Bearer") {
            throw new UnauthorizedException("Access denied");
        }

        try {
            const secretKey = this.configService.get("SECRET_KEY");
            const result = <{sub: string, exp: number, iat: number}>this.jwtService.verify(token, {secret: secretKey});
            const existingUser = await this.userRepo.find(result.sub);

            if (!existingUser) {
                throw new Error("User not found");
            }

            request["user"] = existingUser;
            return true;
        }
        catch(error) {
            throw new UnauthorizedException(error.message);
        }
    }
}