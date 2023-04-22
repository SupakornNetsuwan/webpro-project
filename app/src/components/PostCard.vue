<template>
  <div
    @click="route"
    class="flex flex-col cursor-pointer bg-white border border-solid border-gray-2 rounded-xl p-2 hover:border-red-primary"
  >
    <img
      class="object-cover h-40 w-full rounded-lg"
      :src="getImageFromUrl(postDetail.post_img)"
      @error="handleImageNotFound($event)"
    />
    <div class="m-2">
      <div class="flex flex-row w-full justify-between">
        <h4 class="truncate lg:max-w-[15em]">{{ postDetail.post_title }}</h4>
        <div class="flex items-center">
          <h4 class="text-red-primary">อ่าน</h4>
          <ChevronRightIcon class="h-4 text-red-primary" />
        </div>
      </div>
      <p class="text-gray-3 published">
        สร้างเมื่อวันที่ {{ new Date(postDetail.create_date).toLocaleDateString() }}
      </p>
      <div class="mt-2"><SubjectTag :subject="postDetail.subject_name" /></div>
    </div>
  </div>
</template>

<script>
import SubjectTag from "../components/SubjectTag.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import {
  getImageFromUrl,
  handleImageNotFound,
} from "../lib/functions/imageManage";

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
      this.$router.push(`/posts/${this.postDetail.post_id}`);
    },
    getImageFromUrl,
    handleImageNotFound
  },
};
</script>

<style>
.published {
  font-weight: 400 !important;
}
</style>
