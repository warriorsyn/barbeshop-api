import {startOfHour} from "date-fns";
import Appointment from "../../models/appointment.model";
import AppointmentsRepository from "../../repositories/AppointmentsRepository";
import {getCustomRepository} from "typeorm";

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        if (await appointmentsRepository.findByDate(appointmentDate)) {
            throw Error('This appointment is already booked!' );
        }
        const appointment = await appointmentsRepository.create({provider_id, date: appointmentDate});

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}


export default  CreateAppointmentService;
