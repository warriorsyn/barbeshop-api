import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUsersService from "../services/User/CreateUsersService";
import UpdateUserAvatarService from '../services/User/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

const removeKey = (key: string, { [key]: _, ...rest }) => rest;

usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userService = new CreateUsersService();

        const user = await userService.execute({ name, email, password })

        const userWithoutPassword = removeKey('password', user);

        return res.json(userWithoutPassword);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('file'), async (req, res) => {

    try {
        const updateUserAvatarService = new UpdateUserAvatarService();

        const user = await updateUserAvatarService.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename
        });

        const userWithoutPassword = removeKey('password', user);

        return res.json(userWithoutPassword);
    } catch (err) {
        return res.status(400).json(err.message)
    }
});


export default usersRouter;
