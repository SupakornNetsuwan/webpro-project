import prisma from "../../../connection/prisma";
import { User } from "@prisma/client";

interface GetUserOptionProps {
    getRefreshToken: boolean
}

/**
 * @description ดึงข้อมูลผู้ใช้ออกมาโดยที่เราจะสามารถเลือกได้ด้วยว่าจะเอา RefreshToken หรือไม่ที่ Parameter ตัวที่สอง
 */
const getUser = async (email: string, { getRefreshToken }: GetUserOptionProps): Promise<User> => {

    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            email: true,
            firstname: true,
            lastname: true,
            name: true,
            picture: true,
            role: true,
            createdAt: true,
            refresh_token: getRefreshToken ? true : false
        }
    }) as User

    return user
}

export default getUser;