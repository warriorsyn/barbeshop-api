import { Router } from 'express';

import AuthenticateUserService from '../services/Session/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const { user, token } = await authenticateUserService.execute({ email, password });

        const removeKey = (key: string, { [key]: _, ...rest }) => rest;

        const userWithoutPassword = removeKey('password', user);

        return res.json({ user: userWithoutPassword, token });
    } catch (err) {
        return res.status(400).json(err.message);
    }
});


export default sessionsRouter;
