<template>
  <div className="w-full flex flex-col bg-gray-1">
    <div className="w-full h-[14em]">
      <img className="w-full h-full object-cover object-center" src="../assets/banner.png" alt="banner" />
    </div>
    <ContentWrapper>
      <div class="mb-8">
        <h3 className="text-black">โพสต์การเรียนล่าสุด</h3>
        <p className="text-gray-3">
          นี่คือโพสต์การเรียนล่าสุดที่ถูกสร้างขึ้น
          คุณสามารถสำรวจเนื้อหาที่ต้องการได้ทันที
        </p>
      </div>

      <div class="carousel">
        <Flicking :plugins="plugins" :options="{ align: 'prev', circular: false, renderOnlyVisible: true }">
          <div :key="post.post_id" v-for="post in lastestPosts">
            <PostCard class="mr-2 w-64 lg:w-96" :postDetail="post" />
          </div>
          <template #viewport>
            <span class="flicking-arrow-prev is-circle"></span>
            <span class="flicking-arrow-next is-circle"></span>
          </template>
        </Flicking>
      </div>
    </ContentWrapper>
    <ContentWrapper>
      <div>
        <div class="mb-8">
          <h3 className="text-black">โพสต์การเรียนที่แนะนำทั้งหมด ✨</h3>
          <p className="text-gray-3">
            นี่คือโพสต์การเรียนล่าที่คุณอาจจะสนใจ
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <PostCard class="w-auto" :postDetail="post" :key="post.post_id" v-for="post in suggestPosts" />
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import PostCard from "../components/PostCard.vue";
import { mapState } from "vuex";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
/* --------------------- API --------------------- */
import { getSuggestPosts, getPosts } from "../resources/api";

const plugins = [
  new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true }),
  new Arrow()
];

export default {
  name: "Home",
  components: {
    Navbar,
    ContentWrapper,
    PostCard,
  },
  setup(props) { },
  data() {
    return {
      // user: JSON.parse(JSON.stringify(this.$store.state.authen)),
      plugins,
      lastestPosts: [],
      suggestPosts: [],
    };
  },
  async created() {
    try {
      getSuggestPosts(6).then((res) => {
        this.suggestPosts = res.data
      })
      getPosts().then((res) => {
        this.lastestPosts = res.data.slice(0, 5)
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {},
  beforeMount() {

  },
  mounted() { },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
  }),
};
</script>
