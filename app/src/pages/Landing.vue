<template>
  <div
    class="bg-blue-soft border-b-2 border-t-0 border-r-0 border-l-0 border-blue-primary border-dotted"
  >
    <div
      className="w-full min-h-[20em] max-w-[60em] mx-auto flex flex-col md:flex-row p-8 box-border"
    >
      <div
        class="flex flex-1 flex-col items-center md:items-start justify-center"
      >
        <h1
          class="bg-clip-text text-transparent bg-gradient-to-br from-blue-primary to-blue-primary/60"
        >
          รวมสรุปสำหรับนักศึกษาไอที
        </h1>
        <h3 class="text-slate-500">ร่วมกันสนับสนุนการอ่านหนังสือกัน!</h3>
        <ul class="mt-2 text-slate-500 list-inside">
          <li>สนับสนุนการแบ่งปันเพื่อส่งเสริมศักยภาพเด็กไอที</li>
          <li>รวมสรุปจากเพื่อนๆ พี่ๆ</li>
          <li>อ่าน <span class="font-medium text-blue-primary">ฟรี!</span></li>
        </ul>
      </div>
      <div class="flex-1 flex items-center justify-center">
        <img
          src="../assets/read-book.png"
          alt="read-book"
          width="500px"
          class="w-full max-w-[23em]"
        />
      </div>
    </div>
  </div>
  <div class="p-8 grid grid-cols-4 gap-12 justify-items-center">
    <p class="w-full text-block bg-slate-50 rounded p-4">
      <span class="text-xl font-medium text-blue-primary mb-2 block"
        >ทำไมคุณถึงต้องใช้</span
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa harum quo
      reprehenderit praesentium repellendus a omnis porro corporis beatae ipsum.
    </p>
    <p class="w-full text-block bg-slate-50 rounded p-4">
      <span class="text-xl font-medium text-blue-primary mb-2 block"
        >การอ่านจะสร้างสังคม</span
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa harum quo
      reprehenderit praesentium repellendus a omnis porro corporis beatae ipsum.
    </p>
    <p class="w-full text-block bg-slate-50 rounded p-4">
      <span class="text-xl font-medium text-blue-primary mb-2 block"
        >ร่วมกันสร้างชุมชนที่น่าอยู่</span
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa harum quo
      reprehenderit praesentium repellendus a omnis porro corporis beatae ipsum.
    </p>
    <p class="w-full text-block bg-slate-50 rounded p-4">
      <span class="text-xl font-medium text-blue-primary mb-2 block"
        >แหล่งศึกษาเพื่อเด็กไอที</span
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa harum quo
      reprehenderit praesentium repellendus a omnis porro corporis beatae ipsum.
    </p>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PostCard from "../components/PostCard.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Landing",
  components: {
    Navbar,
    PostCard,
  },
  setup(props) {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
  }),
};
</script>
