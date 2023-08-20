import { HttpRequest, IController } from './../protocols';
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import { CreateUserParams, IcreateUserRepository } from "./protocols";
import validator from 'validator';
import { badRequest, created, serverError } from '../helpers';


export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: IcreateUserRepository) { }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
        try {

            const requireFilds = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requireFilds) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return badRequest(`Field ${field} is required`);
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body!.email);

            if (!emailIsValid) {
                return badRequest("Email is invalid");
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!);

            return created<User>(user);

        } catch (error) {
            return serverError();
        }
    }

}