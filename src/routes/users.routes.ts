import { Router } from 'express';

import CreateUsersService from "../services/User/CreateUsersService";

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userService = new CreateUsersService();

        const user = await userService.execute({ name, email, password })

        const removeKey = (key: string, { [key]: _, ...rest }) => rest;

        const userWithoutPassword = removeKey('password', user);

        return res.json(userWithoutPassword);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});


export default usersRouter;
