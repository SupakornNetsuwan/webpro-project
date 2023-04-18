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

      <h1 className="text-black  mt-10">แก้ไขโพสต์</h1>
      <h4 className="text-gray-3">
        แก้ไขหัวข้อ วิชา หรือเนื้อหาเกริ่นที่คุณได้ลงไว้แล้ว
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="md:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            หัวข้อโพสต์<span className="text-red-primary">*</span>
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
            วิชา<span className="text-red-primary">*</span>
          </h4>
          <ComboBox
            :list="subjectList"
            :chosenListItem="chosenSubject"
            @changeList="changeList"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เนื้อหาเกริ่น<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">
            เนื้อหาเกริ่นนำสำหรับโพสต์ของคุณ
            ลองอธิบายว่าโพสต์ของคุณจะมีการแนะนำเนื้อหาใดบ้างในอนาคต
          </p>
          <!-- <QuillEditor theme="snow" toolbar="minimal"/> -->
          <textarea
            name="post-intro"
            id="post-intro"
            rows="5"
            className="w-full resize-none input"
            v-model="intro"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            ภาพปก<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">เลือกภาพปกสำหรับโพสต์ใหม่ของคุณ</p>

          <label class="block bg-blue-soft rounded p-2 mt-4">
            <input
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
            />
          </label>

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="openModal"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary"
          >
            <PencilSquareIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">แก้ไขโพสต์</h5>
          </button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>
  <script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
import { mapState } from "vuex";
import postsApi from "../resources/postsApi.json";
import { getPost, getSubjects } from '../resources/api';
import ComboBox from "../components/ComboBox.vue";

export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PencilSquareIcon,
    ComboBox,
  },
  async created(){
    try {
      const { data } = await getSubjects();
      this.subjectList = data.map((subject) => subject.subject_name);
      getPost(this.$router.currentRoute.value.params.id).then((res) => {
        this.post = res.data
        this.title = res.data.post_title
        this.intro = res.data.intro
        this.chosenSubject = res.data.subject_name
      })
    }catch (err){
      console.log(err)
    }
  },
  data() {
    return {
      post: null,
      title: null,
      subject: null,
      intro: null,
      imgSrc: null,
      subjectList: [],
      chosenSubject: null,
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
  methods: {
    openModal() {
      this.$store.commit("setIsModalOpen", {
        isModalOpen: true,
        content: "แก้ไขเนื้อหาโพสต์การเรียนเรียบร้อย ⭐️",
        redirectTo: `/posts/${this.$router.currentRoute.value.params.id}`,
      });
    },
    changeList(e) {
      this.chosenSubject = e;
    },
  },
};
</script>
  