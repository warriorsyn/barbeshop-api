import {isEqual} from "date-fns";
import Appointment from "../models/appointment.model";
import {EntityRepository, Repository} from "typeorm";

interface CreateAppointmentDto {
    provider: string;
    date: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
