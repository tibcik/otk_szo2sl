import { AppDataSource } from "./data-source"
import express from 'express'
import { getRouter } from "./routes";
import initializeDatabase from "./init-data";

AppDataSource.initialize().then(async () => {
    const app = express();

    const fileUpload = require('express-fileupload');

    app.use(express.json());
    app.use(fileUpload());

    app.use('/api', getRouter());
    app.listen(3000, async () => {
        if(process.env.TS_NODE_DEV) {
            await initializeDatabase();
        }

        console.log("Listening...");
    })


}).catch(error => console.log(error));
