import { Injectable } from "@nestjs/common";
import { PrismaClient, Role } from "@prisma/client";

import { BaseRepository } from "./base.repository";
import { User, UserProp } from "src/shared/interface/user.interface";
import { ISingleFinder } from "../interface/single-finder.interface";

@Injectable()
export class UserRepository extends BaseRepository<User, UserProp> implements ISingleFinder<string, User> {
    selectProps(): UserProp {
        return {
            id: true,
            name: true,
            email: true,
            accountStatus: true,
            role: true
        };
    }

    private async generateId(preferredRole: Role, prisma: PrismaClient) {
        const total = await prisma.user.count({
            where: {
                role: preferredRole
            }
        });

        let initial = "";

        switch(preferredRole) {
            case Role.ADMIN:
                initial = "AD";
                break;
            case Role.READER:
                initial = "RD";
                break;
        }

        const generateId = initial += total + 1;
        return generateId;
    }

    async add(entity: User): Promise<User> {
        const prisma = this.open();
        const userId = await this.generateId(entity.role, prisma);

        const addedUser = await prisma.user.create({
            data: {
                name: entity.name,
                email: entity.email,
                password: entity.password,
                role: entity.role,
                accountStatus: entity.accountStatus,
                id: userId  
            },
            select: this.selectProps()
        });

        await this.close();
        return addedUser;
    }

    async update(entity: User): Promise<User> {
        const prisma = this.open();
        
        const updatedUser = await prisma.user.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name,
                email: entity.email,
                password: entity.password,
                accountStatus: entity.accountStatus
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedUser;
    }

    async find(entityId: string): Promise<User> {
        const prisma = this.open();

        const updatedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: entityId},
                    {id: entityId}
                ]
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedUser;
    }
}