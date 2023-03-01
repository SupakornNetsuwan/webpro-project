<template>
  <div>
    <content-wrapper>
      <button
        @click="($event) => $router.go(-1)"
        class="flex items-center cursor-pointer border-none bg-transparent pl-0"
      >
        <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
        <h4 class="text-red-primary">กลับ</h4>
      </button>
      <h1 className="text-black  mt-10">โพสต์ของคุณ</h1>
      <h4 className="text-gray-3">
        ทั้งหมดนี่คือโพสต์ที่คุณสร้างไว้ สามารถจัดการ แก้ไข ลบ โพสต์ได้
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div class="grid gap-5">
        <manage-post-card v-for="p in Posts" :key="p.id" :post="p" />
      </div>
    </content-wrapper>
  </div>
</template>

<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import ManagePostCard from "../components/ManagePostCard.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

export default {
  name: "myposts",
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    ManagePostCard,
  },
  data() {
    return {
      Posts: [
        {
          id: 1,
          imgSrc: "",
          title: "วิธีการเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที",
          createdDate: "22/2/2023",
          subject: "CAT",
          routeSrc: "/post/1",
          lesson: [
            {
              id: 1,
              order: 1,
              title: "ทำไมกาชาพูดมากจัง",
              createdDate: "23/2/2023",
            },
            {
              id: 2,
              order: 2,
              title: "หลักการทำงานของร่างกายกาชา",
              createdDate: "24/2/2023",
            },
          ],
        },
        {
          id: 2,
          imgSrc: "",
          title: "การทำออกแบบ Database อย่างง่าย",
          createdDate: "11/2/2023",
          subject: "Database",
          routeSrc: "/post/2",
          lesson: [
            {
              id: 1,
              order: 1,
              title: "มาเริ่มต้นออกแบบ Database กัน",
              createdDate: "12/2/2023",
            },
          ],
        },
      ],
    };
  },
  setup() {},
};
</script>
