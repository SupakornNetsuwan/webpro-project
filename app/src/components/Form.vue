<template>
  <div className="flex flex-col  w-5/12 max-w-[50em]">
    <form
      @submit.prevent="handleSubmit"
      ref="form"
      className="flex flex-col space-y-4 bg-white shadow-lg p-8 rounded-lg"
    >
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-slate-600" for="firstname"
          >Gender</label
        >
        <div>
          <a-select
            style="margin: 0; width: 100%"
            ref="select"
            v-model:value="gender"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="make">Male</a-select-option>
            <a-select-option value="female">Female</a-select-option>
            <a-select-option value="none">None in above</a-select-option>
          </a-select>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-slate-600" for="firstname"
          >Firstname</label
        >
        <a-input v-model:value="firstname" name="firstname" id="firstname" />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="font-medium text-slate-600" for="lastname"
          >Lastname</label
        >
        <a-input v-model:value="lastname" name="firstname" id="firstname" />
      </div>
      <div>
        <button
          className="w-full px-2 py-2 bg-blue-500 rounded  flex justify-center items-center space-x-1  font-medium text-white cursor-pointer"
        >
          <div className="w-5 h-5">
            <SparklesIcon />
          </div>
          <span>Submit</span>
        </button>
      </div>
    </form>
    <div className="bg-white p-4 rounded-lg mt-4 border border-slate-300">
      <p>Gender : {{ gender || "-" }}</p>
      <p>Firstname : {{ firstname || "-" }}</p>
      <p>Lastname : {{ lastname || "-" }}</p>
    </div>
  </div>
</template>
<script>
import { SparklesIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Form",
  components: {
    SparklesIcon,
  },
  data() {
    return {
      gender: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    handleChange(e) {
      //   console.log(e);
    },
    focus(e) {
      //   console.log(e);
    },
    handleSubmit(e) {
      alert("submit");
    },
  },
  watch: {
    gender(gender, prev) {
      console.log(gender, prev);
    },
  },
};
</script>
