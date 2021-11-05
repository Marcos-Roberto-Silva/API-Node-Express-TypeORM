import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

class ListUserReceiverComplimentsService {
    async execute(user_id: string){
        const complimentsRepositories = getCustomRepository(UserRepositories);
        const compliments = await complimentsRepositories.find({ 
            where: {
            user_receiver: user_id
            }
        })

        return compliments;
    }

}

export { ListUserReceiverComplimentsService }