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

      <h1 className="text-black  mt-10">สร้างบทเรียน</h1>
      <h4 className="text-gray-3">สร้างบทเรียนใหม่ แบ่งปันเนื้อหา หรือสรุป</h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="xl:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            หัวข้อบทเรียน<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            v-model="title"
            className="input w-full box-border xl:max-w-[70%]"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เนื้อหาเพริ่น<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            v-model="intro"
            className="input w-full box-border xl:max-w-[70%]"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เนื้อหา<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">เนื้อหาในบทเรียนของคุณ</p>
          <QuillEditor
            :options="options"
            contentType="html"
            v-model:content="content"
            name="lesson-content"
          >
          </QuillEditor>
          <!-- <textarea
              name="post-intro"
              id="post-intro"
              rows="5"
              className="w-full resize-none input"
            /> -->
        </div>
        <div>
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

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="createLesson"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary"
          >
            <PlusIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">สร้างบทเรียน</h5>
          </button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { mapState } from "vuex";
import { Quill } from "@vueup/vue-quill";
import markdownToolbar from "quill-markdown-toolbar";

Quill.register("modules/quill-markdown-toolbar", markdownToolbar);

export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PlusIcon,
  },
  data() {
    return {
      options: {
        placeholder: "เนื้อหาบทเรียน...",
      },
      title: "",
      intro: "",
      content: "",
    };
  },
  beforeMount() {},
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
    createdDate() {
      const date = new Date();
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    },
  }),
  methods: {
    createLesson() {
      const { id } = this.$route.params;

      console.log(this.title, this.intro);
      console.log(this.content);
      // this.$store.commit("setIsModalOpen", {
      //   isModalOpen: true,
      //   content: "ทำการสร้างเนื้อหาบทเรียนใหม่เรียบร้อย ⭐️",
      //   redirectTo: "/posts/1/1",
      // });
    },
  },
};
</script>
