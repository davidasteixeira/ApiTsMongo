import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import express from 'express';
import 'dotenv/config';
import { GetUsercontroller } from './controllers/get-users/get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';


const main = async () => {
    const app = express()

    app.use(express.json());

    await MongoClient.connect()

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsercontroller(mongoGetUsersRepository);

        const { body, statusCode } = await getUsersController.handle();
        res.status(statusCode).send(body);
    });

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();

        const createUserController = new CreateUserController(mongoCreateUserRepository);

        const { body, statusCode } = await createUserController.handle({
            body: req.body,
        });

        res.status(statusCode).send(body);
    })

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`listening on port ${port}!`);
    });
}

main();