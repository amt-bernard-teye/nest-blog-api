import { AccountStatus, Role } from "@prisma/client";

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    role: Role;
    accountStatus: AccountStatus;
};

export interface UserProp {
    id: boolean;
    name: boolean;
    image: boolean;
    email: boolean;
    role: boolean;
    accountStatus: boolean;
}