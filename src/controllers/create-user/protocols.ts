import { User } from "../../models/user";

export interface CreateUserParams {
    firtName: string;
    lastName: string;
    email: string;
    password: string;
}


export interface IcreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}