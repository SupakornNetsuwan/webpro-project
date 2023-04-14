import express, { Response, Request } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";
import getErrorMessage from "../lib/functions/getErrorMessage";

/**
 * @route /api/lessons/:postId
 * @param postId รหัสของ post ที่ต้องการดึงข้อมูล lessons
 * @method GET
 * @description ทำการดึงข้อมูล lessons ทั้งหมดที่อยู่ภายใต้ post นั้นๆ
 */

export const getAllLessonsFromPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId
        // ...
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
