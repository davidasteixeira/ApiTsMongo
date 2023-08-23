import { Router } from "express";
import { MongoGetUsersRepository } from "../../repositories/get-users/mongo-get-users";
import { GetUsercontroller } from "../../controllers/get-users/get-users";
import { MongoCreateUserRepository } from "../../repositories/create-user/mongo-create-user";
import { CreateUserController } from "../../controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "../../repositories/update-user/mongo-update-user";
import { UpdateUserController } from "../../controllers/update-user/update-user";
import { MongoDeleteUserRepository } from "../../repositories/delete-user/mongo-delete-usert";
import { DeleteUserController } from "../../controllers/delete-user/delete-user";

const router = Router();


router.get('/', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsercontroller(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
});

router.post('/', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });

    res.status(statusCode).send(body);
});

router.patch('/:id', async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
        params: req.params
    });

    res.status(statusCode).send(body);
})

router.delete('/:id', async (req, res) => {
    const mongDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(mongDeleteUserRepository);

    const { body, statusCode } = await deleteUserController.handle({
        params: req.params
    });

    res.status(statusCode).send(body);
});

export default router;