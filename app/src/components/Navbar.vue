<template>
  <div
    className=" bg-white border-b border-slate-200 px-8 py-2.5 flex items-center justify-between"
  >
    <h1
      className="bg-gradient-to-br from-purple-primary text-transparent to-blue-primary bg-clip-text font-bold m-0"
    >
      Summarite
    </h1>
    <button
      class="bg-white border-2 border-red-primary flex items-center space-x-1"
    >
      <ArrowRightOnRectangleIcon class="w-6 h-6 text-red-primary" />
      <h5 class="text-red-primary m-0">ออกจากระบบ</h5>
    </button>
  </div>
</template>
<script>
import { ArrowRightOnRectangleIcon } from "@heroicons/vue/24/outline";

export default {
  name: "Navbar",
  components: {
    ArrowRightOnRectangleIcon,
  },
  data() {
    return {};
  },
};
</script>
