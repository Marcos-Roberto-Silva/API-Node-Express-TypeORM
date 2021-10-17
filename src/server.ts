import express from 'express';
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import "./database"

const {PORT} = process.env;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
