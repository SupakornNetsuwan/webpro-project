<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <content-wrapper class="" :noPadding="true">
      <div class="flex justify-between mt-4 mx-4 md:mx-8 lg:mx-12 pt-4 md:pt-8 lg:pt-12">
        <button @click="($event) => $router.go(-1)"
          class="flex items-center cursor-pointer border-none bg-transparent pl-0">
          <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
          <h4 class="text-red-primary">กลับ</h4>
        </button>
        <button
          :class="isFollow ? 'border-solid border-blue-primary bg-blue-primary text-white flex items-center' : 'border-solid border-blue-primary bg-white text-blue-primary flex items-center'"
          @click="followButtonListener">
          <StarIcon v-if="!isFollow" class="h-6" />
          <h4 v-if="!isFollow">&nbsp;ติดตาม</h4>
          <CheckIcon v-if="isFollow" class="h-6" />
          <h4 v-if="isFollow">&nbsp;ติดตามแล้ว</h4>
        </button>
      </div>
      <div class="flex justify-between mt-10 mx-4 md:mx-8 lg:mx-12">
        <h1 className="text-black">
          {{ post.post_title }}
        </h1>
        <subject-tag :subject="post.subject_name" />
      </div>
      <div class="flex my-2 mx-4 md:mx-8 lg:mx-12">
        <h4 className="text-black">โดย {{ author.name }}</h4>
        <h4 class="text-gray-3">
          &nbsp;• {{ post.author_email }} • {{ new Date(post.create_date).toLocaleDateString() }}
        </h4>
      </div>
      <img v-if="post.post_img" :src="post.post_img" class="w-full h-96 object-cover my-5" />
      <p class="text-gray-4 mx-4 md:mx-8 lg:mx-12" style="font-weight: 400 !important">
        {{ post.intro }}
      </p>
      <div class="w-[1px] bg-gray-2 ml-2" />
      <div class="h-[1px] bg-gray-2 mx-4 my-8 md:mx-8 lg:mx-12" />
      <div class="mx-4 md:mx-8 lg:mx-12 pb-4 md:pb-8 lg:pb-12">
        <h2 class="text-black">บทเรียนต่างๆ</h2>
        <h4 class="text-gray-4 mb-5">
          บทเรียนคือเนื้อหาที่อยู่ภายใต้โพสต์วิชาในแต่ละวิชาที่ถูกสร้างขึ้นโดยผู้เขียนโพสต์นั้นๆ
        </h4>
        <div class="flex flex-col">
          <LessonCard v-for="ls in post.lessons" class="my-2" :lessonDetail="ls" :key="ls.lesson_id" />
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
        <PostCard v-for="post in suggestPosts" :postDetail="post" :key="post.id" />
      </div>
    </content-wrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LessonCard from "../components/LessonCard.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import PostCard from "../components/PostCard.vue";
import SubjectTag from "../components/SubjectTag.vue";
import { ChevronLeftIcon, StarIcon, CheckIcon } from "@heroicons/vue/24/outline";
/* --------------------- Mock API --------------------- */
import postsApi from "../resources/postsApi.json";
import { getPost, followPost, unFollowPost, getFollowingPost } from "../resources/api";

export default {
  name: "Post",
  components: {
    LessonCard,
    ContentWrapper,
    PostCard,
    ChevronLeftIcon,
    SubjectTag,
    StarIcon,
    CheckIcon,
  },
  created() {
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     this.post = postsApi.find((post) => post.id == toParams.id);
    //   }
    // );

    try {
      getPost(this.$route.params.id).then((res) => {
        this.post = res.data;
        this.author = res.data.author
      });
      //เช็คว่าโพสนี้ถูกฟอลอยู่หรือไม่
      getFollowingPost().then((res) => {
        this.isFollow = !!res.data.filter(post => post.post_id == this.$route.params.id)[0]
      })
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      post: {},
      author: {},
      suggestPosts: postsApi.slice(0, 3),
      isFollow: null,
    };
  },
  beforeMount() {
    if (!this.getAuthen) {
      this.$router.push("/");
    }
  },
  methods: {
    async followButtonListener() {
      if (this.isFollow) {
        //ถ้าโพสต์ถูกติดตามอยู่
        try {
          const response = await unFollowPost(this.$route.params.id)
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: response.data,
            redirectTo: "",
          });
          this.isFollow = false
        }catch(err){
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: err.response.data,
            redirectTo: "",
          });
        }
      }
      else {
        //ถ้าโพสต์ไม่ได้ถูกติดตามอยู่
        try {
          const response = await followPost(this.$route.params.id)
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: response.data,
            redirectTo: "",
          });
          this.isFollow = true
        } catch (err) {
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: err.response.data,
            redirectTo: "",
          });
        }
      }
    }
  }
  ,
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
};
</script>
