import express, { Response, Request, NextFunction } from "express";
import prisma from "../lib/connection/prisma"
import checkJWTMiddleware from "../lib/middlewares/jwt/checkJWTMiddleware";
import upload from "../lib/middlewares/multerMiddleware";

// From controllers
import { createPost, getPosts, getPost, deletePost, followPost, getFollowersAmount, getFollowingPosts, getFollowersStatistic, getMyPosts, getMyPostsAmount, editPost, unFollowPost } from "../controller/postController";

/**
 * @desciption จัดการเกี่ยวกับ Post
 */

const router = express.Router()

router.post('/', checkJWTMiddleware, upload.single('thumbnail'), createPost)

router.get('/', checkJWTMiddleware, getPosts)

router.get("/myposts", checkJWTMiddleware, getMyPosts)

router.get("/myposts-amount", checkJWTMiddleware, getMyPostsAmount)

// การติดตาม

router.get('/followers-amount', checkJWTMiddleware, getFollowersAmount)

router.get('/followers-statistic', checkJWTMiddleware, getFollowersStatistic)

router.get('/following', checkJWTMiddleware, getFollowingPosts)

router.post('/follow/:postId', checkJWTMiddleware, followPost)

router.delete('/follow/:postId', checkJWTMiddleware, unFollowPost)

// ลำดับของ route สำคัญเพราะมันอาจจะไปเข้า /:postId ได้

router.put('/:postId', checkJWTMiddleware, upload.single('thumbnail'), editPost)

router.get('/:postId', checkJWTMiddleware, getPost)

router.delete('/:postId', checkJWTMiddleware, deletePost)


export default router;