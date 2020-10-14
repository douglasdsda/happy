import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";

import "./database/connection";
import routes from  "./routes";
import errorHandle from  "./errors/handler";

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '..', 'tmp' ,'uploads')));
app.use(errorHandle);



app.listen(3333);
