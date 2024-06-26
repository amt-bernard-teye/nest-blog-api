import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";

import { UserRepository } from 'src/database/repository/user.repository';
import { RegisteringUser } from './interface/registering-user.interface';
import { AccountStatus, Role } from '@prisma/client';
import { RegisterAccountService } from 'src/mailer/service/register-account.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/shared/interface/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private registerAccService: RegisterAccountService,
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    async register(userToRegister: RegisteringUser) {
        const existingUser = await this.userRepo.find(userToRegister.email);

        if (existingUser) {
            throw new BadRequestException("Email already exist");
        }

        try {
            const registeredUser = await this.registerUser(userToRegister);
            const token = this.createVerificationToken(registeredUser.id, registeredUser.email);
    
            await this.registerAccService.sendMail({
                email: registeredUser.email,
                name: registeredUser.name,
                token
            });
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    private async registerUser(userToRegister: RegisteringUser) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(userToRegister.password, salt);

        return await this.userRepo.add({
            role: Role.READER,
            name: userToRegister.name,
            email: userToRegister.email,
            accountStatus: AccountStatus.PENDING,
            password: hashedPassword
        });
    }

    private createVerificationToken(id: string, email: string) {
        const tokenExpiration = "3h";
        const secretKey = this.configService.get("SECRET_KEY");
        return this.jwtService.sign({
            sub: id,
            email: email
        }, {expiresIn: tokenExpiration, secret: secretKey}); 
    }

    async login(email: string, pass: string) {
        try {
            const existingUser = await this.userRepo.find(email);
            const hashedPassword = existingUser ? existingUser.password : "";
            const samePassword = await bcryptjs.compare(pass, hashedPassword);
    
            if (!existingUser || !samePassword) {
                throw new BadRequestException("Invalid login credentials");
            }

            const token = this.createLoginToken(existingUser);
            const {password, id, ...user} = existingUser;

            return { token, user }; 
        }
        catch(error) {
            console.log(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }

    private createLoginToken(user: User) {
        const secretKey = this.configService.get("SECRET_KEY");
        const accessTokenDuration = "15m";
        const accessToken = this.jwtService.sign({
            sub: user.id
        }, {expiresIn: accessTokenDuration, secret: secretKey});

        const refreshTokenDuration = "30d";
        const refreshToken = this.jwtService.sign({
            sub: user.id,
            email: user.email
        }, {expiresIn: refreshTokenDuration, secret: secretKey});

        return {accessToken, refreshToken};
    }
}
