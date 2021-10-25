import {getCustomRepository} from "typeorm";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken'
import {UserRepositories} from "../repositories/UserRepositories";
import dotenv from "dotenv";
dotenv.config();

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password} : IAuthenticateRequest) {

        const {SECRET_KEY} = process.env;

        const userRepositories = getCustomRepository(UserRepositories);

        const user = await userRepositories.findOne({email});

        if (! user) {
            throw new Error('Email/password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (! passwordMatch) {
            throw new Error('Email/password incorrect');
        }

        const token = sign({
            email: user.email
        }, SECRET_KEY, {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    };
}

export {
    AuthenticateUserService
}
