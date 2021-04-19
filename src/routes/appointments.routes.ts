import { response, Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from "../services/Appointments/CreateAppointmentService";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
    console.log(req.user)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    res.json(await appointmentsRepository.find());
})

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});


export default appointmentsRouter;
