<template>
  <div class="bg-red-soft w-fit h-fit rounded-xl items-center px-2">
    <p class="text-red-primary text-center">วิชา {{ subject }}</p>
  </div>
</template>

<script>
export default {
  name: "subjectTag",
  props: {
    subject: String,
  },
};
</script>

<style>
p {
  font-weight: 500 !important;
}
</style>
