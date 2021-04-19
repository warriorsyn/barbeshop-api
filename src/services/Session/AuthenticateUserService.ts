import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../../models/User";
import auth from "../../config/auth";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User,
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error("Email or password incorrect!");
        }

        const comparePassword = await compare(password, user.password);

        if (!comparePassword) {
            throw new Error("Email or password incorrect!");
        }

        const token = sign({ email: user.email, name: user.name }, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn
        });

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService;