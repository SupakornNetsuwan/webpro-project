<template>
  <div class="w-full flex min-h-screen flex-col bg-gray-1">
    <content-wrapper>
      <button
        @click="($event) => $router.go(-1)"
        class="flex items-center cursor-pointer border-none bg-transparent pl-0"
      >
        <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
        <h4 class="text-red-primary">กลับ</h4>
      </button>
      <div class="flex justify-between mt-10">
        <h1 class="text-blue-primary">{{ lesson.lesson_title }}</h1>
        <subject-tag :subject="post.subject_name" />
      </div>
      <p class="my-2">{{ post.post_title }}</p>
      <div class="flex my-2">
        <h4>โดย {{ author.name }}</h4>
        <h4 class="text-gray-3">
          &nbsp;• {{ post.author_email }} •
          {{ new Date(lesson.created_date).toLocaleDateString() }}
        </h4>
      </div>
      <hr class="my-6 text-gray-2" />
      <button
        @click="downloadFile"
        v-if="lesson.file_location"
        class="w-full space-x-2 flex items-center justify-center bg-white hover:bg-blue-soft text-blue-primary border-blue-primary mb-6 transition-all duration-150"
      >
        <CloudArrowDownIcon class="h-6 text-blue-primary" />
        <h4>ดาวน์โหลดเอกสาร</h4>
      </button>
      <div v-html="lesson.lesson_content"></div>
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
import { getLesson, getPost } from "../resources/api";

export default {
  name: "Lesson",
  components: {
    ChevronLeftIcon,
    ContentWrapper,
    CloudArrowDownIcon,
  },
  async created() {
    try {
      getLesson(this.$route.params.id, this.$route.params.lessonId).then(
        (res) => {
          this.lesson = res.data;
        }
      );
      getPost(this.$route.params.id).then((res) => {
        this.post = res.data;
        this.author = res.data.author;
      });
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      post: {},
      lesson: {},
      author: {},
    };
  },
  beforeMount() {
    if (!this.getAuthen) {
      this.$router.push("/");
    }
  },
  methods: {
    downloadFile: () => {
      console.log("download file");
    },
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
