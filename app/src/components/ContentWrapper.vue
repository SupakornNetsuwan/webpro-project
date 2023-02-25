<template>
  <div className="p-4 md:p-8 lg:p-12 m-2 bg-white rounded-lg shadow-md">
    <slot />
  </div>
</template>
<script>
export default {
  name: "ContentWrapper",
  data() {
    return {};
  },
};
</script>
