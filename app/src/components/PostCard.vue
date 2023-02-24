<template>
    <div class="flex flex-col w-96 bg-white border border-gray-2 rounded-md p-3">
        <img class="object-cover h-36 w-full rounded-md" src="../assets/kacha.jpg" />
        <div class="m-2">
            <div class="flex flex-row w-full"><h4 class="truncate">วิธีเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที</h4> <h4 class="text-red-primary">อ่าน</h4><ChevronRightIcon class="h-6 w-6 text-red-primary" /></div>
        <div><p class="text-gray-3">สร้างเมื่อวันที่ 12/2/2023</p></div>
        <div><SubjectTag /></div>
        </div>
    </div>
</template>

<script>
import SubjectTag from "../components/SubjectTag.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

export default {
    name: "postCard",
    components:{
        SubjectTag,
        ChevronRightIcon
    },
    data(){
        return {
            posts: [
                {
                    post_id: 1,
                    post_title: 'การทำ Encapsulation',
                    published_date: '12/2/2023',
                    subject: 'OOP'
                }
            ]
        }
    }
};
</script>