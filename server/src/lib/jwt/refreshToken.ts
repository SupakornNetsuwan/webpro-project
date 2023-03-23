import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import getUser from "../functions/prisma/user/getUser";
import { createAccessToken, createRefreshToken } from "./encryptJWT";
import updateUserRefreshToken from "../functions/prisma/user/updateUserRefreshToken";

/*
    สามารถ ตรวจสอบ Refresh token ที่แนบมาว่าเหมือนกันหรือไม่ โดยการเอา Refresh token ที่แนบมาไปเทียบกับ Refresh token ที่เก็บไว้ใน DB
    หากเหมือนกัน ให้สร้าง JWT token ใหม่ และ Refresh token ใหม่ และอัพเดท Refresh token ใหม่ลงใน DB
    หากไม่เหมือนกัน ให้ส่ง Error กลับไป
    
    ทีนี้เรา return เป็น Object เมือ่สำเร็จ
*/
const refreshToken = async (refresh_token: string, res: Response) => {

    // Decode refresh token to read email
    const decoded = jwt.verify(refresh_token.split(" ")[1], process.env.REFRESHTOKEN_PRIVATEKEY as string)

    // We'll look up for email in database
    const { email: lookingEmail } = decoded as User
    const user = await getUser(lookingEmail, { getRefreshToken: true });

    // IMPORTANT : Check if refresh token is valid
    if (refresh_token != user.refresh_token) {
        throw new Error("Refresh token is not valid, It's not the same one on database")
    }

    const jwt_token = createAccessToken(user) // create token from newUser data
    const new_refresh_token = createRefreshToken(user) // create refresh token from newUser data
    await updateUserRefreshToken(lookingEmail, new_refresh_token)

    return { jwt_token, new_refresh_token }
}

export default refreshToken