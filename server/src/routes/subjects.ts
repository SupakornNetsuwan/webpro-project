import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware"

// Subject controller
import { getSubjects , createSubject } from "../controller/subjectController"

/**
 * @description จัดการเกี่ยวกับ Subject
 */

const router = express.Router()

router.get('/', checkJWTMiddleware, getSubjects)

router.post("/", checkJWTMiddleware, upload.none(), createSubject)

export default router