import { Response, Request } from "express";
import jwt_decode from "jwt-decode"
import { GoogleUserPayload } from "../types/types";
import getErrorMessage from "../lib/functions/getErrorMessage"
import { createAccessToken, createRefreshToken } from "../lib/functions/jwt/encryptJWT"
import getUser from "../lib/functions/user/getUser"
import createUser from "../lib/functions/user/createUser"
import updateUserRefreshToken from "../lib/functions/user/updateUserRefreshToken"
import prisma from "../lib/connection/prisma"
import { User } from "@prisma/client";

/**
 * @route /api/auth/logout
 * @method POST
 * @description ทำการออกจากระบบ
 */

export const logout = async (req: Request, res: Response) => {
    const userDetails = res.locals.userDetails
    const { email } = userDetails
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            refresh_token: null
        }
    })

    //Clear cookie 
    res.cookie('refresh_token', null, { httpOnly: true, secure: true });
    res.cookie('jwt_token', null, { httpOnly: true, secure: true });

    res.send({
        status: 200,
        message: "Logout complete"
    })
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
        let newUser = false;

        if (user === null) {
            // สร้างผู้ใช้ใหม่
            newUser = true;
            user = await createUser({ email, picture, name, given_name, family_name }, { getRefreshToken: false });
        }

        const jwt_token = createAccessToken<User>(user) // create token from newUser data
        const refresh_token = createRefreshToken<User>(user) // create refresh token from newUser data
        const isUpdatedRefreshToken = await updateUserRefreshToken(user.email, refresh_token)

        if (!isUpdatedRefreshToken) {
            console.log("Cannot update refresh token")
        }

        //set header เก็บ token ลงไปใน Cookie
        res.cookie('refresh_token', refresh_token, { httpOnly: true, secure:true });
        res.cookie('jwt_token', jwt_token, { httpOnly: true, secure:true });

        res.json({
            status: 200,
            message: newUser ? "Welcome new user, login complete" : "Login complete",
            jwt_token: jwt_token,
            refresh_token: refresh_token,
            user: user
        })

        return;

    } catch (err) {
        /* Below was old style error checking */
        // let message = "Unknown error"
        // message = err instanceof Error ? err.message : String(err)

        // console.log(message)
        const message = getErrorMessage(err)

        if (message === "Invalid token specified: Cannot read properties of undefined (reading 'replace')") {
            res.status(403).send("Your token is not valid")
            return;
        }

        res.status(500).send("Some unknown error occured")
    }
}