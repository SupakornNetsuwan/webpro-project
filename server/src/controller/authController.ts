import { Response, Request } from "express";
import jwt_decode from "jwt-decode"
import { GoogleUserPayload } from "../types/types";
import getErrorMessage from "../lib/functions/getErrorMessage"
import { createAccessToken, createRefreshToken } from "../lib/functions/jwt/createJWT"
import getUser from "../lib/functions/user/getUser"
import createUser from "../lib/functions/user/createUser"
import updateUserRefreshToken from "../lib/functions/user/updateUserRefreshToken"
import { User } from "@prisma/client";
// connection
import prisma from "../lib/connection/prisma"
import redis from "../lib/connection/redis"

/**
 * @route /api/auth/logout
 * @method POST
 * @description ทำการออกจากระบบ
 */

export const logout = async (req: Request, res: Response) => {
    const userDetails = res.locals.userDetails
    const { email } = userDetails

    try {
        await redis.del(email) // delete refresh token from redis
        //Clear cookie 
        res.cookie('refresh_token', null, { httpOnly: false, secure: false });
        res.cookie('jwt_token', null, { httpOnly: false, secure: false });

        res.send({
            status: 200,
            message: "Logout complete"
        })
    } catch (err) {
        console.log(err, "Error: Cannot delete refresh token from redis 😭")
        return res.status(500).send("Logout incomplete")
    }
}

/**
 * @route /api/auth/login
 * @method POST
 * @description ทำการเข้าสู่ระบบ
 */

export const login = async (req: Request, res: Response) => {
    const { credential }: { credential: string } = req.body || null;

    try {
        // อ่าน Payload จาก Goole authen เพื่อนำ payload มาใช้ต่อ
        const decoded = jwt_decode<GoogleUserPayload>(credential.split(" ")[1]);
        const { email, picture, name, given_name, family_name }: GoogleUserPayload = decoded;

        let user = await getUser(email, { getRefreshToken: false });

        if (user === null) {
            // ถ้าหากเราทำการ getUser แล้วได้ null ก็คือไม่มีข้อมูลในระบบ ให้ทำการสร้างผู้ใช้ใหม่
            user = await createUser({ email, picture, name: name || "-", given_name: given_name || "-", family_name: family_name || "-" });
        }

        const jwt_token = createAccessToken<User>(user) // create token from newUser data
        const refresh_token = createRefreshToken<User>(user) // create refresh token from newUser data
        const isUpdatedRefreshToken = await updateUserRefreshToken(user.email, refresh_token)

        if (!isUpdatedRefreshToken) {
            console.log("Cannot update refresh token")
        }

        //set header เก็บ token ลงไปใน Cookie
        res.cookie('refresh_token', refresh_token, { httpOnly: false, secure: false });
        res.cookie('jwt_token', jwt_token, { httpOnly: false, secure: false });

        return res.json({
            status: 200,
            message: "Login successfully",
            jwt_token: jwt_token,
            refresh_token: refresh_token,
            user: user
        })

    } catch (err) {
        /* Below was old style error checking */
        // let message = "Unknown error"
        // message = err instanceof Error ? err.message : String(err)

        // console.log(message)
        const message = getErrorMessage(err)

        console.log(err);

        if (message === "Invalid token specified: Cannot read properties of undefined (reading 'replace')") {
            res.status(403).send("Your token is not valid")
            return;
        }

        res.status(500).send("Some unknown error occured")
    } finally {

    }
}