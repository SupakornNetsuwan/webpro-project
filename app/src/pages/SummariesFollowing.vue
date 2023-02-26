<template>
  <ContentWrapperVue>
    <div className="pb-4 md:pb-8 lg:pb-12">
      <h3 className="text-black">รวมโพสต์ที่ติดตาม</h3>
      <h5 className="text-gray-3">คุณสามารถเข้าถึงสรุปของแต่ละวิชาที่ติดตามได้จากที่นี่</h5>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
      <PostCard v-for="post in posts.concat(posts)" :postDetail="post" />
    </div>
  </ContentWrapperVue>
</template>
<script>
import ContentWrapperVue from "../components/ContentWrapper.vue";
import PostCard from "../components/PostCard.vue";

export default {
  name: "SummariesFollowing",
  components: {
    ContentWrapperVue,
    PostCard,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          imgSrc: "",
          title: "การจัดการ DOM ใน React",
          createdDate: "12/2/2023",
          subject: "Webpro",
          routeSrc: "/post/1",
        },
        {
          id: 2,
          imgSrc: "",
          title: "การทำออกแบบ Database อย่างง่าย",
          createdDate: "11/2/2023",
          subject: "Database",
          routeSrc: "/post/2",
        },
        {
          id: 3,
          imgSrc: "",
          title: "วิธีการใช้ @media only screen and (max-width)",
          createdDate: "10/2/2023",
          subject: "Multimedia",
          routeSrc: "/post/3",
        },
        {
          id: 4,
          imgSrc: "",
          title: "วิธีการเลี้ยงกะทิ",
          createdDate: "9/2/2023",
          subject: "Cat",
          routeSrc: "/post/4",
        },
        {
          id: 5,
          imgSrc: "",
          title: "วิธีการเลี้ยงกาชา",
          createdDate: "9/2/2023",
          subject: "Cat",
          routeSrc: "/post/5",
        },
      ],
    };
  },
};
</script>
