import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const router = express.Router()

router.post('/create-post', async (req: Request, res: Response) => {
    //add new post

})