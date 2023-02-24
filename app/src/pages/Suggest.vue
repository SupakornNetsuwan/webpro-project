<template>
  <div>
    <h4>Suggest</h4>
    <PostCard/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PostCard from "../components/PostCard.vue";
export default {
  name: "Suggest",
  components: {
    PostCard
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
