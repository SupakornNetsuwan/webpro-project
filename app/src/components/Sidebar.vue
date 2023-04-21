<template>
  <div
    v-if="authen"
    className="bgwhite flex flex-col overflow-y-auto h-full"
    ref="sidebar-parent"
  >
    <div
      :class="[
        growProfileBox,
        'sticky top-0 flex transition-all duration-[0.1s] ease-out',
      ]"
    >
      <div
        :class="[
          fadedBG,
          'absolute inset-0 bg-gradient-to-br from-purple-soft to-blue-soft transition-all duration-500',
        ]"
      />
      <div
        :class="[
          removeBorderRadius,
          'relative w-full flex flex-col bg-white p-4 xl:p-6 items-center shadow-lg z-10',
        ]"
      >
        <img
          className="w-20 2xl:w-24 aspect-square rounded-full ring-2 ring-blue-primary ring-offset-2"
          :src="authen.picture"
          alt="avatar"
        />
        <h3 className="text-blue-primary truncate mt-2">{{ authen.name }}</h3>
        <p className="text-gray-3">{{ authen.email }}</p>
      </div>
    </div>
    <div
      className="flex flex-col p-4 flex-1 min-h-[30em] sm:min-h-[35em] xl:min-h-[45em]"
    >
      <div className="flex items-center space-x-1 mt-6">
        <MapIcon class="w-6 h-6 text-black" />
        <h3 className="text-black">เมนู</h3>
      </div>
      <!-- เมนู -->
      <p className="text-gray-4">คุณสามารถไปหน้าต่างๆ ได้จากเมนูดังต่อไปนี้</p>
      <ul className="list-none flex flex-col space-y-2 mt-4">
        <li
          @click="$router.push(route.path)"
          v-for="route in routes"
          :class="checkCurrentRoute(route.name)"
        >
          <div>
            <component :is="route.icon" class="w-6 h-6" />
          </div>
          <h4 className="text-gray-4">{{ route.title }}</h4>
        </li>
      </ul>
      <!-- เมนูส่วนตัว -->
      <div className="mt-auto">
        <div className="w-full h-[1px] bg-gray-2" />
        <ul className="list-none flex flex-col space-y-2 mt-4">
          <li
            @click="$router.push(route.path)"
            v-for="route in privateRoutes"
            :class="checkCurrentRoute(route.name)"
          >
            <div>
              <component :is="route.icon" class="w-6 h-6" />
            </div>
            <h4 className="text-gray-4">{{ route.title }}</h4>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  MapIcon,
  HomeIcon,
  Squares2X2Icon,
  LightBulbIcon,
  UserCircleIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";
import { mapState } from "vuex";

export default {
  components: {
    MapIcon,
    HomeIcon,
    Squares2X2Icon,
    UserCircleIcon,
    FolderIcon,
  },
  data() {
    return {
      scrollAmount: 0,
      routes: [
        {
          title: "หน้าหลัก",
          name: "home",
          path: "/home",
          icon: HomeIcon,
        },
        {
          title: "รวมสรุป",
          name: "summaries",
          path: "/summaries",
          icon: Squares2X2Icon,
        },
        {
          title: "แนะนำพิเศษ",
          name: "suggest",
          path: "/suggest",
          icon: LightBulbIcon,
        },
      ],
      privateRoutes: [
        {
          title: "โปรไฟล์",
          name: "profile",
          path: "/profile",
          icon: UserCircleIcon,
        },
        {
          title: "จัดการสรุปของคุณ",
          name: "summaryManage",
          path: "/summary-manage",
          icon: FolderIcon,
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.$refs["sidebar-parent"].addEventListener("scroll", this.handleScroll);
  },
  beforeunmount() {
    this.$refs["sidebar-parent"].removeEventListener(
      "scroll",
      this.handleScroll
    );
  },
  methods: {
    checkCurrentRoute(optionRouteName) {
      return {
        "cursor-pointer flex items-center space-x-4 p-2 rounded ": true,
        "current-active-route": this.$route.name === optionRouteName,
        "current-inactive-route": this.$route.name !== optionRouteName,
      };
    },
    handleScroll(event) {
      this.scrollAmount = event.target.scrollTop;
    },
  },
  beforeMount() {},
  computed: {
    fadedBG() {
      return this.scrollAmount > 50 ? "opacity-0" : "opacity-100";
    },
    growProfileBox() {
      return this.scrollAmount > 50 ? "p-0" : "p-4";
    },
    removeBorderRadius() {
      return this.scrollAmount > 50 ? "rounded-none" : "rounded-xl";
    },
    ...mapState({
      authen: (state) => state.authen,
      // to access local state with `this`, a normal function must be used
    }),
  },
};
</script>
