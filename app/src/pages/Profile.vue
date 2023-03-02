<template>
  <div class="w-full flex min-h-screen flex-col bg-gray-1">
    <content-wrapper>
      <div className="w-full flex flex-col">
        <h1>โปรไฟล์ของคุณ</h1>
        <h4 class="text-gray-3">
          รายละเอียดโปรไฟล์ของคุณสามารถดูได้ที่บริเวณนี้
        </h4>
      </div>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div class="flex flex-row mt-10">
        <img
          class="w-48 rounded-xl"
          src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/294882175_1950447848474033_2501928959914313211_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFc5v84XK8pbVevoUXN_escQoqKbTDB4QRCioptMMHhBKdiVjbOhG-Z5b2MKEAjyMOIFhC7s4ItocZ7NbRXvq7_&_nc_ohc=lT4nsq5BmggAX8Z92K7&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfCnoiJy6ZJVEKdM4bUsdSz2P6VkWfGeH6V3MHPHLAnKEg&oe=64032DEC"
        />
        <div class="flex flex-col divide-y-2 w-full lg:max-w-[30em] ml-10">
          <div class="flex flex-row justify-between">
            <h5>ชื่อจริง</h5>
            <h5 class="text-blue-primary">{{ user.name }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>อีเมล</h5>
            <h5 class="text-blue-primary">{{ user.email }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>ชื่อเล่น</h5>
            <h5 class="text-blue-primary">{{ user.nickname }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>เข้าร่วมเมื่อวันที่</h5>
            <h5 class="text-blue-primary">{{ user.createdDate }}</h5>
          </div>
        </div>
      </div>
    </content-wrapper>
  </div>
</template>
  
  <script>
import Navbar from "../components/Navbar.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    Navbar,
    ContentWrapper,
  },
  setup(props) {},
  data() {
    return {
      user: {
        name: "Supakorn Netsuwan",
        email: "64070108@kmitl.ac.th",
        nickname: "เอิร์ธ",
        createdDate:"10/2/2023"
      },
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
  