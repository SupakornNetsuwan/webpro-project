import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

/* routes */
import router from "./routes"

dotenv.config({});
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})