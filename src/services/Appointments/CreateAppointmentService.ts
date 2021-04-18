import {startOfHour} from "date-fns";
import Appointment from "../../models/appointment.model";
import AppointmentsRepository from "../../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

   constructor(private appointmentsRepository: AppointmentsRepository) {}

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        if (this.appointmentsRepository.findByDate(appointmentDate)) {
            throw Error('This appointment is already booked!' );
        }

        return this.appointmentsRepository.create({provider, date: appointmentDate});
    }
}


export default  CreateAppointmentService;
