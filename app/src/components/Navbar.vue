<template>
  <div
    className=" bg-white border-b border-slate-200 pl-6 pr-8 py-2.5 flex items-center justify-between"
  >
    <!-- <h1
      className="bg-gradient-to-br from-purple-primary text-transparent to-blue-primary bg-clip-text font-bold m-0"
    >
      Summarite
    </h1> -->
    <div className="flex space-x-4">
      <button
        v-if="this.$route.path != '/'"
        @click="toggleIsNavHide"
        :class="[
          this.isNavHide
            ? ' bg-blue-primary/20 text-blue-primary'
            : 'bg-blue-soft text-blue-primary',
          'border-none flex items-center justify-center transition-all duration-500 ease-out',
        ]"
      >
        <WindowIcon class="w-6 h-6" />
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
      <h5 class="hidden sm:block text-red-primary m-0">ออกจากระบบ</h5>
    </button>
    <div v-else>
      <GoogleSignInButton @success="signIn" @error="signOut" />
    </div>
  </div>
</template>
<script>
import websitename from "../assets/websitename.svg";
import { mapState } from "vuex";
import {
  ArrowRightOnRectangleIcon,
  WindowIcon,
} from "@heroicons/vue/24/outline";
import axios from "axios";
import { GoogleSignInButton } from "vue3-google-signin";

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
  computed: mapState({
    // State mapper
    authen: (state) => state.authen,
    isNavHide: (state) => state.count,
  }),
  methods: {
    signIn({ credential }) {
      axios
        .post("/api/user/login", {
          credential: "Bearer " + credential,
        })
        .then((response) => {
          this.$store.commit("setAuthen", response.data.user);
          this.$router.push("/home");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    signOut() {
      this.$router.push("/");
      this.$store.commit("setAuthen", false);

      axios
        .post("/api/user/logout")
        .then((response) => {
          console.log(response.data);
          this.$store.commit("setAuthen", false);
          this.$router.push("/home");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
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
