import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { unlink } from "fs/promises";
import { hash, genSalt, compare } from 'bcryptjs';

import { UserRepository } from 'src/database/repository/user.repository';
import { User } from 'src/shared/interface/user.interface';

@Injectable()
export class UsersService {
    constructor(
        private userRepo: UserRepository
    ) { }

    async changeImage(user: User, filePath: string) {
        try {
            if (user.image) {
                await unlink(user.image);
            }

            user.image = filePath;
            await this.userRepo.update(user);
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async changePassword(user: User, newPassword: string, currentPassword: string) {
        const samePassword = await compare(currentPassword, user.password);

        if (!samePassword) {
            throw new BadRequestException("Current password doesn't match");
        }

        try {
            const salt = await genSalt(10);
            const hashedPassword = await hash(newPassword, salt);
            user.password = hashedPassword;
            await this.userRepo.update(user);
        }
        catch(erorr) {
            throw new InternalServerErrorException("Something went wrong");   
        }
    }

    async changePersonalInfo(user: User, name: string, email: string) {
        try {
            user.name = name;
            user.email = email;
            await this.userRepo.update(user);
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
