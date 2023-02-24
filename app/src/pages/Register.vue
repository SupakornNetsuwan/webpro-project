<template>
  <div
    className="bg-gray-50 w-full min-h-screen flex flex-col justify-center items-center"
  >
    <Form />
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Form,
    Navbar,
  },
  setup(props) {},
  data() {
    return {};
  },
  methods: {},
};
</script>
