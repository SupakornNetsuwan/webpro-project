<template>
  <div  className="sticky top-0 p-4 flex space-x-2 bg-white m-2 rounded-lg z-10">
    <button
    @click="() => $router.push('/summaries')"
      :class="[
        'flex items-center space-x-1 px-4 py-2 transition-all duration-300',
        activeRoute('/summaries'),
      ]"
    >
      <Squares2X2Icon class="w-6 h-6 text-blue-primary" />
      <h5 class="text-blue-primary">โพสต์ตามวิชา</h5>
    </button>
    <div className="w-[1px] rounded bg-gray-3" />
    <button
      @click="() => $router.push('/summaries/following')"
      :class="[
        'flex items-center space-x-1 px-4 py-2 transition-all duration-300',
        activeRoute('/summaries/following'),
      ]"
    >
      <StarIcon class="w-6 h-6 text-blue-primary" />
      <h5 class="text-blue-primary">เฉพาะที่ติดตาม</h5>
    </button>
  </div>
</template>
<script>
import { Squares2X2Icon  , StarIcon} from "@heroicons/vue/24/outline";

export default {
  name: "SummariesNav",
  data() {
    return {};
  },
  components: {
    Squares2X2Icon,
    StarIcon
  },
  beforeMount() {
  
  },
  methods: {
    activeRoute(route) {
      return this.$route.fullPath === route
        ? "bg-blue-soft border-blue-soft"
        : "bg-transparent border-transparent";
    },
  },
  computed: {},
};
</script>
