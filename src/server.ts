import 'reflect-metadata';
import express from 'express';

import './database';
import router from './routes';
import uploadConfig from './config/upload';


const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.listen(3333, () => console.log("Server running on port 3333"))
