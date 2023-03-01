<template>
  <ContentWrapper :noPadding="true">
    <div className="p-4 md:p-8 lg:p-12">
      <h3 className="text-black">รวมโพสต์แบ่งตามวิชา</h3>
      <h5 className="text-gray-3">
        คุณสามารถเข้าถึงสรุปของแต่ละวิชาได้จากที่นี่โดยการ
        เลือกวิชาที่ต้องการค้นหาสรุป หรือ เนื้อหาการเรียน
      </h5>
    </div>
    <div
      className="relative w-full flex justify-center items-center min-h-[18em] bg-gradient-to-br from-purple-soft to-blue-soft"
    >
      <img
        src="../assets/boy-girl-book.png"
        alt="boy-girl-book"
        className="absolute bottom-2 h-[90%] left-12 lg:left-24 opacity-50 lg:opacity-100 pointer-events-none"
      />
      <Combobox
        v-model="selectedSubject"
        className="relative w-full mx-8 lg:mx-0 lg:max-w-[40%] "
        as="div"
      >
        <ComboboxInput
          className="w-full outline-none p-4 box-border text-[14px] 2xl:text-[16px] font-normal border-none shadow-lg rounded-xl"
          @change="handleQueryChange"
        />
        <ComboboxButton
          as="div"
          class="absolute right-0 inset-y-0 flex items-center px-2 cursor-pointer text-gray-3"
        >
          <ChevronUpDownIcon class="w-6 h-6" />
        </ComboboxButton>
        <ComboboxOptions
          className="list-none absolute left-0 right-0 bg-white max-h-[10em] overflow-y-auto mt-1.5 rounded-xl shadow-md"
        >
          <ComboboxOption
            v-for="subjectName in filteredSubject"
            :key="subjectName"
            :value="subjectName"
            v-slot="{ selected, active }"
          >
            <p
              :class="[
                selected
                  ? 'bg-blue-soft text-blue-primary'
                  : 'bg-white hover:bg-gray-1',
                'p-3 cursor-pointer ',
              ]"
            >
              {{ subjectName }}
            </p>
          </ComboboxOption>
        </ComboboxOptions>
      </Combobox>
    </div>
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex justify-between items-end">
        <div>
          <h3>วิชา {{ selectedSubject }}</h3>
          <h5 className="text-blue-primary">
            ผลลัพธ์ {{ this.posts.length }} รายการ
          </h5>
        </div>
        <div
          className="flex relative border border-gray-2 border-solid rounded-md overflow-hidden"
        >
          <label for="fitlerSubject" className="flex text-gray-3 p-2">
            <MagnifyingGlassIcon class="w-6 h-6 self-center" />
            <div class="w-[1px] bg-gray-2 ml-2" />
          </label>
          <input
            type="text"
            name="fitlerSubject"
            id="fitlerSubject"
            v-model="filterPosts"
            className="pr-3 py-2  outline-none border-none text-[14px] 2xl:text-[16px] font-normal "
          />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-2 mt-4" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-8">
        <PostCard v-for="post in posts" :postDetail="post" />
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";

import ContentWrapperVue from "../components/ContentWrapper.vue";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import PostCard from "../components/PostCard.vue";
/* --------------------- Mock API --------------------- */
import postsApi from "../resources/postsApi.json"

export default {
  name: "Summaries",
  components: {
    ContentWrapperVue,
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    PostCard,
  },
  beforeMount() {},
  data() {
    return {
      filterPosts: "", // ส่วนของช่อง Filter โพสต์เท่านั้น
      query: "",
      subject: [],
      selectedSubject: null,
      posts:postsApi
    };
  },
  methods: {
    handleQueryChange(e) {
      this.query = e.target.value;
    },
  },

  mounted() {
    this.subjects = [
      "Database",
      "OOP",
      "ICN",
      "Math for IT",
      "Prob stat",
      "Data structure",
      "PSCP",
      "Undefined",
    ];

    this.selectedSubject = this.subjects[0];
  },
  computed: {
    filteredSubject() {
      return this.query === ""
        ? this.subjects
        : this.subjects.filter((subject) => {
            if (subject.toLowerCase().includes(this.query.toLowerCase()))
              return true;
            return false;
          });
    },
  },
};
</script>
