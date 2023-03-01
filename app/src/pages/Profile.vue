<template>
    <content-wrapper>
    <div
      className="w-full flex flex-col"
    >
      <h1>โปรไฟล์ของคุณ</h1>
      <h4 class="text-gray-3">รายละเอียดโปรไฟล์ของคุณสามารถดูได้ที่บริเวณนี้</h4>
    </div>
    <div class="h-[1px] bg-gray-2 my-8" />
    <div class="flex flex-row mt-10">
      <img class="w-48 rounded-xl" src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/294882175_1950447848474033_2501928959914313211_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFc5v84XK8pbVevoUXN_escQoqKbTDB4QRCioptMMHhBKdiVjbOhG-Z5b2MKEAjyMOIFhC7s4ItocZ7NbRXvq7_&_nc_ohc=lT4nsq5BmggAX8Z92K7&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfCnoiJy6ZJVEKdM4bUsdSz2P6VkWfGeH6V3MHPHLAnKEg&oe=64032DEC" />
      <div class="flex flex-col w-96 ml-10">
        <div class="flex flex-row justify-between">
          <h3>ชื่อจริง</h3>
          <h3 class="text-blue-primary">{{user.name}}</h3>
        </div>
        <div class="flex flex-row justify-between">
          <h3>อีเมล</h3>
          <h3 class="text-blue-primary">{{user.email}}</h3>
        </div>
        <div class="flex flex-row justify-between">
          <h3>ชื่อเล่น</h3>
          <h3 class="text-blue-primary">{{user.nickname}}</h3>
        </div>
      </div>
    </div>
    </content-wrapper>
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
        }
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
  