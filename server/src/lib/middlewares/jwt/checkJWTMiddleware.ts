import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import getErrorMessage from "../../functions/getErrorMessage";
import refreshToken from "../../functions/jwt/refreshToken";
import jwt_decode from "jwt-decode"

/**
 * 
 * @description ทำหน้าที่ในการตรวจสอบ JWT token ที่แนบมาใน header ว่าถูกต้องหรือไม่
    หากถูกต้อง ให้ส่งไปต่อไปใน route ต่อไป หากไม่ถูกต้อง ให้ส่ง Error กลับไป

    มีการทำ Refresh Token อยู่ภายใน Function ให้เรียบร้อยแล้ว
 */
const checkJWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { jwt_token, refresh_token }: { jwt_token: string, refresh_token: string } = req.cookies


    if (!jwt_token) return res.status(401).send("No token provided.")

    jwt.verify(jwt_token.split(" ")[1], process.env.JWT_PRIVATEKEY as string, async (err, decoded) => {
        const message = getErrorMessage(err);

        // It's ok 🟢
        if (message === "null") {
            console.log("Access token is valid 🟢", "เวลา :", new Date().toLocaleTimeString("th"));
            res.locals.userDetails = decoded;
            return next();
        }

        // Something wrong 🔴
        if (message === "jwt expired") {
            // หมดอายุ ก็ลองทำ Refresh ดู
            try {
                const newTokens = await refreshToken(refresh_token);
                const { jwt_token, new_refresh_token } = newTokens;

                // เปลี่ยน Access Token , Refresh Token เป็นอันใหม่
                res.cookie('refresh_token', new_refresh_token, { httpOnly: false, secure: false });
                res.cookie('jwt_token', jwt_token, { httpOnly: false, secure: false });
                
                // ทำการอ่านข้อมูลเพื่อเก็บใน res.locals.userDetails
                const decoded = jwt_decode(jwt_token.split(" ")[1]);
                res.locals.userDetails = decoded;

                console.log("Refreshed a token 🐕", "เวลา :", new Date().toLocaleTimeString("th"))
                return next();
            } catch (err) {
                // ถ้่าไม่สามารถ Refresh Token ได้ก็แสดงว่า invalid refresh_token
                const message = getErrorMessage(err);
                console.log(message, "Error: ไม่สามารถ Refresh token ได้ 😭");
                return res.status(401).send(message)
            }
        }
        
        // Unknown error 🔴
        return res.status(500).send(message)
    })
}

export default checkJWTMiddleware;