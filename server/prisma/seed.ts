import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.subject.createMany({
        data: [
            {
                subject_name: "Probstat",
                description: "วิชา Probstat คือวิชาที่เรียนเกี่ยวกับการคำนวณความน่าจะเป็น",
                instructor_name: "ดร. xxxx",
            },{
                subject_name: "ISAD",
                description: "วิชา ISAD คือวิชาที่เรียนเกี่ยวกับการออกแบบระบบ",
                instructor_name: "ดร. yyyy",
            },{
                subject_name: "OOP",
                description: "วิชา OOP คือวิชาที่เรียนเกี่ยวกับการออกแบบโปรแกรม",
                instructor_name: "ดร. zzzz",
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })