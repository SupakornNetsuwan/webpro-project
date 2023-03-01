<template>
  <div
    @click="route"
    class="flex flex-col cursor-pointer bg-white border border-solid border-gray-2 rounded-xl p-2 hover:border-red-primary"
  >
    <img
      class="object-cover h-40 w-full rounded-lg"
      :src="postDetail.imgSrc"
    />
    <div class="m-2">
      <div class="flex flex-row w-full justify-between">
        <h4 class="truncate lg:max-w-[15em]">{{ postDetail.title }}</h4>
        <div class="flex items-center">
          <h4 class="text-red-primary">อ่าน</h4>
          <ChevronRightIcon class="h-4 text-red-primary" />
        </div>
      </div>
      <p class="text-gray-3 published">
        สร้างเมื่อวันที่ {{ postDetail.createdDate }}
      </p>
      <div class="mt-2"><SubjectTag :subject="postDetail.subject" /></div>
    </div>
  </div>
</template>

<script>
import SubjectTag from "../components/SubjectTag.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

export default {
  name: "postCard",
  props: {
    postDetail: Object,
  },
  components: {
    SubjectTag,
    ChevronRightIcon,
  },
  methods: {
    route() {
      this.$router.push(`/posts/${this.postDetail.id}`);
    },
  },
};
</script>

<style>
.published {
  font-weight: 400 !important;
}
</style>
