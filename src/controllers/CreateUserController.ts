import { Request, Response } from "express";
import { CreateUserService } from "../Services/CreateUserService";

class CreateUserController {
    async handle(request : Request, response : Response) {
        const { name, password, email, admin } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, password, admin });  

        return response.status(201).json(user);
    }
}

export { CreateUserController };
