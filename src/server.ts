import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';

import 'express-async-errors';

import './database';
import router from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';


const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
    });

});
app.listen(3333, () => console.log("Server running on port 3333"))
