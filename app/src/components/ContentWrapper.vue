<template>
  <div class="overflow-auto">
    <div :class="['m-2 bg-white rounded-lg shadow-md',minWidthCheck(), noPaddingCheck()]">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "ContentWrapper",
  props: {
    noPadding: Boolean,
    minWidth: String
  },
  data() {
    return {};
  },
  methods: {
    minWidthCheck(){
      return this.minWidth ? `min-w-[${this.minWidth}]` : "";
    },
    noPaddingCheck() {
      return this.noPadding ? "" : "p-4 md:p-8 lg:p-12";
    },
  },
};
</script>
