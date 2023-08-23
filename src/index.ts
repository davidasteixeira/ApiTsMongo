import express from 'express';
import 'dotenv/config';
import { MongoClient } from './database/mongo';
import users from './routes/users/users';

const main = async () => {
    const app = express()

    app.use(express.json());

    await MongoClient.connect()

    app.use('/users', users);

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`listening on port ${port}!`);
    });
}

main();