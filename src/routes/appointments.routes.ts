import {response, Router} from 'express';
import {parseISO} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from "../services/Appointments/CreateAppointmentService";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
    res.json(appointmentsRepository.getAll());
})


appointmentsRouter.post('/', (req, res) => {
   try {
       const {provider, date} = req.body;

       const parsedDate = parseISO(date);

       const createAppointment = new CreateAppointmentService(appointmentsRepository);

       const appointment = createAppointment.execute({ provider, date: parsedDate });

       return res.json(appointment);
   } catch(err) {
       return response.status(400).json(err.message);
   }
});


export default appointmentsRouter;
