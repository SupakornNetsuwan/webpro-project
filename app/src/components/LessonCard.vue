<template>
  <div
    class="flex justify-between border border-solid border-gray-3 p-4 px-5 rounded-lg bg-white :hover cursor-pointer"
    @click="route"
  >
    <div>
      <h3 class="text-blue-primary">
        {{ lessonDetail.lesson_title }}
      </h3>
      <h5 class="text-gray-3 mt-1">
        สร้างเมื่อวันที่ {{ new Date(lessonDetail.created_date).toLocaleDateString() }}
      </h5>
    </div>
    <div class="m-2">
      <button
        class="border-none flex justify-center items-center bg-blue-soft hover:bg-[#E5EEF8] h-full aspect-square"
      >
        <ChevronRightIcon class="text-blue-primary w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

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
  methods: {
    route() {
      this.$router.push(
        `${this.$router.currentRoute.value.fullPath}/${this.lessonDetail.lesson_id}`
      );
    },
  },
};
</script>
