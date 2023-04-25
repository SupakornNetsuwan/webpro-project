import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";

// Lesson controller
import { getAllLessonsFromPost, getMyLessonsAmount, createLesson } from "../controller/lessonController"

/**
 * @description เกี่ยกับการจัดการของ Lesson
 */

const router = express.Router()

router.get("/mylessons-amount", checkJWTMiddleware, getMyLessonsAmount)

router.get('/:postId', checkJWTMiddleware, getAllLessonsFromPost)

router.post('/:postId', checkJWTMiddleware, createLesson)

export default router;