<template>
  <div>
    <p>Post</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Post",
  created() {
    // console.log(this.$route.params);
  },
  data() {
    return {};
  },
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
