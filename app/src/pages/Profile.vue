<template>
  <div class="w-full flex min-h-screen flex-col bg-gray-1">
    <content-wrapper minWidth="30em">
      <div className="w-full flex flex-col">
        <h1>โปรไฟล์ของคุณ</h1>
        <h4 class="text-gray-3">
          รายละเอียดโปรไฟล์ของคุณสามารถดูได้ที่บริเวณนี้
        </h4>
      </div>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div class="flex flex-row mt-10">
        <img
          :src="authen.picture"
          class="w-28 aspect-square rounded-xl ring-2 ring-gray-2"
        />

        <div class="flex flex-col divide-y-2 w-full lg:max-w-[30em] ml-10">
          <div class="flex flex-row justify-between">
            <h5>ชื่อจริง</h5>
            <h5 class="text-blue-primary">{{ authen.firstname }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>นามสกุล</h5>
            <h5 class="text-blue-primary">{{ authen.lastname }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>อีเมล</h5>
            <h5 class="text-blue-primary">{{ user.email }}</h5>
          </div>
          <div class="flex flex-row justify-between">
            <h5>เข้าร่วมเมื่อวันที่</h5>
            <h5 class="text-blue-primary">
              {{ new Date(authen.createdAt).toLocaleDateString() }}
            </h5>
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
        createdDate: "10/2/2023",
      },
    };
  },
  methods: {},
  beforeMount() {
    if (!this.authen) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState({
      authen: (state) => state.authen,
      // to access local state with `this`, a normal function must be used
    }),
  },
};
</script>
