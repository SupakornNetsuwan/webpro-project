<template>
  <div className="w-full flex flex-col bg-gray-1">
    <div className="w-full h-[14em]">
      <img
        className="w-full h-full object-cover object-center"
        src="../assets/banner.png"
        alt="banner"
      />
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
        <Flicking
          :plugins="plugins"
          :options="{ align: 'prev', circular: false, renderOnlyVisible: true }"
        >
          <PostCard
            class="mr-2 w-64 lg:w-96"
            :postDetail="post"
            :key="post.id"
            v-for="post in lastestPosts"
          />
        </Flicking>
      </div>
    </ContentWrapper>
    <ContentWrapper>
      <div>
        <div class="mb-8">
          <h3 className="text-black">โพสต์การเรียนที่แนะนำ ✨</h3>
          <p className="text-gray-3">
            นี่คือโพสต์การเรียนล่าสุดที่คุณอาจจะสนใจจากการติดตามของคุณ
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <PostCard
            class="w-auto"
            :postDetail="post"
            :key="post.id"
            v-for="post in lastestPosts"
          />
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import PostCard from "../components/postCard.vue";
import { mapState } from "vuex";
import { AutoPlay } from "@egjs/flicking-plugins";

const plugins = [
  new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true }),
];

export default {
  name: "Home",
  components: {
    Navbar,
    ContentWrapper,
    PostCard,
  },
  setup(props) {},
  data() {
    return {
      plugins,
      lastestPosts: [
        {
          id: 1,
          imgSrc: "",
          title: "การจัดการ DOM ใน React",
          createdDate: "12/2/2023",
          subject: "Webpro",
          routeSrc: "/post/1",
        },
        {
          id: 2,
          imgSrc: "",
          title: "การทำออกแบบ Database อย่างง่าย",
          createdDate: "11/2/2023",
          subject: "Database",
          routeSrc: "/post/2",
        },
        {
          id: 3,
          imgSrc: "",
          title: "วิธีการใช้ @media only screen and (max-width)",
          createdDate: "10/2/2023",
          subject: "Multimedia",
          routeSrc: "/post/3",
        },
        {
          id: 4,
          imgSrc: "",
          title: "วิธีการเลี้ยงกะทิ",
          createdDate: "9/2/2023",
          subject: "Cat",
          routeSrc: "/post/4",
        },
        {
          id: 5,
          imgSrc: "",
          title: "วิธีการเลี้ยงกาชา",
          createdDate: "9/2/2023",
          subject: "Cat",
          routeSrc: "/post/5",
        },
      ],
    };
  },
  methods: {},
  beforeMount() {
    if (!this.getAuthen) {
      this.$router.push("/");
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
