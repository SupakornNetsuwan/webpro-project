<template>
  <div>
    <div class="w-full rounded-xl border border-solid border-gray-2">
      <div class="flex flex-col 2xl:flex-row justify-between m-5 ml-10">
        <div class="flex">
          <img
            class="w-36 h-20 object-cover rounded-lg"
            :src="getImageFromUrl(post.post_img)"
            @error="handleImageNotFound($event)"
          />
          <div class="flex flex-col p-2 ml-5">
            <h3
              class="bg-blue-soft self-start px-2 2xl:px-4 whitespace-nowrap text-ellipsis overflow-hidden text-black rounded cursor-pointer"
              @click="routePost"
            >
              {{ post.post_title }}
            </h3>
            <h5 class="text-gray-3">
              สร้างเมื่อวันที่
              {{ new Date(post.create_date).toLocaleDateString() }}
            </h5>
          </div>
        </div>
        <div
          class="flex flex-row gap-3 justify-between items-center mt-4 2xl:mt-0"
        >
          <div class="flex items-center space-x-2">
            <button
              class="border-solid border-blue-primary bg-white text-blue-primary flex items-center h-fit"
              @click="routeCreateLesson"
            >
              <DocumentPlusIcon class="h-6" />
              <h4>&nbsp;สร้างบทเรียน</h4>
            </button>
            <button
              class="border-solid border-blue-primary bg-white text-blue-primary flex items-center h-fit"
              @click="routeEditPost"
            >
              <PencilSquareIcon class="h-6" />
              <h4 class="hidden 2xl:block">&nbsp;แก้ไขโพสต์</h4>
            </button>
            <button
              class="border-solid border-red-primary bg-white text-red-primary flex items-center h-fit mr-8"
              @click="deletePost"
            >
              <TrashIcon class="h-6" />
              <h4 class="hidden 2xl:block">&nbsp;ลบโพสต์</h4>
            </button>
          </div>
          <div @click="isShowLesson = !isShowLesson">
            <ChevronDownIcon :class="toggleShowLesson"></ChevronDownIcon>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowLesson"
      class="border border-solid border-gray-2 rounded-lg p-5 mt-4"
    >
      <h5
        v-if="post.lessons.length == 0"
        className="text-gray-3 flex items-center justify-center"
      >
        ยังไม่มีบทเรียนภายใต้โพสต์นี้
      </h5>
      <div v-for="l in post.lessons" :key="l.id">
        <div class="flex justify-between items-center">
          <h4 class="text-blue-primary cursor-pointer" @click="this.$router.push(`/posts/${post.post_id}/${l.lesson_id}`)">{{ l.lesson_title }}</h4>
          <div class="flex flex-row gap-3 justify-center items-center">
            <button
              class="flex items-center border-solid border-blue-primary bg-white text-blue-primary"
              @click="
                this.$router.push(
                  `/summary-manage/edit-post/${post.post_id}/${l.lesson_id}`
                )
              "
            >
              <PencilSquareIcon class="w-6 h-6" />
              <h4>&nbsp;แก้ไขบทเรียน</h4>
            </button>
            <button
              class="border-solid border-red-primary bg-white text-red-primary flex items-center"
              @click="deleteLesson(l.lesson_id)"
            >
              <TrashIcon class="w-6 h-6" />
              <h4>&nbsp;ลบบทเรียน</h4>
            </button>
          </div>
        </div>
        <div
          v-if="l.lesson_id != post.lessons[post.lessons.length - 1].lesson_id"
          class="h-[1px] bg-gray-2 my-5"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  PencilSquareIcon,
  ChevronDownIcon,
  TrashIcon,
  PencilIcon,
  DocumentPlusIcon,
} from "@heroicons/vue/24/outline";
import {
  getImageFromUrl,
  handleImageNotFound,
} from "../lib/functions/imageManage";
import { deletePost, deleteLesson } from "../resources/api";

export default {
  name: "ManagePostCard",
  emits: ["removePost", "removeLesson"],
  components: {
    PencilSquareIcon,
    ChevronDownIcon,
    TrashIcon,
    PencilIcon,
    DocumentPlusIcon,
  },
  props: {
    post: Object,
  },
  data() {
    return {
      isShowLesson: false,
    };
  },
  computed: {
    toggleShowLesson() {
      return {
        "text-gray-4 h-6 cursor-pointer duration-200 ease-out":
          this.isShowLesson,
        "text-gray-4 h-6 cursor-pointer rotate-180 duration-200 ease-out":
          !this.isShowLesson,
      };
    },
  },
  created() {},
  setup() {},
  methods: {
    getImageFromUrl,
    handleImageNotFound,
    openModal(txt) {
      this.$store.commit("setIsModalOpen", {
        isModalOpen: true,
        content: txt,
        redirectTo: "",
      });
    },
    deletePost() {
      deletePost(this.post.post_id)
        .then((response) => {
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: response.data,
            redirectTo: "",
          });

          this.$emit("removePost", this.post.post_id);
        })
        .catch((err) => {
          this.$store.commit("setIsModalOpen", {
            isModalOpen: true,
            content: err.response.data,
            redirectTo: "",
          });
        });
    },
    async deleteLesson(lesson_id) {
      try {
        const response = await deleteLesson(lesson_id);
        console.log(response.data);

        this.$emit("removeLesson", lesson_id);
        
        this.$store.commit("setIsModalOpen", {
          isModalOpen: true,
          content: response.data,
          redirectTo: "",
        });
      } catch (err) {
        console.log(err);
      }
    },
    routeEditPost() {
      this.$router.push(`/summary-manage/edit-post/${this.post.post_id}`);
    },
    routeCreateLesson() {
      this.$router.push(`/summary-manage/${this.post.post_id}/create-lesson`);
    },
    routePost() {
      this.$router.push(`/posts/${this.post.post_id}`);
    },
  },
};
</script>
