import {isEqual} from "date-fns";
import Appointment from "../models/appointment.model";

interface CreateAppointmentDto {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public getAll(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const appointment = this.appointments.find(a => isEqual(date, a.date));

        return appointment || null;
    }

    public create({ provider, date }: CreateAppointmentDto): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
