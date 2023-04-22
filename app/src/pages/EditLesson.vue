<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <ContentWrapper>
      <button
        @click="($event) => $router.go(-1)"
        class="flex items-center cursor-pointer border-none bg-transparent pl-0"
      >
        <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
        <h4 class="text-red-primary">กลับ</h4>
      </button>

      <h1 className="text-black  mt-10">แก้ไขบทเรียน</h1>
      <h4 className="text-gray-3">แก้ไขหัวข้อ เนื้อหา ที่คุณได้ลงไว้แล้ว</h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="md:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            หัวข้อบทเรียน<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full md:max-w-[70%]"
            v-model="title"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เนื้อหา<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">
            เนื้อหานำสำหรับบทเรียนของคุณ
            ลองอธิบายว่าโพสต์ของคุณจะมีการแนะนำเนื้อหาใดบ้างในอนาคต
          </p>
          <QuillEditor theme="snow" toolbar="minimal" contentType="text" :content='content' @update:content="textChange" />
          <!-- <textarea
            name="post-intro"
            id="post-intro"
            rows="5"
            className="w-full resize-none input"
            v-model="content"
          /> -->
        </div>
        <div>
          <!-- <div>
            <h4 className="text-blue-primary mt-8">
              ภาพประกอบ<span className="text-red-primary">*</span>
            </h4>
            <p className="text-gray-3 w-full">
              เลือกภาพประกอบสำหรับบทเรียนของคุณ
            </p>

            <label class="block bg-blue-soft rounded p-2 mt-4">
              <input
                type="file"
                class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
              />
            </label>
          </div> -->

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="openModal"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary"
          >
            <PencilSquareIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">แก้ไขบทเรียน</h5>
          </button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import postsApi from "../resources/postsApi.json";

export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PencilSquareIcon,
  },
  created() {
    this.title = this.lesson.title;
    this.content = this.lesson.content;
  },
  data() {
    const { id: postId, lessonId } = this.$router.currentRoute.value.params;
    return {
      title: null,
      content: null,
      post: postsApi.find((post) => post.id == postId),
      lesson: postsApi
        .find((post) => post.id == postId)
        .lessons.find((lesson) => lesson.id == lessonId),
    };
  },
  mounted() {},
  methods: {
    openModal() {
      this.$store.commit("setIsModalOpen", {
        isModalOpen: true,
        content: "ทำการแก้ไขเนื้อหาบทเรียนเรียบร้อย ⭐️",
        redirectTo: "/summary-manage/my-posts",
      });
    },
    textChange(e){
      console.log(e)
    }
  },
  watch:{
    // content(newContent){
    //   console.log(newContent)
    // }
  }
};
</script>
