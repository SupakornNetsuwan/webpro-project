import express, { Response, Request } from "express";
import { Post, Prisma } from "@prisma/client";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";
import getErrorMessage from "../lib/functions/getErrorMessage";
import exp from "constants";

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

        if (!title || !intro || !authorEmail) {
            // ตรวจสอบว่าครบมั้ย
            return res.status(400).send("โปรดกรอกข้อมูลให้ครบถ้วน")
        }

        if (title.length < 5 || intro.length < 10) {
            return res.status(400).send("หัวข้อโพสต์ หรือเนื้อหาเกริ่นสั้นเกินไป")
        }

        //เช็คว่า subjectName เป็นวิชาที่มีอยู่ใน database มั้ย
        const hasSubject = await prisma.subject.findUnique({
            where: {
                subject_name: subjectName
            }
        })
        if (!hasSubject) {
            return res.status(400).send("ไม่พบวิชาที่เลือกในฐานข้อมูล")
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
                lessons: true,
                author: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
        })

        if (!searchedPost) return res.status(400).send("ไม่พบโพสต์ที่ต้องการ")

        res.json(searchedPost)

    } catch (err) {
        return res.status(500).send(getErrorMessage(err))
    }
}

/**
 * @route /api/posts/:postId
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
        const { email: userEmail, role } = res.locals.userDetails
        //ถ้าไม่มีไฟล์ให้เป็น {}
        const { filename, path } = req.file || {}

        if (!postId) return res.status(400).send("โปรดระบุ id ของโพสต์ที่ต้องการแก้ไช")

        if (role != "ADMIN") {
            //ตรวจสอบว่าเป็นเจ้าของโพสต์มั้ย โดยเช็คจากข้อมูลผู้เขียนของโพสต์นั้น ยกเว้นแอดมิน
            const postAuthor = await prisma.post.findUnique({
                where: {
                    post_id: postId,
                },
                select: {
                    author_email: true
                }
            })

            if (userEmail != postAuthor?.author_email) {
                return res.status(403).send("คุณไม่ใช่เจ้าของโพสต์")
            }
        }

        if (!title || !intro || !userEmail) {
            // ตรวจสอบว่าครบมั้ย
            return res.status(400).send("โปรดกรอกข้อมูลให้ครบถ้วน")
        }

        if (title.length < 5 || intro.length < 10) {
            return res.status(400).send("หัวข้อโพสต์ หรือเนื้อหาเกริ่นสั้นเกินไป")
        }

        //เช็คว่า subjectName เป็นวิชาที่มีอยู่ใน database มั้ย
        const hasSubject = await prisma.subject.findUnique({
            where: {
                subject_name: subjectName
            }
        })
        if (!hasSubject) {
            return res.status(400).send("ไม่พบวิชาที่เลือกในฐานข้อมูล")
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
        const { role, email: userEmail } = res.locals.userDetails;
        if (!postId) return res.status(400).send("โปรดระบุ id ของโพสต์ที่ต้องการลบ")


        if (role != "ADMIN") {
            const chosenPost = await prisma.post.findUnique({
                where: {
                    post_id: postId,
                }
            })

            if (chosenPost?.author_email != userEmail) {
                return res.status(503).send("คุณไม่ใช่เจ้าของโพสต์")
            }
        }

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

export const getFollowingPosts = async (req: Request, res: Response) => {
    //select post เฉพาะที่ user ติดตามเอาไว้
    const { email } = res.locals.userDetails

    const followPost = await prisma.followPost.findMany({
        where: {
            email: email
        },
        include: {
            post: true
        }
    })

    res.send(followPost)
}

/**
 * @route /api/posts/followers-statistic
 * @method GET
 * @description ทำการดึงข้อมูลสถิติผู้ติดตามย้อนหลังไป 7 วัน
 * @response
 * ```
 * {
 *  amount: number,
 *  roundedDate: date
 * }[]
 * ```
 */

export const getFollowersStatistic = async (req: Request, res: Response) => {
    const { userDetails: { email, role } } = res.locals;

    let statistic: { amount: bigint, roundedDate: Date }[] = [];
    try {
        if (role === "ADMIN") {
            // ถ้าเป็น Admin
            statistic = await prisma.$queryRaw`
                SELECT
                COUNT(fp.post_id) AS amount,
                CAST(fp.follow_date AS DATE) AS roundedDate FROM FollowPost fp
                JOIN Post p ON p.post_id = fp.post_id
                WHERE fp.follow_date >= DATE(NOW() - INTERVAL 6 DAY)
                GROUP BY roundedDate
            `
        } else {
            // User ทั่วไป
            statistic = await prisma.$queryRaw`
             SELECT
             COUNT(fp.post_id) AS amount,
             CAST(fp.follow_date AS DATE) AS roundedDate FROM FollowPost fp
             JOIN Post p ON p.post_id = fp.post_id
             WHERE fp.follow_date >= DATE(NOW() - INTERVAL 6 DAY)
             AND p.author_email = ${email}
             GROUP BY roundedDate
            `
        }

        res.send(statistic.map(record => ({
            ...record,
            amount: Number(record.amount)
        })))

    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
}
/**
 * @route /api/posts/followers-amount
 * @method GET
 * @description ทำการดึงจำนวนผู้ที่ติดตามเราอยู่
 */

export const getFollowersAmount = async (req: Request, res: Response) => {
    const { userDetails: { email, role } } = res.locals;

    try {
        let followersAmount = 0;
        if (role === "ADMIN") {
            // ถ้าเป็น Admin
            followersAmount = await prisma.followPost.count();
        } else {
            // User ทั่วไป
            followersAmount = await prisma.followPost.count({
                where: {
                    post: {
                        author_email: email
                    }
                }
            });
        }


        res.send(String(followersAmount))
    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                default:
                    return res.status(500).send("เกิดข้อผิดพลาดในระบบ")
            }
        }

        return res.status(500).send(getErrorMessage(err))
    }
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

        res.status(200).send("ติดตามโพสต์เรียบร้อย")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2002":
                    return res.status(400).send("คุณได้ติดตามโพสนี้ไว้แล้ว")
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
 * @route /api/posts/follow/:postId
 * @param postId รหัสของโพสต์ที่ต้องการติดตาม
 * @method DELETE
 * @description ผู้ใช้ทำการกดยกเลิกติดตามโพสต์ใหม่
 */

export const unFollowPost = async (req: Request, res: Response) => {
    //delete post_id and email to follow_post table when click follow button
    const postId = req.params.postId
    const { email } = res.locals.userDetails

    try {
        //ลบข้อมูลการติดตามโพส
        const unFollow = await prisma.followPost.delete({
            where: {
                email_post_id: {
                    email: email,
                    post_id: postId
                }
            }
        })

        res.send("ยกเลิกการติดตามโพสต์เรียบร้อย")

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case "P2025":
                    return res.status(400).send("ไม่พบการติดตามที่ต้องการยกเลิกติดตาม")
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