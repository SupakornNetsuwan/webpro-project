import prisma from "../../../connection/prisma";

// อัปเดต Refresh token ของผู้ใช้
const updateUserRefreshToken = async (email: string, refresh_token: string) => {
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            refresh_token: refresh_token
        }
    })

    return true
}

export default updateUserRefreshToken