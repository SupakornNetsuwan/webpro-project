<template>
    <div class="flex flex-col w-96 bg-white border border-solid border-gray-2 rounded-xl p-2 hover:border-red-primary">
        <img class="object-cover h-40 w-full rounded-lg" src="../assets/kacha.jpg" />
        <div class="m-2">
            <div class="flex flex-row w-full justify-between">
                <h4 class="truncate">วิธีเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที</h4>
                <div class="flex items-center">
                    <h4 class="text-red-primary">อ่าน</h4>
                    <ChevronRightIcon class="h-4 text-red-primary" />
                </div>
        </div>
        <p class="text-gray-3 published">สร้างเมื่อวันที่ 12/2/2023</p>
        <div class="mt-2"><SubjectTag /></div>
        </div>
    </div>
</template>

<script>
import SubjectTag from "../components/SubjectTag.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/solid";

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

<style>
    .published {
        font-weight: 400 !important;
    }
</style>