<template>
    <div
      className="w-full min-h-[120vh] flex flex-col justify-center items-center"
    >
      <p>Summary manage ✨</p>
      
    </div>
  </template>
  
  <script>
  import Navbar from "../components/Navbar.vue";
  import { mapState } from "vuex";
  
  export default {
    name: "SummaryManage",
    components: {
      Navbar,
    },
    setup(props) {},
    data() {
      return {};
    },
    methods: {},
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
  };
  </script>
  