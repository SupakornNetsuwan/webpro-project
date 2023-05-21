import redis from "../../../lib/connection/redis";

/**
 * @description อัปเดต Refresh Token ของผู้ใช้ลงในฐานข้อมูล
 */

const updateUserRefreshToken = async (email: string, refresh_token: string): Promise<boolean> => {
    try {
        await redis.set(email, refresh_token)
        return true
    } catch (err) {
        console.log(err, "Error: Cannot update refresh token to redis (in updateUserRefreshToken func) 😭")
        return false
    }
}

export default updateUserRefreshToken