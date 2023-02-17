<template>
  <div>
    <h2>Hello world</h2>
    <a-button type="primary">Primary Button</a-button>
  </div>
</template>

<script>
export default {
  watch: {
    counter(newValue, oldValue) {
      console.log(newValue);
    },
  },
  setup(props) {},
  beforeCreate() {
    console.log("before created");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("before mount");
  },
  mounted() {
    console.log("mounted");
  },
  data() {
    return {
      message: "Hello World",
    };
  },
  methods: {},
};
</script>
