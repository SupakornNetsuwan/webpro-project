import prisma from "../../connection/prisma";

/**
 * @description อัปเดต Refresh Token ของผู้ใช้ลงในฐานข้อมูล
 */
const updateUserRefreshToken = async (email: string, refresh_token: string) : Promise<boolean> => {
    try{
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                refresh_token: refresh_token
            }
        })
    
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export default updateUserRefreshToken