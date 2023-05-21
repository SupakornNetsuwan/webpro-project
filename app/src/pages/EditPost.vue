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
          <p v-if="!v$.title.minLength.$response" class="text-red-primary mt-2">หัวข้อโพสต์ต้องมีความยาวอย่างน้อย 5 ตัวอักษร</p>
          <p v-if="!v$.title.maxLength.$response" class="text-red-primary mt-2">
            หัวข้อโพสต์มีความยาวได้ไม่เกิน 100 ตัวอักษร
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
            className="w-full resize-none input"
            v-model="intro"
          />
          <p v-if="!v$.intro.minLength.$response" class="text-red-primary mt-2">เนื้อหาเกริ่นต้องมีความยาวอย่างน้อย 10 ตัวอักษร</p>
          <p v-if="!v$.intro.maxLength.$response" class="text-red-primary mt-2">
            เนื้อหาเกริ่นมีความยาวได้ไม่เกิน 30000 ตัวอักษร
          </p>
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            ภาพปก
          </h4>
          <p className="text-gray-3 w-full">แก้ไขภาพปกสำหรับโพสต์ของคุณ</p>

          <label class="flex bg-blue-soft rounded p-2 mt-4">
            <input
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
              @change="chooseImage"
            />
          </label>

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="editPost" :disabled="v$.$invalid"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary disabled:bg-blue-primary/50 border-blue-primary/5"
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
import { getPost, getSubjects, editPost } from '../resources/api';
import ComboBox from "../components/ComboBox.vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from "@vuelidate/validators"

export default {
  setup () {
    return { v$: useVuelidate() }
  },
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
      title: '',
      subject: null,
      intro: '',
      img: null,
      subjectList: [],
      chosenSubject: null,
    };
  },
  beforeMount() {
    
  },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
  methods: {
    async editPost() {
      if (!this.title || !this.intro || !this.chosenSubject) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "โปรดกรอกข้อมูลให้ครบถ้วน",
          redirectTo: "",
        });

        return;
      }

      try{
        const formData = new FormData();

        formData.append("title", this.title);
        formData.append("intro", this.intro);
        formData.append("subjectName", this.chosenSubject);
        formData.append("thumbnail", this.img || null);


        const response = await editPost(formData, this.$router.currentRoute.value.params.id);
        console.log("Edit success")

        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "แก้ไขโพสต์การเรียนเรียบร้อย ⭐️",
          redirectTo: "/summary-manage/my-posts",
        });

      }catch(err){
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
  validations() {
    return {
      title: { required, minLength: minLength(5), maxLength: maxLength(100) },
      intro: { required, minLength: minLength(10), maxLength: maxLength(30000)},
      chosenSubject: { required },
    }
  }
};
</script>
  