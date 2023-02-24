<template>
  <div className="bg-white">
    <div className="flex p-4 bg-gradient-to-br from-purple-soft to-blue-soft">
      <div
        className="w-full flex flex-col bg-white p-4 xl:p-6 items-center rounded-xl shadow-lg"
      >
        <img
          className="w-20 2xl:w-24 aspect-square rounded-full ring-2 ring-blue-primary ring-offset-2"
          src="https://scontent.fbkk7-3.fna.fbcdn.net/v/t39.30808-6/294882175_1950447848474033_2501928959914313211_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFc5v84XK8pbVevoUXN_escQoqKbTDB4QRCioptMMHhBKdiVjbOhG-Z5b2MKEAjyMOIFhC7s4ItocZ7NbRXvq7_&_nc_ohc=Hjk6_YJCNtcAX8jwNY-&_nc_ht=scontent.fbkk7-3.fna&oh=00_AfBVgPjqjVt_gBQ-p32YeB9NmwSmZmEdKTgxNFvQ7lhdhw&oe=63FD3F2C"
          alt="avatar"
        />
        <h3 className="text-blue-primary truncate mt-2">Supakorn Netsuwan</h3>
        <p className="text-gray-3">64070108@kmitl.ac.th</p>
      </div>
    </div>
    <div className="flex flex-col p-4">
      <div className="flex items-center space-x-1">
        <MapIcon class="w-6 h-6 text-black" />
        <h3 className="text-black">เมนู</h3>
      </div>
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
    </div>
  </div>
</template>
<script>
import { MapIcon, HomeIcon, Squares2X2Icon, LightBulbIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    MapIcon,
    HomeIcon,
    Squares2X2Icon,

  },
  created() {},
  methods: {
    checkCurrentRoute(optionRouteName) {
      return {
        "cursor-pointer flex items-center space-x-4 p-2 rounded ": true,
        "current-active-route": this.$route.name === optionRouteName,
        "current-inactive-route": this.$route.name !== optionRouteName,
      };
    },
  },
  computed: {},
  data() {
    return {
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
    };
  },
};
</script>
