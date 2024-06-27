import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

export const UserRoles = Reflector.createDecorator<Role[]>();