import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import express from 'express';
import 'dotenv/config';
import { GetUsercontroller } from './controllers/get-users/get-users';
import { MongoClient } from './database/mongo';


const main = async () => {
    const app = express()

    await MongoClient.connect()

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersCOntroller = new GetUsercontroller(mongoGetUsersRepository);

        const { body, statusCode } = await getUsersCOntroller.handle();
        res.send(body).status(statusCode);
    })

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`listening on port ${port}!`);
    });
}

main();