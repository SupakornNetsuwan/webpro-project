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
      <h1 className="text-black mt-10">โพสต์ของคุณ</h1>
      <h4 className="text-gray-3">
        ทั้งหมดนี่คือโพสต์ที่คุณสร้างไว้ สามารถจัดการ แก้ไข ลบ โพสต์ได้
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div class="grid gap-5">
        <manage-post-card
          @removeLesson="removeLesson"
          @removePost="removePost"
          v-for="p in mypost"
          :key="p.post_id"
          :post="p"
        />
      </div>
    </content-wrapper>
  </div>
</template>

<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import ManagePostCard from "../components/ManagePostCard.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { mapState } from "vuex";
import { getMyPosts } from "../resources/api";

export default {
  name: "myposts",
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    ManagePostCard,
  },
  data() {
    return {
      mypost: null,
    };
  },
  beforeMount() {},
  async created() {
    try {
      getMyPosts().then((res) => {
        this.mypost = res.data;
        console.log(JSON.parse(JSON.stringify(this.mypost)));
      });
    } catch (err) {
      console.log(err);
    }
  },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
  methods: {
    removePost(post_id) {
      this.mypost = this.mypost.filter((p) => p.post_id != post_id);
    },
    removeLesson(lesson_id) {
      // Filter เอาอันที่ตรงกับ lesson_id ส่งมาออกไป
      const newAllLessons = this.mypost
        .map((post) => post.lessons)
        .map((lessons) =>
          lessons.filter((lesson) => {
            return lesson.lesson_id != lesson_id;
          })
        );

      this.mypost = this.mypost.map((post, index) => {
        post.lessons = newAllLessons[index];
        return post;
      });
    },
  },
};
</script>
