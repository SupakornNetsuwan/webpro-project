<template>
  <div
    className="w-full min-h-[100vh]"
  >
    <div className="w-full h-96 bg-slate-100">

    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PostCard from "../components/PostCard.vue";
import { mapState } from "vuex";

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
  methods: {
    clickHandler() {
      this.$store.commit("increment");
    },
  },
  beforeMount() {
    if (this.getAuthen) {
      this.$router.push("/home");
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
