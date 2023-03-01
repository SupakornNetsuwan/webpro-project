<template>
  <Teleport to="#modal">
    <div
      v-show="isModalOpen"
      @click="closeModal"
      className="fixed flex items-center justify-center inset-0 bg-gray-500/50 z-40 backdrop-blur-sm"
    >
      <div
        className="w-full mx-12 md:mx-0 md:max-w-[20em] bg-white p-4 rounded-md border-solid  border-gray-200"
      >
        <slot>
          <p className="text-gray-3">
            {{ content || "No content" }}
          </p>
          <div class="h-[1px] bg-gray-2 my-4" />
          <button
          @click="redirectOrNot"
            class="flex items-center space-x-1 px-4 py-2 transition-all duration-300 bg-blue-primary border-blue-primary text-white float-right"
          >
            ยืนยัน
          </button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: mapState({
    isModalOpen: (state) => state.modal.isModalOpen,
    content: (state) => state.modal.content,
    redirectTo: (state) => state.modal.redirectTo,
    // to access local state with `this`, a normal function must be used
  }),
  methods: {
    closeModal() {
      
        this.$store.commit("setIsModalOpen", {
          isModalOpen: false,
          content: "",
          redirectTo:""
        })
      
    },
    redirectOrNot(){
      if(this.redirectTo){
        this.$router.push(this.redirectTo)
      }
    }
  },
  watch: {},
};
</script>
