<template>
  <div
    class="flex justify-between border border-solid border-gray-3 p-4 px-5 rounded-lg bg-white"
  >
    <div>
      <h3 class="text-blue-primary">
        บทที่ {{ lessonDetail.order }} {{ lessonDetail.title }}
      </h3>
      <h5 class="text-gray-3 mt-1">
        สร้างเมื่อวันที่ {{ lessonDetail.createdDate }}
      </h5>
    </div>
    <div class="m-2">
      <button
        @click="route"
        class="border-none flex justify-center items-center bg-blue-soft h-full aspect-square"
      >
        <ChevronRightIcon class="text-blue-primary w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

export default {
  name: "lessonCard",
  props: {
    lessonDetail: Object,
  },
  components: {
    ChevronRightIcon,
  },
  data() {
    return {};
  },
  methods:{
    route() {
      this.$router.push(`./lessons/${this.lessonDetail.id}`);
    },
  }
};
</script>
