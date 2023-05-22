import prisma from "../../connection/prisma";
import type { User } from "@prisma/client";
import getUserRefreshToken from "../user/getUserRefreshToken";

interface GetUserOptionProps {
    getRefreshToken: boolean
}

type UserWithRefreshToken = {
    refresh_token: string
} & User

/**
 * @description ดึงข้อมูลผู้ใช้ออกมาโดยที่เราจะสามารถเลือกได้ด้วยว่าจะเอา RefreshToken หรือไม่ที่ Parameter ตัวที่สอง
 */
const getUser = async (email: string, { getRefreshToken }: GetUserOptionProps): Promise<User | UserWithRefreshToken | null> => {

    /**
     * @example
     * ```
     *  {
            email : 'earthrockgame@gmail.com',
            firstname : 'Supakorn',
            lastname : 'Netsuwan',
            name : 'Supakorn Netsuwan',
            picture:  'https://lh3.googleusercontent.com/a/AGNmyxZpBELNVId5YcsShacTAXRmrkIrPU32i9i1hfAIhQ=s96-c',
            role : 'USER',
            created_date : 2023-04-15T08:46:40.149Z,
            refresh_token ?: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVhcnRocm9ja2dhbWVAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFpwQkVMTlZJZDVZY3NTaGFjVEFYUm1ya0lyUFUzMmk5aTFoZkFJaFE9czk2LWMiLCJuYW1lIjoiU3VwYWtvcm4gTmV0c3V3YW4iLCJmaXJzdG5hbWUiOiJTdXBha29ybiIsImxhc3RuYW1lIjoiTmV0c3V3YW4iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY4NDY2MDM3NCwiZXhwIjoxNjg0NzAzNTc0fQ.4-eOTVoZ87C8-7NdUKXqLaBMG3UZoIcelaGdQVcpTFU'
        }
        ```
     */

    let user = await prisma.user.findFirst({
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
            created_date: true,
        }
    }) as User

    // ต้องการ refresh token
    if (getRefreshToken && user) {
        const refresh_token = await getUserRefreshToken(user.email);
        user = { ...user, refresh_token: refresh_token } as UserWithRefreshToken
    }

    return user
}

export default getUser;