import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import getErrorMessage from "../functions/getErrorMessage";
import refreshToken from "./refreshToken";

/* 
    ทำหน้าที่ในการตรวจสอบ JWT token ที่แนบมาใน header ว่าถูกต้องหรือไม่
    หากถูกต้อง ให้ส่งไปต่อไปใน route ต่อไป หากไม่ถูกต้อง ให้ส่ง Error กลับไป

    มีการทำ Refresh token อยู่ภายใน Function ให้เรียบร้อยแล้ว
*/
const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const { jwt_token, refresh_token }: { jwt_token: string, refresh_token: string } = req.cookies

    if (!jwt_token) return res.json({ status: 403, message: "No JWT token found in header's cookie" })

    jwt.verify(jwt_token.split(" ")[1], process.env.JWT_PRIVATEKEY as string, async (err, decoded) => {
        const message = getErrorMessage(err);

        // It's ok 🟢
        if (message === "null") {
            res.locals.userDetails = decoded;
            return next();
        }

        // Something wrong 🔴
        if (message === "jwt expired") {
            // Let's try refresh token
            try {
                const { jwt_token, new_refresh_token } = await refreshToken(refresh_token, res);
                //set header for refresh token , jwt token to new one
                res.cookie('refresh_token', new_refresh_token, { httpOnly: false });
                res.cookie('jwt_token', jwt_token, { httpOnly: false });

                res.locals.userDetails = decoded;

                console.log("Refreshed a token 🐕")
                return next();
            } catch (err) {
                // If can't use refresh token, we'll return error
                const message = getErrorMessage(err);
                return res.json({ status: 401, message: message });
            }
        }

        // Unknown error 🔴
        return res.json({ status: 400, message: message });
    })
}

export default checkJWT;