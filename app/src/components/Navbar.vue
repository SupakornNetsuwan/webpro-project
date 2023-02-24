<template>
  <div
    className=" bg-white border-b border-slate-200 px-8 py-2.5 flex items-center justify-between"
  >
    <!-- <h1
      className="bg-gradient-to-br from-purple-primary text-transparent to-blue-primary bg-clip-text font-bold m-0"
    >
      Summarite
    </h1> -->
    <img
      @click="$router.push('/')"
      :src="websitename"
      alt="websitename"
      className="cursor-pointer w-[10em]"
    />
    <button
    @click="signOut"
      v-if="authen"
      class="bg-white border-2 border-red-primary flex items-center space-x-1"
    >
      <ArrowRightOnRectangleIcon class="w-6 h-6 text-red-primary" />
      <h5 class="text-red-primary m-0">ออกจากระบบ</h5>
    </button>
    <button
      @click="signIn"
      v-else
      class="bg-blue-primary text-white flex items-center space-x-1 border-blue-primary"
    >
      <ArrowRightOnRectangleIcon class="w-6 h-6" />
      <h5 class="m-0">เข้าสู่ระบบ</h5>
    </button>
  </div>
</template>
<script>
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";
import websitename from "../assets/websitename.svg";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    ArrowRightOnRectangleIcon,
  },
  data() {
    return {
      websitename,
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
  computed: mapState({
    // State mapper
    authen: (state) => state.authen,
    getGlobalCount() {
      return this.authen;
    },
  }),
  methods: {
    signIn() {
      localStorage.setItem("authen", true);
      this.$store.commit("setAuthen", true)
    },
    signOut() {
      localStorage.setItem("authen", false);
      this.$store.commit("setAuthen", false)
    },
  }
};
</script>
