import { v4 } from "uuid";

class Appointment {
    public id: string;

    public provider: string;

    public date: Date;

    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = v4();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
