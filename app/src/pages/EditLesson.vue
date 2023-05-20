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
            เนื้อหาเกริ่น<span className="text-red-primary">*</span>
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
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เอกสารประกอบ<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">เลือกเอกสารสำหรับบทเรียนของคุณ</p>

          <label class="block bg-blue-soft rounded p-2 mt-4">
            <input
              @change="chooseLearningDocument"
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div class="h-[1px] bg-gray-2 my-8" />
      <button
        @click="updateLesson"
        className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary"
      >
        <PencilSquareIcon class="w-6 h-6 text-white" />
        <h5 class="text-white">แก้ไขบทเรียน</h5>
      </button>
    </ContentWrapper>
  </div>
</template>
<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import { getLesson, editLesson, getLearningDocument } from "../resources/api";

export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PencilSquareIcon,
  },
  async created() {
    const { id: postId, lessonId } = this.$route.params;

    try {
      const {
        data: { lesson_content, lesson_intro, lesson_title, ...moreData },
      } = await getLesson(postId, lessonId);

      console.log(moreData);

      this.content = lesson_content;
      this.intro = lesson_intro;
      this.title = lesson_title;
    } catch (err) {
      console.log(err);
    }

    try {
      const { data } = await getLearningDocument(lessonId);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      options: {
        placeholder: "เนื้อหาบทเรียน...",
      },
      title: "",
      intro: "",
      content: "",
      learningDocument: null,
    };
  },
  mounted() {},
  methods: {
    chooseLearningDocument(e) {
      this.learningDocument = e.target.files[0];
    },
    async updateLesson(e) {
      const { id: postId, lessonId } = this.$route.params;
      if (!this.title || !this.intro || !this.content) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
        return;
      }

      try {
        const payload = new FormData();
        payload.append("title", this.title);
        payload.append("intro", this.intro);
        payload.append("content", this.content);
        payload.append("learningDocument", this.learningDocument);

        const response = await editLesson(payload, postId, lessonId);

        console.log(response);

        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "ทำการแก้ไขเนื้อหาบทเรียนเรียบร้อย ⭐️",
          // redirectTo: "/summary-manage/my-posts",
        });
      } catch (err) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "มีปัญหาในการแก้ไขบทเรียน " + err.response.data,
        });
      }
    },
  },
  watch: {},
};
</script>
