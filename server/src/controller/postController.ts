import express, { Response, Request } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";
import getErrorMessage from "../lib/functions/getErrorMessage";
import exp from "constants";
const path = require('path')

/**
 * @route /api/posts
 * @method POST
 * @description ส่งข้อมูลจาก Client มาสร้างโพสต์ใหม่
 * @payload
 * ```
 * {
 *  title: string,
 *  intro: string,
 *  subjectName: string,
 *  thumbnail: file
 * }
 * ```
 */

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, intro, subjectName } = req.body
        const { email: authorEmail } = res.locals.userDetails

        if (!title || !intro || !authorEmail || !subjectName) {
            // ตรวจสอบว่าครบมั้ย
            return res.status(400).send("โปรดกรอกข้อมูให้ครบถ้วน")
        }

        // file เป็น optional ดังนั้นต้องมีการตรวจสอบว่ามีไฟล์ไหม
        const { filename, path } = req.file || {}

        const createdPost = await prisma.post.create({
            data: {
                post_title: title,
                intro: intro,
                subject_name: subjectName,
                author_email: authorEmail,
                ...(filename && { post_img: process.env.SERVER_PUBLIC_URL + "/" + filename })
            }
        })

        res.status(200).send(createdPost)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2003":
                    return res.status(400).send("ไม่พบวิชาที่ต้องการ")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts
 * @method GET
 * @description ทำการดึง post ทั้งหมดที่มีอยู่
 */

export const getPosts = async (req: Request, res: Response) => {
    try {
        const subjectPost = await prisma.post.findMany()
        res.json(subjectPost)
    } catch (err) {
        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId
 * @method GET
 * @description ทำการดึง post เฉพาะที่ต้องการ ด้วย id ของโพสต์
 */

export const getPost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.postId
        //select post ที่มี id เท่านี้
        const searchedPost = await prisma.post.findUnique({
            where: { post_id: postId },
            include: {
                lessons: true
            }
        })

        if (!searchedPost) return res.status(400).send("ไม่พบโพสต์ที่ต้องการ")

        res.json(searchedPost)

    } catch (err) {
        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/edit-post/:postId
 * @method PUT
 * @description ส่งข้อมูลจาก Client มาแก้ไขโพสที่มีอยู่ ด้วย id ของโพสต์
 * @payload
 * ```
 * {
 *  title: string,
 *  intro: string,
 *  subjectName: string,
 *  thumbnail: file
 * }
 * ```
 */

export const editPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        const { title, intro, subjectName } = req.body
        const { email: userEmail } = res.locals.userDetails
        //ถ้าไม่มีไฟล์ให้เป็น {}
        const { filename, path } = req.file || {}

        if (!postId) return res.status(400).send("โปรดระบุ id ของโพสต์ที่ต้องการแก้ไช")

        //ตรวจสอบว่าเป็นเจ้าของโพสต์มั้ย โดยเช็คจากข้อมูลผู้เขียนของโพสต์นั้น
        const postAuthor = await prisma.post.findUnique({
            where: {
                post_id: postId,
            },
            select: {
                author_email: true
            }
        })
        if (userEmail != postAuthor?.author_email) {
            return res.status(400).send("คุณไม่ใช่เจ้าของโพสต์")
        }

        if (!title || !intro || !userEmail || !subjectName) {
            // ตรวจสอบว่าครบมั้ย
            return res.status(400).send("โปรดกรอกข้อมูลให้ครบถ้วน")
        }

        await prisma.post.update({
            where: {
                post_id: postId
            },
            data: {
                post_title: title,
                intro: intro,
                subject_name: subjectName,
                ...(filename && { post_img: process.env.SERVER_PUBLIC_URL + "/" + filename })
            }
        })

        res.send("แก้ไขโพสเรียบร้อย")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return res.status(400).send("ไม่พบโพสต์ที่ต้องการแก้ไข")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId
 * @method DELETE
 * @description ทำการลบ post ที่ต้องการ ด้วย id ของโพสต์
 */

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params
        if (!postId) return res.status(400).send("โปรดระบุ id ของโพสต์ที่ต้องการลบ")
        await prisma.post.delete({
            where: {
                post_id: postId
            }
        })

        res.send("ลบโพสต์สำเร็จ")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return res.status(400).send("ไม่พบโพสต์ที่ต้องการลบ")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}


/**
 * @route /api/posts/following
 * @method GET
 * @description ทำการดึง post เฉพาะที่ผู้ใช้ติดตามเอาไว้
 */

export const getFollowingPost = async (req: Request, res: Response) => {
    //select post เฉพาะที่ user ติดตามเอาไว้
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    //ต้องมีการ join กับตารางโพสต์ด้วย ลืมทำตรงนี้
    const followPost = await prisma.followPost.findMany({
        where: {
            email: email
        }
    })

    res.send(followPost)
}

/**
 * @route /api/posts/follow/:postId
 * @param postId รหัสของโพสต์ที่ต้องการติดตาม
 * @method POST
 * @description ผู้ใช้ทำการกดติดตามโพสต์ใหม่
 */

export const followPost = async (req: Request, res: Response) => {
    //insert post_id and email to follow_post table when click follow button
    const postId = req.params.postId
    const { email } = res.locals.userDetails

    try {
        //สร้างข้อมูลการติดตามโพสใหม่
        const newFollow = await prisma.followPost.create({
            data: {
                post_id: postId,
                email: email
            }
        })

        res.send("ติดตามโพสต์เรียบร้อย")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return res.status(400).send("ไม่พบโพสต์ที่ต้องการติดตาม")
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }

}

/**
 * @route /api/posts/myposts
 * @method GET
 * @description ดึงโพสต์ที่เป็นของตัวเองเท่านั้น
 */

export const getMyPosts = async (req: Request, res: Response) => {
    const { email, role } = res.locals.userDetails;

    if (role === "ADMIN") {
        // Admin เข้าถึงได้ทุก post
        const allPosts = await prisma.post.findMany({
            include: {
                lessons: true
            }
        })
        return res.send(allPosts)
    }


    const myPosts = await prisma.post.findMany({
        where: {
            author_email: email
        },
        include: {
            lessons: true
        }
    })

    res.send(myPosts)
}


/**
 * @route /api/posts/myposts-amount
 * @method GET
 * @description ดึงจำนวนโพสต์ที่เป็นของตัวเองเท่านั้น
 */

export const getMyPostsAmount = async (req: Request, res: Response) => {
    const { email, role } = res.locals.userDetails;

    if (role === "ADMIN") {
        // Admin เข้าถึงได้ทุก post
        const allPostsAmount = await prisma.post.count()

        return res.send(allPostsAmount.toString())
    }

    const myPostsAmount = await prisma.post.count({
        where: {
            author_email: email
        }
    })

    res.send(myPostsAmount.toString())
}