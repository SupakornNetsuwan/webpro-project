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

      <h1 className="text-black mt-10">สร้างโพสต์</h1>
      <h4 className="text-gray-3">
        เลือกวิชาที่ต้องการสร้างโพสต์ และ ลงบทเรียน เพื่อแบ่งปันเนื้อหา หรือ
        สรุป
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="xl:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            หัวข้อโพสต์<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full box-border xl:max-w-[70%]"
            v-model="title"
          />
          <p v-if="!v$.title.minLength.$response" class="text-red-primary mt-2">
            หัวข้อโพสต์ต้องมีความยาวอย่างน้อย 5 ตัวอักษร
          </p>
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
            className="w-full box-border resize-none input"
            v-model="intro"
          />
          <p v-if="!v$.intro.minLength.$response" class="text-red-primary mt-2">
            เนื้อหาเกริ่นต้องมีความยาวอย่างน้อย 10 ตัวอักษร
          </p>
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">ภาพปก</h4>
          <p className="text-gray-3 w-full">
            เลือกภาพปกสำหรับโพสต์ใหม่ของคุณ (png / jpg /jpeg เท่านั้น)
          </p>

          <label class="block bg-blue-soft rounded p-2 mt-4">
            <input
              @change="chooseImage"
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
            />
          </label>

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="createPost"
            :disabled="v$.$invalid"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary disabled:bg-blue-primary/50 border-blue-primary/5"
          >
            <PlusIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">สร้างโพสต์</h5>
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
import ComboBox from "../components/ComboBox.vue";
import { getSubjects, createPost } from "../resources/api";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PlusIcon,
    ComboBox,
  },
  data() {
    return {
      title: "หัวข้อโพสต์" || null,
      intro: "เนื้อหาเกริ่นนำสำหรับโพสต์ของคุณ" || null,
      img: null,
      chosenSubject: null,
      subjectList: [],
    };
  },
  async created() {
    try {
      const { data } = await getSubjects();
      this.subjectList = data.map((subject) => subject.subject_name);
      this.chosenSubject = this.subjectList[0];
    } catch (err) {
      console.log(err.response);
    }
  },
  mounted() {},
  methods: {
    async createPost() {
      if (this.v$.$invalid) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "โปรดกรอกข้อมูลให้ครบถ้วน",
          redirectTo: "",
        });

        return;
      }

      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("intro", this.intro);
        formData.append("subjectName", this.chosenSubject);
        formData.append("thumbnail", this.img || null);

        const response = await createPost(formData);
        console.log("Success");
        // console.log(response.data)

        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "สร้างโพสต์สำเร็จ 🌟",
          redirectTo: `/posts/${response.data.post_id}`,
        });
      } catch (err) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: err.response.data,
          redirectTo: "",
        });
      }
    },
    changeList(e) {
      this.chosenSubject = e;
    },
    chooseImage(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.img = files[0];
    },
  },
  watch: {},
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
    createdDate() {
      const date = new Date();
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    },
  }),
  validations() {
    return {
      title: { required, minLength: minLength(5) },
      intro: { required, minLength: minLength(10) },
      chosenSubject: { required },
    };
  },
};
</script>
