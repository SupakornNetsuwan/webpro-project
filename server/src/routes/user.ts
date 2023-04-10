import express, { Response, Request } from "express";
import jwt_decode from "jwt-decode"
import { GoogleUserPayload } from "../types/types";
import getErrorMessage from "../lib/functions/getErrorMessage"
import { createAccessToken, createRefreshToken } from "../lib/jwt/encryptJWT"
import getUser from "../lib/functions/prisma/user/getUser"
import createUser from "../lib/functions/prisma/user/createUser"
import updateUserRefreshToken from "../lib/functions/prisma/user/updateUserRefreshToken"
import readJWT from "../lib/jwt/readJWT";
import prisma from "../lib/connection/prisma"

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Oh, login is working now 🟢" })
})

app.post("/logout", readJWT, async (req, res) => {
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

    //set header for refresh token
    res.cookie('refresh_token', null, { httpOnly: true });
    res.cookie('jwt_token', null, { httpOnly: true });

    res.send({
        status: 200,
        message: "Logout complete"
    })

})

app.post("/login", async (req, res) => {
    const { credential }: { credential: string } = req.body || null;
    try {
        // อ่าน Payload จาก Goole authen เพื่อนำ payload มาใช้ต่อ
        const decoded = jwt_decode<GoogleUserPayload>(credential.split(" ")[1]);
        const { email, picture, name, given_name, family_name }: GoogleUserPayload = decoded;

        let user = await getUser(email, { getRefreshToken: false });
        let newUser = false;

        if (user === null) {
            // Create new user
            newUser = true;
            user = await createUser(email, picture, name, given_name, family_name);
        }

        const jwt_token = createAccessToken(user) // create token from newUser data
        const refresh_token = createRefreshToken(user) // create refresh token from newUser data
        await updateUserRefreshToken(user.email, refresh_token)

        //set header for refresh token
        res.cookie('refresh_token', refresh_token, { httpOnly: true });
        res.cookie('jwt_token', jwt_token, { httpOnly: true });

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
            res.status(400).send({ status: 403, message: "Your token is not valid" })
            return;
        }

        res.status(400).send("Some unknown error occured")
    }
})

export default app;