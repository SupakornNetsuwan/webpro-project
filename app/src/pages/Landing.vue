<template>
  <div
    className="w-full min-h-[100vh] flex flex-col justify-center items-center"
  >
    <h4>Landing ✨</h4>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Landing",
  components: {
    Navbar,
  },
  setup(props) {},
  mounted() {},
  data() {
    return {};
  },
  methods: {
    clickHandler() {
      this.$store.commit("increment");
    },
  },
  computed: {
    getGlobalCount() {
      return this.$store.state.count;
    },
  },
};
</script>
