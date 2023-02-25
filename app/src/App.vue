<template>
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-y-auto">
      <div
        v-if="$route.path != '/'"
        className="min-w-[20em] 2xl:min-w-[30em] overflow-y-auto"
      >
        <Sidebar />
      </div>
      <div className="w-full overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
  setup(props) {},
};
</script>
