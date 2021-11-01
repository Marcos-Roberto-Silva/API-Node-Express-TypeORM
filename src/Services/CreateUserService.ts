import { UserRepositories } from "../repositories/UserRepositories";
import { getCustomRepository} from "typeorm";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, password, email, admin = false }: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        if (!email) {
            throw new Error("Email is incorrect.");
        }

        const userAlreadyExists = await usersRepository.findOne({ email });

        const passwordHash = await hash(password, 8);
        if (userAlreadyExists) {
           throw new Error(`User ${name} already exists`);
        }

        const user = usersRepository.create({
         name,
         email,
         admin,
         password: passwordHash,
        });

        await usersRepository.save(user);

        return user;


    }
}

export { CreateUserService }