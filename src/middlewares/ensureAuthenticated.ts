import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request : Request, response : Response, next : NextFunction) {
    const {SECRET_KEY} = process.env;
    const authToken = request.headers.authorization;

    const [, token] = authToken.split(" ");

    if (!token) {
        response.status(401).end();
    }

    try {
        const { sub } = verify(token, SECRET_KEY) as IPayload;

        request.user_id = sub;
        
        return next();
    } catch (error) {
        return response.status(401).end();
    }

}
