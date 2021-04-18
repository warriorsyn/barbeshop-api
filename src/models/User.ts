import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar')
    public name: string;

    @Column('varchar')
    public email: string;

    @Column('varchar')
    public password: string;

    @CreateDateColumn()
    public created_at: Date;

    @CreateDateColumn()
    public updated_at: Date;
}

export default User;
