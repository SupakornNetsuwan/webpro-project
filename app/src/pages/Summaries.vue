<template>
  <ContentWrapper :noPadding="true">
    <div className="p-4 md:p-8 lg:p-12">
      <h3 className="text-black">รวมโพสต์แบ่งตามวิชา</h3>
      <h5 className="text-gray-3">
        คุณสามารถเข้าถึงสรุปของแต่ละวิชาได้จากที่นี่โดยการ
        เลือกวิชาที่ต้องการค้นหาสรุป หรือ เนื้อหาการเรียน
      </h5>
    </div>
    <div
      className="relative w-full flex justify-center items-center min-h-[18em] bg-gradient-to-br from-purple-soft to-blue-soft"
    >
      <img
        src="../assets/boy-girl-book.png"
        alt="boy-girl-book"
        className="absolute bottom-2 h-[90%] left-12 lg:left-24 opacity-50 lg:opacity-100 pointer-events-none"
      />
      <div>
        <ComboBox
              :list="subjectList"
              :chosenListItem="chosenSubject"
              @changeList="changeList"
            />
      </div>
    </div>
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex justify-between items-end">
        <div>
          <h3>วิชา {{ selectedSubject }}</h3>
          <h5 className="text-blue-primary">
            ผลลัพธ์ {{ filteredPosts.length }} รายการ
          </h5>
        </div>
        <div
          className="flex relative border border-gray-2 border-solid rounded-md overflow-hidden"
        >
          <label for="fitlerSubject" className="flex text-gray-3 p-2">
            <MagnifyingGlassIcon class="w-6 h-6 self-center" />
            <div class="w-[1px] bg-gray-2 ml-2" />
          </label>
          <input
            type="text"
            name="fitlerSubject"
            id="fitlerSubject"
            v-model="filterPosts"
            className="pr-3 py-2  outline-none border-none text-[14px] 2xl:text-[16px] font-normal "
          />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-2 mt-4" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-8">
        <PostCard v-for="post in filteredPosts" :key="post.post_id" :postDetail="post" />
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
import ContentWrapperVue from "../components/ContentWrapper.vue";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import PostCard from "../components/PostCard.vue";
/* --------------------- Mock API --------------------- */
import { getPosts, getSubjects } from "../resources/api";
import ComboBox from "../components/ComboBox.vue";

export default {
  name: "Summaries",
  components: {
    ContentWrapperVue,
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    PostCard,
    ComboBox,
  },
  beforeMount() {},
  data() {
    return {
      filterPosts: "", // ส่วนของช่อง Filter โพสต์เท่านั้น
      query: "",
      subjectList: [],
      chosenSubject: null,
      posts: [],
    };
  },
  async created () {
    try {
      getPosts().then(res => {
        this.posts = res.data
      })
      const { data } = await getSubjects();
      this.subjectList = data.map((subject) => subject.subject_name);
      this.chosenSubject = this.subjectList[0];
    } catch (err) {
      console.log(err.response);
    }
  },
  methods: {
    handleQueryChange(e) {
      this.query = e.target.value;
    },
    changeList(e) {
      this.chosenSubject = e;
    },
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => post.subject_name == this.chosenSubject && post.post_title.toLowerCase().includes(this.filterPosts.toLowerCase()))
    }
  },
};
</script>
