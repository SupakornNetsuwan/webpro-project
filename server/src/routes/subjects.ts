import express from "express";
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";

// Subject controller
import { getSubjects , createSubject } from "../controller/subjectController"

/**
 * @description จัดการเกี่ยวกับ Subject
 */

const router = express.Router()

router.get('/', checkJWTMiddleware, getSubjects)

router.post("/", checkJWTMiddleware, createSubject)

export default router