<template>
  <div class="bg-gray-1">
    <content-wrapper>
      <div class="flex justify-between">
        <div class="flex items-center">
          <ChevronLeftIcon class="h-4 text-red-primary" />
          <h4 class="text-red-primary">กลับ</h4>
        </div>
        <button
          class="border-solid border-blue-primary bg-white text-blue-primary flex items-center"
        >
          <PlusIcon class="h-6" />
          <h4>ติดตาม</h4>
        </button>
      </div>
      <div class="flex justify-between mt-10">
        <h1>วิธีการเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที</h1>
        <subject-tag :subject="cat" />
      </div>
      <div class="flex my-2">
        <p>โดย Yolradee Prayoonpunratn</p>
        <p class="text-gray-3">• 64070089@kmitl.ac.th • 22/2/2023</p>
      </div>
      <img class="w-full h-96 object-cover my-5" src="../assets/kacha.jpg" />
      <p class="text-gray-4" style="font-weight: 400 !important">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur harum
        sint iusto odit, impedit sit molestias, facere veniam nisi suscipit
        vitae voluptates delectus accusantium asperiores ducimus neque possimus
        optio cum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Cumque veritatis est, debitis cupiditate eligendi eum consequuntur
        voluptate eaque pariatur dolore fugiat illo animi eos! Aut cupiditate
        alias blanditiis necessitatibus obcaecati.
      </p>
      <hr class="my-12 text-gray-2" />
      <h2>บทเรียนต่างๆ</h2>
      <h4 class="text-gray-4 mb-5">
        บทเรียนคือเนื้อหาที่อยู่ภายใต้โพสต์วิชาในแต่ละวิชาที่ถูกสร้างขึ้นโดยผู้เขียนโพสต์นั้นๆ
      </h4>
      <div class="flex flex-col">
        <LessonCard
          class="my-2"
          :lessonDetail="ls"
          :key="ls.id"
          v-for="ls in lesson"
        />
      </div>
    </content-wrapper>
    <content-wrapper>
      <div class="mb-8">
        <h3 className="text-black">โพสต์การเรียนอื่นๆที่แนะนำ ✨</h3>
        <p className="gray-4">
          นี่คือโพสต์การเรียนล่าสุดที่คุณอาจจะสนใจจากการติดตามของคุณ
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        <PostCard
          class="w-auto"
          :postDetail="post"
          :key="post.id"
          v-for="post in suggestPosts"
        />
      </div>
    </content-wrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LessonCard from "../components/LessonCard.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import PostCard from "../components/postCard.vue";
import SubjectTag from "../components/SubjectTag.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { PlusIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Post",
  components: {
    LessonCard,
    ContentWrapper,
    PostCard,
    ChevronLeftIcon,
    SubjectTag,
    PlusIcon,
  },
  created() {
    // console.log(this.$route.params);
  },
  data() {
    return {
      cat: "CAT",
      lesson: [
        {
          id: 1,
          order: 1,
          title: "ทำไมกาชาพูดมากจัง",
          createdDate: "23/2/2023",
        },
        {
          id: 1,
          order: 2,
          title: "หลักการทำงานของร่างกายกาชา",
          createdDate: "24/2/2023",
        },
      ],
      suggestPosts: [
        {
          id: 2,
          imgSrc: "",
          title: "การทำออกแบบ Database อย่างง่าย",
          createdDate: "11/2/2023",
          subject: "Database",
        },
        {
          id: 3,
          imgSrc: "",
          title: "วิธีการใช้ @media only screen and (max-width)",
          createdDate: "10/2/2023",
          subject: "Multimedia",
        },
        {
          id: 4,
          imgSrc: "",
          title: "วิธีการเลี้ยงกะทิ",
          createdDate: "9/2/2023",
          subject: "Cat",
        },
      ],
    };
  },
  beforeMount() {
    if (!this.getAuthen) {
      this.$router.push("/");
    }
  },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
};
</script>
