<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <ContentWrapper>
      <div>
        <h1 className="text-black">บอร์ดจัดการเนื้อหาโพสต์ บทเรียน</h1>
        <p className="gray-4">
          คุณสามารถจัดการสรุปทั้งหมดของคุณได้จากบอร์ดจัดการเนื้อหา
        </p>
      </div>
      <div className="w-full h-0.5 bg-gray-2 my-8" />
      <h3 className="text-black">การจัดการ</h3>
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4  mt-4 "
      >
        <div
          className="flex space-x-2 p-6 bg-blue-soft rounded-2xl cursor-pointer border-blue-soft hover:border-blue-primary border-solid border-2 transition-all duration-150"
        >
          <DocumentPlusIcon class="w-10 h-10 text-blue-primary mt-1" />
          <div>
            <h4 className="text-blue-primary">สร้างโพสต์ใหม่</h4>
            <p className="text-gray-4">เพิ่มโพสต์ภายใต้วิชาที่ต้องการ</p>
          </div>
        </div>
        <div
          className="flex space-x-2 p-6 bg-blue-soft rounded-2xl cursor-pointer border-blue-soft hover:border-blue-primary border-solid border-2 transition-all duration-150"
        >
          <Cog6ToothIcon class="w-10 h-10 text-blue-primary mt-1" />
          <div>
            <h4 className="text-blue-primary">แก้ไขโพสต์</h4>
            <p className="text-gray-4">แก้ไข ลบ เพิ่มบทเรียนภายใต้โพสต์</p>
          </div>
        </div>
      </div>
      <h3 className="text-black mt-16 mb-8">สถิติ</h3>
    </ContentWrapper>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import { DocumentPlusIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { mapState } from "vuex";

export default {
  name: "SummaryManage",
  components: {
    Navbar,
    ContentWrapper,
    DocumentPlusIcon,
    Cog6ToothIcon,
  },
  setup(props) {},
  data() {
    return {};
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
