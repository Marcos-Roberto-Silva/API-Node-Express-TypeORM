import {getCustomRepository} from "typeorm";
import {ComplimentsRepositories} from "../repositories/ComplimentsRepositories";
import {UserRepositories} from "../repositories/UserRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        
        if (user_sender === user_receiver) {
            throw new Error("Incorrect user receiver");
        }

        const userRepositories = getCustomRepository(UserRepositories);

        
        const userReceiverExists = await userRepositories.findOne(user_receiver);
        
        if (! userReceiverExists) {
            throw new Error("User receiver does not exist.");
        }
        
        const compliment = complimentsRepositories.create({tag_id, user_sender, user_receiver, message});
        
        await complimentsRepositories.save(compliment);
        
        console.log("cheguei aqui.", compliment);

        console.log('Teste: ', compliment);
        

        return compliment;
    }
}

export {
    CreateComplimentService
};
