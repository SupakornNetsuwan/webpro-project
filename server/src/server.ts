import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from 'path'

/* routes */
import router from "./routes"

dotenv.config({});
const app = express();
app.use(cors({
    origin:'http://localhost:3000', 
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use("/api", router)

app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
    res.status(500).send(err.message || "มีข้อผิดพลาด")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})