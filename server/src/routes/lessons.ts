import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";

// Lesson controller
import { getAllLessonsFromPost} from "../controller/lessonController"

/**
 * @description เกี่ยกับการจัดการของ Lesson
 */

const router = express.Router()

router.get('/:postId', checkJWTMiddleware, getAllLessonsFromPost)

export default router;