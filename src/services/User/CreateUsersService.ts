import {getRepository} from "typeorm";
import User from "../../models/User";

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUsersService {
    public async execute({ email, name, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const userExists = await  usersRepository.findOne({ where: {email} });

        if (userExists) {
            throw new Error("This email is already in use!");
        }

        const user = usersRepository.create({
            name,
            email,
            password
        });

        await usersRepository.save(user);

        return user;
    }
}

export default  CreateUsersService;
