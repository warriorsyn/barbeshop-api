import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar')
    public provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    public provider: User;

    @Column('timestamp with time zone')
    public date: Date;

    @CreateDateColumn()
    public created_at: Date;

    @CreateDateColumn()
    public updated_at: Date;
}

export default Appointment;
