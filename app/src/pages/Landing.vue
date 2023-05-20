<template>
  <div className="w-full min-h-[100vh]">
    <div
      className="w-full h-96 bg-slate-100 flex items-center justify-center"
    ></div>
    <div class="animate-pulse mt-12">
      <div
        class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"
      ></div>
      <div
        class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"
      ></div>
      <div class="flex items-center justify-center mt-4">
        <svg
          class="w-10 h-10 mr-2 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div
          class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"
        ></div>
        <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
    <div
      role="status"
      class="space-y-2.5 animate-pulse max-w-lg mx-auto mt-12 flex flex-col items-center"
    >
      <div>
        <h3 className="text-blue-primary mb-2 text-center">
          ทำไมคุณถึงควรใช้ Summarite
        </h3>
        <p className="text-center mb-4 text-gray-4">
          เพราะคุณหล่อเท่มากพ่อไงละ แล้วถ้าคุณจะไม่ให้ Prototype
          นี้ผ่านได้อย่างไร?
        </p>
      </div>
      <div class="flex items-center w-full space-x-2">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[480px]">
        <div
          class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
        ></div>
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[400px]">
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[480px]">
        <div
          class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
        ></div>
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[440px]">
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        <div
          class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
        ></div>
      </div>
      <div class="flex items-center w-full space-x-2 max-w-[360px]">
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
        <div
          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"
        ></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
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
