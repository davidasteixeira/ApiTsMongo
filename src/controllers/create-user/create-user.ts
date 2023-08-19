import { HttpRequest } from './../protocols';
import { User } from "../../models/user";
import { HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, IcreateUserRepository } from "./protocols";
import validator from 'validator';


export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: IcreateUserRepository) { }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {

            const requireFilds = ['firstName', 'lastName', 'email', 'password'];

            for (const field of requireFilds) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`,
                    }
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body!.email);

            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: `Email is invalid`,
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body!);

            return {
                statusCode: 201,
                body: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong."
            }
        }
    }

}