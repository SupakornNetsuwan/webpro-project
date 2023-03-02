<template>
  <Modal/>
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-y-auto">
      <div
        v-if="isSidebarDisplay"
        className="min-w-[20em] 2xl:min-w-[30em] overflow-y-auto"
      >
        <Sidebar />
      </div>
      <div className="w-full overflow-y-auto">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Modal from "./components/Modal.vue";
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    Sidebar,
    Modal
  },
  setup(props) {},
  computed: mapState({
    // arrow functions can make the code very succinct!
    isNavHide: (state) => state.count,
    getIsNavHide(state) {
      return state.isNavHide;
    },
  }),
  computed: {
    isSidebarDisplay() {
      return !this.$store.state.isNavHide && this.$route.path != "/";
    },
  },
};
</script>
