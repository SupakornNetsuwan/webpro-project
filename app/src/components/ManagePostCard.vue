<template>
  <div>
    <div class="w-full rounded-xl border border-solid border-gray-2">
      <div class="flex flex-row justify-between m-5 ml-10">
        <div class="flex flex-row">
          <img
            class="w-36 h-20 object-cover rounded-lg"
            :src="post.imgSrc"
          />
          <div class="flex flex-col p-2 ml-5">
            <h3 class="truncate text-black">
              {{ post.title }}
            </h3>
            <h5 class="text-gray-3">สร้างเมื่อวันที่ {{ post.createdDate }}</h5>
          </div>
        </div>
        <div class="flex flex-row gap-3 justify-center items-center">
          <button
            class="border-solid border-blue-primary bg-white text-blue-primary flex items-center h-fit"
            @click="routePost"
          >
            <PencilSquareIcon class="h-6" />
            <h4>&nbsp;แก้ไขโพสต์</h4>
          </button>
          <button
            class="border-solid border-red-primary bg-white text-red-primary flex items-center h-fit mr-10"
            @click="openModal('ลบโพสการเรียนเรียบร้อย ⭐️')"
          >
            <TrashIcon class="h-6" />
            <h4>&nbsp;ลบโพสต์</h4>
          </button>
          <div @click="isShowLesson = !isShowLesson">
            <ChevronDownIcon class="text-gray-4 h-10 mr-8"></ChevronDownIcon>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowLesson"
      class="border border-solid border-gray-2 rounded-lg p-5"
    >
      <div v-for="l in post.lessons" :key="l.id">
        <div class="px-20 flex flex-row justify-between items-center">
          <h4 class="text-blue-primary">{{ l.title }}</h4>
          <div class="flex flex-row gap-3 justify-center items-center">
            <button
              class="border-solid border-blue-primary bg-white text-blue-primary flex items-center h-fit"
              @click="this.$router.push(`/summary-manage/edit-post/${post.id}/${l.id}`)"
            >
              <PencilSquareIcon class="h-6" />
              <h4>&nbsp;แก้ไขบทเรียน</h4>
            </button>
            <button
              class="border-solid border-red-primary bg-white text-red-primary flex items-center h-fit mr-10"
              @click="openModal('ลบบทเรียนเรียบร้อย ⭐️')"
            >
              <TrashIcon class="h-6" />
              <h4>&nbsp;ลบบทเรียน</h4>
            </button>
          </div>
        </div>
        <div v-if="l.id != post.lessons[post.lessons.length - 1].id" class="h-[1px] bg-gray-2 my-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { PencilSquareIcon, ChevronDownIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/outline";

export default {
  name: "ManagePostCard",
  components: {
    PencilSquareIcon,
    ChevronDownIcon,
    TrashIcon,
    PencilIcon,
  },
  props: {
    post: Object,
  },
  data() {
    return {
      isShowLesson: true,
    };
  },
  setup() {},
  methods: {
    openModal(txt) {
      this.$store.commit("setIsModalOpen", {
        isModalOpen: true,
        content: txt,
        // redirectTo: "/posts/1",
      });
    },
    routePost() {
      this.$router.push(`/summary-manage/edit-post/${this.post.id}`)
    },
  },
};
</script>
