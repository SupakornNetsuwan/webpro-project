<template>
  <div>
    <content-wrapper>
      <button
          @click="$event => $router.go(-1)"
          class="flex items-center cursor-pointer border-none bg-transparent pl-0"
        >
          <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
          <h4 class="text-red-primary">กลับ</h4>
        </button>
      <div class="flex justify-between mt-10">
        <h1 class="text-blue-primary">บทที่ 1 ทำไมกาชาพูดมากจัง</h1>
        <subject-tag :subject="'CAT'" />
      </div>
      <p class="my-2">วิธีเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที</p>
      <div class="flex my-2">
        <p>โดย Yolradee Prayoonpunratn</p>
        <p class="text-gray-3">&nbsp;• 64070089@kmitl.ac.th • 22/2/2023</p>
      </div>
      <hr class="my-6 text-gray-2" />
      <button class="w-full space-x-2 flex items-center justify-center bg-white hover:bg-blue-soft text-blue-primary border-blue-primary mb-6 transition-all duration-150">
        <CloudArrowDownIcon class="h-6 text-blue-primary" />
        <h4>ดาวน์โหลดเอกสาร</h4>
      </button>
      <p class="text-gray-4 leading-loose">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate libero perferendis culpa reprehenderit. Culpa ipsa, non temporibus, aliquam esse voluptatem delectus quia nihil voluptatibus, asperiores ea nesciunt quaerat consequatur! Eveniet.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt cum quas voluptatibus voluptatem, harum quasi possimus? Aliquid repellendus sunt, quaerat, deleniti delectus quo est modi deserunt quasi magni natus et.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui atque minima eos iusto totam repellendus quidem cum alias cumque. Impedit vel sit aut dolorem asperiores sequi vero consequuntur nihil quae.
      </p>
      <div class="flex items-center justify-center my-10">
        <img class="h-80" src="../assets/kacha2.jpg" />
      </div>
      <p class="text-gray-4 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate libero perferendis culpa reprehenderit. Culpa ipsa, non temporibus, aliquam esse voluptatem delectus quia nihil voluptatibus, asperiores ea nesciunt quaerat consequatur! Eveniet.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt cum quas voluptatibus voluptatem, harum quasi possimus? Aliquid repellendus sunt, quaerat, deleniti delectus quo est modi deserunt quasi magni natus et.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui atque minima eos iusto totam repellendus quidem cum alias cumque. Impedit vel sit aut dolorem asperiores sequi vero consequuntur nihil quae.
      </p>
    </content-wrapper>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentWrapper from '../components/ContentWrapper.vue';
import { ChevronLeftIcon} from "@heroicons/vue/24/outline";
import {CloudArrowDownIcon } from "@heroicons/vue/24/outline";
export default {
  name: "Lesson",
  components: {
    ChevronLeftIcon,
    ContentWrapper,
     CloudArrowDownIcon
  },
  created() {
    // console.log(this.$route.params);
  },
  data() {
    return {};
  },
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
