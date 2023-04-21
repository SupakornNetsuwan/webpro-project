<template>
  <div className="flex flex-col bg-gray-1 min-h-screen">
    <SummariesNav />
    <router-view name="xxxx"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
import SummariesNav from "../components/SummariesNav.vue";
import { mapState } from "vuex";
export default {
  name: "SummariesLayout",
  components: {
    SummariesNav,
  },
  data() {
    return {};
  },
  beforeMount() {},
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
};
</script>
