import { Router } from 'express';

import AuthenticateUserService from '../services/Session/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({ email, password });

    const removeKey = (key: string, { [key]: _, ...rest }) => rest;

    const userWithoutPassword = removeKey('password', user);

    return res.json({ user: userWithoutPassword, token });
});


export default sessionsRouter;
