import { Role } from "./role";

export class User {
    id: number | undefined;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    role!: Role;
    token!: string;
}