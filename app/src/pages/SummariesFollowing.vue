<template>
  <ContentWrapperVue>
    <div className="pb-4 md:pb-8 lg:pb-12">
      <h3 className="text-black">รวมโพสต์ที่ติดตาม</h3>
      <h5 className="text-gray-3">
        คุณสามารถเข้าถึงสรุปที่ติดตามเอาไว้ได้จากที่นี่
      </h5>
    </div>
    <p v-if="posts.length == 0" class="text-gray-3 flex justify-center">ไม่มีโพสต์ที่คุณติดตามอยู่ ลองกดติดตามโพสต์แล้วกลับมาดูใหม่นะ 😭</p>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
      <PostCard
        v-for="post in posts"
        :key="post.post_id"
        :postDetail="post"
      />
    </div>
  </ContentWrapperVue>
</template>

<script>
import ContentWrapperVue from "../components/ContentWrapper.vue";
import PostCard from "../components/PostCard.vue";
import { getFollowingPost } from "../resources/api";

export default {
  name: "SummariesFollowing",
  components: {
    ContentWrapperVue,
    PostCard,
  },
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    try {
      getFollowingPost().then((res) => {
        this.posts = res.data;
        console.log(res.data);
      });
    } catch (err) {
      console.log(err.response);
    }
  },
};
</script>
