import express, { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const router = express.Router()

router.get('/home',async (req: Request, res: Response) => {
    //select post to show, leatest, recommend
})

router.get('/summaries',async (req: Request, res: Response) => {
    //select all post
})

router.post('/summaries',async (req: Request, res: Response) => {
    //req - filter วิชา , search โพสต์ได้
    const subject = req.body.selectedSubject
})

router.get('/summaries/following',async (req: Request, res: Response) => {
    //select post เฉพาะที่ติดตามเอาไว้
})

router.get('/post/:id', async (req: Request, res: Response) => {
    const postId = parseInt(req.params.id)
    //select post ที่มี id เท่านี้
    const post = await prisma.post.findUnique({
        where: {post_id: postId}
    })
})
