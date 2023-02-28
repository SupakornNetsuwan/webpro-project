<template>
  <div className="w-full flex min-h-screen flex-col bg-gray-1">
    <ContentWrapper>
      <button
        @click="($event) => $router.go(-1)"
        class="flex items-center cursor-pointer border-none bg-transparent pl-0"
      >
        <ChevronLeftIcon class="h-5 w-5 text-red-primary" />
        <h4 class="text-red-primary">กลับ</h4>
      </button>

      <h1 className="text-black  mt-10">
        วิธีการเลี้ยงกาชาแบบง่ายๆ เข้าใจได้ใน 1 นาที
      </h1>
      <h4 className="text-gray-3">
        เลือกวิชาที่ต้องการสร้างโพสต์ และ ลงบทเรียน เพื่อแบ่งปันเนื้อหา หรือ
        สรุป
      </h4>
      <div class="h-[1px] bg-gray-2 my-8" />
      <div className="md:max-w-[50%]">
          <div>
            <h4 className="text-black">หัวข้อโพสต์<span className="text-red-primary">*</span></h4>
            <input type="text" id="post-topic" name="post-topic" className="p-2 px-3 outline-none rounded bg-gray-50/50 border border-gray-3 border-solid mt-2 text-lg text-black w-full md:max-w-[70%]"/>
            </div>
          <div>
              <h4 className="text-black mt-8">วิชา*<span className="text-red-primary">*</span></h4>
              <input type="text" id="post-topic" name="post-topic" className="p-2 px-3 outline-none rounded bg-gray-50/50 border border-gray-3 border-solid mt-2 text-lg text-black w-full md:max-w-[70%]"/>
          </div>
          <div>
              <h4 className="text-black mt-8">เนื้อหาเกริ่น*<span className="text-red-primary">*</span></h4>
              <p className="text-gray-3 w-full">เนื้อหาเกริ่นนำสำหรับโพสต์ของคุณ ลองอธิบายว่าโพสต์ของคุณจะมีการแนะนำเนื้อหาใดบ้างในอนาคต</p>          
              <QuillEditor theme="snow" toolbar="minimal"/>
            </div>
            <div>
                <h4 className="text-black mt-8">ภาพปก<span className="text-red-primary">*</span></h4>
                <p className="text-gray-3 w-full">เลือกภาพปกสำหรับโพสต์ใหม่ของคุณ</p>          
                <div className="bg-blue-soft p-4 text-center text-blue-primary mt-4 rounded">
                    เลือกภาพปก
                </div>
          </div>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import ContentWrapper from "../components/ContentWrapper.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
export default {
  components: {
    ContentWrapper,
    ChevronLeftIcon,
  },
  data() {
    return {};
  },
};
</script>
