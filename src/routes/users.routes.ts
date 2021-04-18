import {response, Router} from 'express';
import {parseISO} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from "../services/Appointments/CreateAppointmentService";
import {getCustomRepository} from "typeorm";
import CreateUsersService from "../services/User/CreateUsersService";

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
   try {
       const {name, email, password} = req.body;

       const userService =  new CreateUsersService();

       const user = await userService.execute({ name, email, password })

       return res.json(user);
   } catch(err) {
       return response.status(400).json(err.message);
   }
});


export default usersRouter;
