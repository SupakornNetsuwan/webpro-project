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
      <div class="flex justify-between mt-10">
        <h1 class="text-blue-primary">{{ lesson.title }}</h1>
        <subject-tag :subject="post.subject" />
      </div>
      <p class="my-2">{{ post.title }}</p>
      <div class="flex my-2">
        <p>โดย {{ post.author }}</p>
        <p class="text-gray-3">&nbsp;• {{ post.authorEmail }} • {{ lesson.createdDate }}</p>
      </div>
      <hr class="my-6 text-gray-2" />
      <button
        class="w-full space-x-2 flex items-center justify-center bg-white hover:bg-blue-soft text-blue-primary border-blue-primary mb-6 transition-all duration-150"
      >
        <CloudArrowDownIcon class="h-6 text-blue-primary" />
        <h4>ดาวน์โหลดเอกสาร</h4>
      </button>
      <p class="text-gray-4 leading-loose">
        {{ lesson.content }}
      </p>
      <div class="flex items-center justify-center my-10">
        <img class="h-80" src="../assets/kacha2.jpg" />
      </div>
      <p class="text-gray-4 leading-loose">
        {{ lesson.content }}
      </p>
    </content-wrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { CloudArrowDownIcon } from "@heroicons/vue/24/outline";
/* --------------------- Mock API --------------------- */
import postsApi from "../resources/postsApi.json";

export default {
  name: "Lesson",
  components: {
    ChevronLeftIcon,
    ContentWrapper,
    CloudArrowDownIcon,
  },
  created() {
  },
  data() {
    const { id: postId, lessonId } = this.$router.currentRoute.value.params;

    return {
      post: postsApi.find(post => post.id == postId),
      lesson: postsApi.find(post => post.id == postId).lessons.find((lesson) => lesson.id == lessonId),
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
