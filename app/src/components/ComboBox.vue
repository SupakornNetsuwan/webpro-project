<template>
  <Combobox
    v-on:update:model-value="changeChosenItem"
    :model-value="chosenListItem"
    className="relative w-full"
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
        v-for="item in filtered"
        :key="item"
        :value="item"
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
          {{ item }}
        </p>
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>
<script>
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/outline";

export default {
  name: "combobox",
  props: ["list", "chosenListItem"],
  components: {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton,
    ChevronUpDownIcon,
  },
  data() {
    return {
      query: "",
    };
  },
  mounted() {},
  methods: {
    handleQueryChange(e) {
      this.query = e.target.value;
    },
    changeChosenItem(e) {
      this.$emit("changeList", e);
    },
  },
  watch: {
    list(e) {
      console.log(e);
    },
  },
  computed: {
    filtered() {
      return this.query === ""
        ? this.list
        : this.list.filter((subject) => {
            return subject.toLowerCase().includes(this.query.toLowerCase())
              ? true
              : false;
          });
    },
  },
};
</script>
