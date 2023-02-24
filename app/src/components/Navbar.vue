<template>
  <div
    className="sticky top-0 left-0 w-full bg-white border-b border-slate-200 px-8 py-2.5 flex items-center justify-between"
  >
    <h1
      className="bg-gradient-to-br from-emerald-900 text-transparent to-emerald-500 bg-clip-text font-bold m-0"
    >
      Vue.test
    </h1>
    <ul className="list-none flex m-0 space-x-4">
      <li className="text-lg">
        <router-link class="text-gray-500 hover:text-gray-700" to="/"
          >Home</router-link
        >
      </li>
      <li className="text-lg">
        <router-link class="text-gray-500 hover:text-gray-700" to="/register"
          >Register</router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>
