<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <ContentWrapper>
      <button
        @click="($event) => $router.go(-1)"
        class="flex items-center cursor-pointer border-none bg-transparent pl-0"
      >
        <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
        <h4 class="text-red-primary">กลับ</h4>
      </button>

      <h1 className="text-black mt-10">
        สร้างโพสต์
      </h1>
      <h4 className="text-gray-3">
        เลือกวิชาที่ต้องการสร้างโพสต์ และ ลงบทเรียน เพื่อแบ่งปันเนื้อหา หรือ
        สรุป
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="md:max-w-[50%]">
        <div>
          <h4 className="text-blue-primary ">
            หัวข้อโพสต์<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full md:max-w-[70%]"
            v-model="title"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            วิชา<span className="text-red-primary">*</span>
          </h4>
          <input
            type="text"
            id="post-topic"
            name="post-topic"
            className="input w-full md:max-w-[70%]"
            v-model="subject"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            เนื้อหาเกริ่น<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">
            เนื้อหาเกริ่นนำสำหรับโพสต์ของคุณ
            ลองอธิบายว่าโพสต์ของคุณจะมีการแนะนำเนื้อหาใดบ้างในอนาคต
          </p>
          <!-- <QuillEditor theme="snow" toolbar="minimal"/> -->
          <textarea
            name="post-intro"
            id="post-intro"
            rows="5"
            className="w-full resize-none input"
            v-model="intro"
          />
        </div>
        <div>
          <h4 className="text-blue-primary mt-8">
            ภาพปก<span className="text-red-primary">*</span>
          </h4>
          <p className="text-gray-3 w-full">เลือกภาพปกสำหรับโพสต์ใหม่ของคุณ</p>

          <label class="block bg-blue-soft rounded p-2 mt-4">
            <input
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-primary file:border-blue-primary file:border-2 file:border-solid hover:file:bg-blue-soft hover:file:cursor-pointer"
              
            />
          </label>

          <div class="h-[1px] bg-gray-2 my-8" />
          <button
            @click="openModal"
            className="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary"
          >
            <PlusIcon class="w-6 h-6 text-white" />
            <h5 class="text-white">สร้างโพสต์</h5>
          </button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/vue/24/outline";
import postsApi from '../resources/postsApi.json';

export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
    PlusIcon,
  },
  data() {
    return {
      title: null,
      subject: null,
      intro: null,
      imgSrc: null,
      posts: postsApi,
    };
  },
  mounted() {},
  methods: {
    openModal() {
      this.$store.commit("setIsModalOpen", {
        isModalOpen: true,
        content: "ทำการสร้างเนื้อหาโพสต์การเรียนใหม่เรียบร้อย ⭐️",
        redirectTo: "/posts/1",
      });
    },
    // writeToJson() {
    //   let newPost = {
    //     "id" : this.posts[this.posts.length - 1].id + 1,
    //     "imgSrc" : this.imgSrc,
    //     "author": "Yolradee Prayoonpunratn",
    //     "authorEmail": "64070089@kmitl.ac.th",
    //     "title": this.title,
    //     "intro": this.intro,
    //     "subject": this.subject,
    //     "createdDate": this.createdDate,
    //     "lessons": []
    //   }
    //   let data = JSON.stringify(this.posts.push(newPost))
    //   const fs = require('fs')
    //   fs.writeFileSync('../resources/postApi.json', data)
    // }
  },
  computed: {
    createdDate(){
      const date = new Date();
      return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
  }
};
</script>
