<template>
  <div
    className=" bg-white border-b border-slate-200 px-8 py-2.5 flex items-center justify-between"
  >
    <!-- <h1
      className="bg-gradient-to-br from-purple-primary text-transparent to-blue-primary bg-clip-text font-bold m-0"
    >
      Summarite
    </h1> -->
    <div className="flex space-x-4">
      <button
        v-if="this.$route.path != '/' "
        @click="toggleIsNavHide"
        :class="[getIsNavHide ? ' bg-blue-primary text-blue-soft' : 'bg-blue-soft text-blue-primary', 'border-none flex items-center justify-center transition-all duration-500 ease-out']"
      >
        <WindowIcon class="w-6 h-6 " />
      </button>
      <img
        @click="$router.push('/')"
        :src="websitename"
        alt="websitename"
        className="cursor-pointer w-[10em]"
      />
    </div>
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
import websitename from "../assets/websitename.svg";
import { mapState } from "vuex";
import {
  ArrowRightOnRectangleIcon,
  WindowIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "Navbar",
  components: {
    ArrowRightOnRectangleIcon,
    WindowIcon,
  },
  data() {
    return {
      websitename,
    };
  },
  mounted() {},
  computed: mapState({
    // State mapper
    authen: (state) => state.authen,
    isNavHide: (state) => state.count,
    getAuthen() {
      return this.authen;
    },
    getIsNavHide(state) {
      return state.isNavHide;
    },
  }),
  methods: {
    signIn() {
      this.$store.commit("setAuthen", true);
      this.$router.push("/home");
    },
    signOut() {
      this.$router.push("/");
      this.$store.commit("setAuthen", false);
    },
    toggleIsNavHide() {
      if (this.$store.state.isNavHide) {
        this.$store.commit("setIsNavHide", false);
        return;
      }

      this.$store.commit("setIsNavHide", true);
    },
  },
};
</script>
