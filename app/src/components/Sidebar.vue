<template>
  <div
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
          src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/294882175_1950447848474033_2501928959914313211_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFc5v84XK8pbVevoUXN_escQoqKbTDB4QRCioptMMHhBKdiVjbOhG-Z5b2MKEAjyMOIFhC7s4ItocZ7NbRXvq7_&_nc_ohc=lT4nsq5BmggAX8Z92K7&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfCnoiJy6ZJVEKdM4bUsdSz2P6VkWfGeH6V3MHPHLAnKEg&oe=64032DEC"
          alt="avatar"
        />
        <h3 className="text-blue-primary truncate mt-2">Supakorn Netsuwan</h3>
        <p className="text-gray-3">64070108@kmitl.ac.th</p>
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
  },
};
</script>
