import redis from "../../../lib/connection/redis"

/**
 * @description ทำการดึงข้อมูล Refresh token ของผู้ใช้จาก Redis 
 * @param  `email` อีเมลผู้ใช้งาน
 * @param  `refresh_token` Refresh token ที่ผู้ใช้งานแนบมา
 * @returns `string | null` หากไม่พบข้อมูลใน Redis จะ return `null`
 */

const getUserRefreshToken = async (email: string): Promise<null | string> => {
    
    try {
        const refresh_token = await redis.get(email);
        return refresh_token;
    } catch (err) {
        console.log(err, "Error: Cannot get refresh token from redis 😭")
        return null;
    } 
}

export default getUserRefreshToken