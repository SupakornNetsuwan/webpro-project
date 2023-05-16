import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    await prisma.subject.createMany({
        data: [
            {
                subject_name: "Probstat",
                description: "วิชา Probstat คือวิชาที่เรียนเกี่ยวกับการคำนวณความน่าจะเป็น",
                instructor_name: "ดร. สุวิทย์ ภูมิฤทธิกุล",
            },{
                subject_name: "ISAD",
                description: "วิชา ISAD คือวิชาที่เรียนเกี่ยวกับการออกแบบระบบ",
                instructor_name: "ผศ.ดร. บุญประเสริฐ สุรักษ์รัตนสกุล",
            },{
                subject_name: "OOP",
                description: "วิชา OOP คือวิชาที่เรียนเกี่ยวกับการออกแบบโปรแกรม",
                instructor_name: "ผศ.ดร. ธราวิเชษฐ์ ธิติจรูญโรจน์",
            }
        ]
    })

    await prisma.user.create({
        data: {
            email: "64070089@kmitl.ac.th",
            created_date: new Date(),
            firstname: "Yolradee",
            lastname: "Prayoonpunratn",
            name: "Yolradee Prayoonpunratn",
            picture: "https://lh3.googleusercontent.com/a/AGNmyxbqu8F1mwVlu_s5mrZmG9-s9im0GWLcSXsmc9PC=s96-c",
            role: "USER"
        }
    })

    await prisma.post.createMany({
        data: [
            {
                post_title: "การแจกแจงของตัวอย่างสุ่ม",
                intro: "อธิบายเรื่องของการแจกแจงความน่าจะเป็นของตัวสถิติ มีหลากหลายหัวข้อย่อย ดูจาก lesson เอานะจ๊ะ",
                subject_name: "Probstat",
                author_email: "64070089@kmitl.ac.th"
            }, 
            {
                post_title: "การปลูกทุเรียนเบื้องต้น",
                intro: "หัวข้อในโพสต์นี้จะพูดถึงเรื่องปัจจัยในการปลูกทุเรียน สำหรับนำไปใช้ประกอบการทำไฟนอลโปรเจคของวิชา ISAD",
                subject_name: "ISAD",
                author_email: "64070089@kmitl.ac.th"
            }, 
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