import { Status } from "@prisma/client";

export interface Category {
    id?: number;
    name: string;
    status?: Status
}

export interface CategoryProp {
    id: boolean;
    name: boolean;
}