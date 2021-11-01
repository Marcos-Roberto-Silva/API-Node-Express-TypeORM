import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function ensureAuthenticated(request : Request, response : Response, next : NextFunction) {
    const {SECRET_KEY} = process.env;
    const authToken = request.headers.authorization;

    const [,token] = authToken.split(" ");
    
    if (!token) {
        response.status(401).end();
    }

    const myToken = verify(token, SECRET_KEY);

    return next();
}
