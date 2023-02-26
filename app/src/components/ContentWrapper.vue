<template>
  <div :class="['m-2 bg-white rounded-lg shadow-md', noPaddingCheck()]">
    <slot />
  </div>
</template>
<script>
export default {
  name: "ContentWrapper",
  props: {
    noPadding: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    noPaddingCheck() {
      return this.noPadding ? "" : "p-4 md:p-8 lg:p-12"
    },
  },
};
</script>
