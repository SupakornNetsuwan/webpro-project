<template>
  <div className="w-full min-h-screen flex flex-col bg-gray-1">
    <ContentWrapper :noPadding="true">
      <div className="p-4 md:p-8 lg:p-12">
        <h3 className="text-black">ค้นหาโพสต์การเรียน</h3>
        <h5 className="text-gray-3">
          คุณสามารถค้นหาโพสต์การเรียนที่ต้องการจากโพสต์ทั้งหมดในระบบได้ที่นี่
        </h5>
      </div>
      <div
        className="relative w-full flex justify-center items-center min-h-[18em] bg-gradient-to-br from-purple-soft to-blue-soft">
        <div className="flex relative w-[20em] border border-gray-2 border-solid bg-white rounded-md overflow-hidden">
          <label for="fitlerSubject" className="flex text-gray-3 p-2">
            <MagnifyingGlassIcon class="w-6 h-6 self-center" />
            <div class="w-[1px] bg-gray-2 ml-2" />
          </label>
          <input type="text" name="fitlerSubject" id="fitlerSubject" v-model="search" v-on:keyup.enter="searchPosts"
            placeholder="ค้นหาโพสต์.."
            className="pr-3 py-2  outline-none border-none text-[14px] 2xl:text-[16px] font-normal " />
        </div>
        <img src="../assets/search-people.png" alt="boy-girl-book"
          className="absolute bottom-2 h-[80%] left-12 lg:left-24 opacity-50 lg:opacity-100 pointer-events-none" />
      </div>
      <div className="p-4 md:p-8 lg:p-12">
        <h5 class="text-blue-primary">ผลลัพธ์ {{ posts.length }} รายการ</h5>

        <div className="w-full h-0.5 bg-gray-2 mt-4" />
        <!-- พื้นที่แสดงโพสต์ที่ค้นหาออกมาได้ -->
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-5">
          <PostCard v-for="post in posts" :key="post.post_id" :postDetail="post" />
        </div>
      </div>

    </ContentWrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentWrapper from "../components/ContentWrapper.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
/* --------------------- API --------------------- */
import { getPosts } from "../resources/api";

export default {
  name: "SearchPosts",
  components: {
    ContentWrapper,
    MagnifyingGlassIcon
  },
  data() {
    return {
      search: "",
      posts: [],
    };
  },
  beforeMount() {

  },
  methods: {
    async searchPosts() {
      getPosts(this.search).then((res) => {
        this.posts = res.data
      })
    }
  },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
  }),
};
</script>
