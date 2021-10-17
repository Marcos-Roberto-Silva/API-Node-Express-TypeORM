import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import "reflect-metadata";
import {router} from './routes';

import dotenv from "dotenv";
dotenv.config();

import "./database" 
const {PORT} = process.env;

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
       return response.status(400).json({
           error: err.message
       });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server Error."
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});


