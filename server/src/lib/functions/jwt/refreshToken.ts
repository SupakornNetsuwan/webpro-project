import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import getUser from "../user/getUser";
import { createAccessToken, createRefreshToken } from "./createJWT"
import updateUserRefreshToken from "../user/updateUserRefreshToken"
import getUserRefreshToken from "../user/getUserRefreshToken";

/**
 * @description  สามารถ ตรวจสอบ Refresh token ที่แนบมาว่าเหมือนกันหรือไม่ โดยการเอา Refresh token ที่แนบมาไปเทียบกับ Refresh token ที่เก็บไว้ใน Redis
    หากเหมือนกัน ให้สร้าง JWT token ใหม่ และ Refresh token ใหม่ และอัพเดท Refresh token ใหม่ลงใน Redis
    หากไม่เหมือนกัน ให้ส่ง Error กลับไป

    @return เป็น Object ที่เป็น jwt_token และ new_refresh_token เมื่อสำเร็จ
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
        throw new Error("Refresh token ไม่ตรงกับกับใน Database")
    }

    // ถ้าหากทำการ refresh จะทำการ refresh ใหม่ทั้งสอง 2 tokens
    const jwt_token = createAccessToken(user) // create token from newUser data
    const new_refresh_token = createRefreshToken(user) // create refresh token from newUser data
    await updateUserRefreshToken(email, new_refresh_token)

    return { jwt_token, new_refresh_token }
}

export default refreshToken