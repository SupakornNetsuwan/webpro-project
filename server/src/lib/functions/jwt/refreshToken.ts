import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import getUser from "../user/getUser";
import { createAccessToken, createRefreshToken } from "./createJWT"
import updateUserRefreshToken from "../user/updateUserRefreshToken"
import getUserRefreshToken from "../user/getUserRefreshToken";
/**
 * @description  สามารถ ตรวจสอบ Refresh token ที่แนบมาว่าเหมือนกันหรือไม่ โดยการเอา Refresh token ที่แนบมาไปเทียบกับ Refresh token ที่เก็บไว้ใน DB
    หากเหมือนกัน ให้สร้าง JWT token ใหม่ และ Refresh token ใหม่ และอัพเดท Refresh token ใหม่ลงใน DB
    หากไม่เหมือนกัน ให้ส่ง Error กลับไป
    
    ทีนี้เรา return เป็น Object เมื่อสำเร็จ
 */

const refreshToken = async (refresh_token: string): Promise<{ jwt_token: string, new_refresh_token: string }> => {
    // ถอดรหัส Refresh Token
    const decoded = jwt.verify(refresh_token.split(" ")[1], process.env.REFRESHTOKEN_PRIVATEKEY as string)
    const { email } = decoded as User
    
    // ไปหาข้อมูลผู้ใช้ใน DB
    const user = await getUser(email, { getRefreshToken: true });

    if (user == null) throw new Error("ไม่พบผู้ใช้งาน")

    // IMPORTANT : Check if refresh token is valid
    const storedRefreshToken = await getUserRefreshToken(email)


    if (refresh_token != storedRefreshToken) {
        console.log("====================================");
        console.log("token isn't the same in DB 🔴 เวลา :", new Date().toLocaleTimeString("th"));
        console.log("Token ของ user :", refresh_token);
        console.log("Token ใน DB :", storedRefreshToken);
        console.log("====================================");
        throw new Error("Refresh token is not valid, It's not the same one on database")
    }

    const jwt_token = createAccessToken(user) // create token from newUser data
    const new_refresh_token = createRefreshToken(user) // create refresh token from newUser data
    await updateUserRefreshToken(email, new_refresh_token)

    return { jwt_token, new_refresh_token }
}

export default refreshToken