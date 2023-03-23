import express, { Response, Request } from "express";
import jwt_decode from "jwt-decode"
import { GoogleUserPayload } from "../types/types";
import prisma from "../lib/connection/prisma";
import getErrorMessage from "../lib/functions/getErrorMessage"
import { createAccessToken, createRefreshToken } from "../lib/jwt/encryptJWT"
import createUser from "../lib/functions/prisma/user/createUser"
import updateUserRefreshToken from "../lib/functions/prisma/user/updateUserRefreshToken"
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Oh, login is working now 🟢" })
})

app.post("/", async (req, res) => {
    const { credential }: { credential: string } = req.body || null;

    try {
        // อ่าน Payload จาก Goole authen เพื่อนำ payload มาใช้ต่อ
        const decoded = jwt_decode<GoogleUserPayload>(credential.split(" ")[1]);
        const { email, picture, name, given_name, family_name }: GoogleUserPayload = decoded;

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (user === null) {
            const newUser = await createUser(email, picture, name, given_name, family_name);
            const jwt_token = createAccessToken(newUser) // create token from newUser data
            const refresh_token = createRefreshToken(newUser) // create refresh token from newUser data
            await updateUserRefreshToken(newUser.email, refresh_token)

            //set header for refresh token
            res.cookie('refresh_token', refresh_token, { httpOnly: false });
            res.cookie('jwt_token', jwt_token, { httpOnly: false });

            res.json({
                status: 200,
                message: "New user login complete 🟢",
                jwt_token: jwt_token,
                refresh_token: refresh_token
            })

            return;
        }

        // Todo : make response on case that user isn't new one
        res.json({
            status: 200,
            credential: "..."
        })

    } catch (err) {
        /* Below was old style error checking */
        // let message = "Unknown error"
        // message = err instanceof Error ? err.message : String(err)

        // console.log(message)
        const message = getErrorMessage(err)

        console.log(message)

        if (message === "Invalid token specified: Cannot read properties of undefined (reading 'replace')") {
            res.status(400).send({ status: 403, message: "Your token is not valid" })
            return;
        }

        res.status(400).send("Some unknown error occured")
    }
})

export default app;