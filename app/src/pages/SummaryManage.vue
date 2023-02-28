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
          @click="
            $router.push($router.currentRoute.value.path + '/create-post')
          "
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex ">
        <div v-for="statistic in statistics">
          <Atropos class="my-atropos" :shadow="false">
            <div
              className="bg-white flex space-x-6 p-4 border-solid border border-gray-2 rounded-xl"
            >
              <div className="w-1 bg-red-primary rounded-full" />
              <div className="flex flex-col space-y-4">
                <div>
                  <h4 className="text-black">{{ statistic.title }}</h4>
                  <p className="text-gray-3">{{ statistic.description }}</p>
                </div>
                <h1 className="text-red-primary">{{ statistic.amount }}</h1>
              </div>
            </div>
          </Atropos>
        </div>
      </div>
      <line-chart :data="chartData"></line-chart>
    </ContentWrapper>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ContentWrapper from "../components/ContentWrapper.vue";
import { DocumentPlusIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
import { mapState } from "vuex";
// Atropos
import Atropos from "atropos/vue";
import "atropos/css/min";
// moment
import moment from 'moment';

export default {
  name: "SummaryManage",
  components: {
    Atropos,
    Navbar,
    ContentWrapper,
    DocumentPlusIcon,
    Cog6ToothIcon,
  },
  setup(props) {},
  data() {
    return {
      statistics: [
        {
          title: "จำนวนโพสต์ของคุณ",
          description: "โพสต์จากทุกวิชารวมกัน",
          amount: 12,
        },
        {
          title: "จำนวนบทเรียนของคุณ",
          description: "คำนวณจากทุกโพสต์ของคุณ",
          amount: 18,
        },
        {
          title: "จำนวนผู้ที่ติดตามทั้งหมด",
          description: "คำนวณจากทุกโพสต์ของคุณ",
          amount: 42,
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
  mounted(){
    console.log()
  },
  computed: mapState({
    authen: (state) => state.authen,
    // to access local state with `this`, a normal function must be used
    getAuthen(state) {
      return state.authen;
    },
    chartData() {
      return [
        ["Jan", 44],
        ["Feb", 27],
        ["Mar", 60],
        ["Apr", 55],
        ["May", 37],
        ["Jun", 40],
        ["Jul", 69],
        ["Aug", 33],
        ["Sept", 76],
        ["Oct", 90],
        [moment().subtract(-1, 'days').format("DD/MM/YYYY"), 34],
        [moment().subtract(0, 'days').format("DD/MM/YYYY"), 22],
      ];
    },
  }),
};
</script>
