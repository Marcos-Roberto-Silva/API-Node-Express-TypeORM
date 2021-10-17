import { UserRepositories } from "../repositories/UserRepositories";
import { getCustomRepository} from "typeorm";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        if (!email) {
            throw new Error("Email is incorrect.");
        }

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (userAlreadyExists) {
           throw new Error(`User ${name} already exists`);
        }

        const user = usersRepository.create({
         name,
         email,
         admin,
        });

        await usersRepository.save(user);

        return user;


    }
}

export { CreateUserService }