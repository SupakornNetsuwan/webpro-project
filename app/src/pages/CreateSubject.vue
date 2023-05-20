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

      <h1 className="text-black mt-10">เพิ่มวิชา</h1>
      <h4 className="text-gray-3">
        เพิ่มวิชาใหม่ สำหรับการสร้างโพสต์
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="md:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            ชื่อวิชา<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full md:max-w-[70%]"
            v-model="subjectName"
          />
          <p v-if="!v$.subjectName.maxLength.$response" class="text-red-primary mt-2">ชื่อวิชาต้องมีความยาวไม่เกิน 10 ตัวอักษร</p>
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            อาจารย์ผู้สอน<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full md:max-w-[70%]"
            v-model="instructorName"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            คำอธิบายรายวิชา<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">
            ลองอธิบายว่าวิชานี้มีเนื้อหาเกี่ยวกับอะไร
          </p>
          <textarea
            name="post-intro"
            id="post-intro"
            rows="5"
            className="w-full resize-none input"
            v-model="description"
          />
        </div>
        <div>
          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="createSubject" :disabled="v$.$invalid"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary disabled:bg-blue-primary/50 border-blue-primary/5"
          >
            <PlusIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">เพิ่มวิชา</h5>
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
import { createSubject } from "../resources/api";
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from "@vuelidate/validators"

export default {
  setup () {
    const v$ = useVuelidate();

    return { v$ };
  },
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PlusIcon,
    ComboBox,
  },
  data() {
    return {
      subjectName: "ชื่อวิชา",
      instructorName: "อาจารย์ผู้สอน",
      description: null
    };
  },
  async created() {
  },
  mounted() {},
  methods: {
    async createSubject() {
      if (!this.subjectName || !this.instructorName || !this.description) {
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "โปรดกรอกข้อมูลให้ครบถ้วน",
          redirectTo: "",
        });

        return;
      }

      try{
        const formData = new FormData();
        formData.append("subject_name", this.subjectName);
        formData.append("instructor_name", this.instructorName);
        formData.append("description", this.description);

        const response = await createSubject(formData);
        console.log("Success")
        // console.log(response.data)

        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: "เพิ่มรายวิชาใหม่สำเร็จ 🌟",
          redirectTo: "/summary-manage",
        });

      }catch(err){
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: err.response.data,
          redirectTo: "",
        });
      }
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
  }),
  validations() {
    return {
      subjectName: { required, maxLength: maxLength(10) },
      instructorName: { required },
      description: { required },
    }
  }
};
</script>
