<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <content-wrapper class="py-4 md:py-8 lg:py-12" :noPadding="true">
      <div class="flex justify-between mt-4 mx-4 md:mx-8 lg:mx-12">
        <button
          @click="($event) => $router.go(-1)"
          class="flex items-center cursor-pointer border-none bg-transparent pl-0"
        >
          <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
          <h4 class="text-red-primary">กลับ</h4>
        </button>
        <button
          class="border-solid border-blue-primary bg-white text-blue-primary flex items-center"
        >
          <StarIcon class="h-6" />
          <h4>&nbsp;ติดตาม</h4>
        </button>
      </div>
      <div class="flex justify-between mt-10 mx-4 md:mx-8 lg:mx-12">
        <h1 className="text-black">
          {{ post.title }}
        </h1>
        <subject-tag :subject="post.subject" />
      </div>
      <div class="flex my-2 mx-4 md:mx-8 lg:mx-12">
        <p className="text-black">โดย {{ post.author }}</p>
        <p class="text-gray-3">
          &nbsp;• {{ post.authorEmail }} • {{ post.createdDate }}
        </p>
      </div>
      <img :src="post.imgSrc" class="w-full h-96 object-cover my-5" />
      <p
        class="text-gray-4 mx-4 md:mx-8 lg:mx-12"
        style="font-weight: 400 !important"
      >
        {{ post.intro }}
      </p>
      <div class="w-[1px] bg-gray-2 ml-2" />
      <div class="h-[1px] bg-gray-2 mx-4 my-8 md:mx-8 lg:mx-12" />
      <div class="mx-4 md:mx-8 lg:mx-12">
        <h2>บทเรียนต่างๆ</h2>
        <h4 class="text-gray-4 mb-5">
          บทเรียนคือเนื้อหาที่อยู่ภายใต้โพสต์วิชาในแต่ละวิชาที่ถูกสร้างขึ้นโดยผู้เขียนโพสต์นั้นๆ
        </h4>
        <div class="flex flex-col">
          <LessonCard
            v-for="ls in post.lessons"
            class="my-2"
            :lessonDetail="ls"
            :key="ls.id"
          />
        </div>
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
          v-for="post in suggestPosts"
          :postDetail="post"
          :key="post.id"
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
import { ChevronLeftIcon, StarIcon } from "@heroicons/vue/24/outline";
/* --------------------- Mock API --------------------- */
import postsApi from "../resources/postsApi.json";

export default {
  name: "Post",
  components: {
    LessonCard,
    ContentWrapper,
    PostCard,
    ChevronLeftIcon,
    SubjectTag,
    StarIcon,
  },
  created() {
    console.log(this.$route.params);
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.post = postsApi.find((post) => post.id == toParams.id);
      }
    );
  },
  data() {
    return {
      post: postsApi.find(
        (post) => post.id == this.$router.currentRoute.value.params.id
      ),
      suggestPosts: postsApi.slice(0, 3),
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
