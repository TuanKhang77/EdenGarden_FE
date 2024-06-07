<template>
  <div
    class="roomsNSuite relative container sm:px-[10px] sm:max-w-[400px] md:max-w-[739px] 2xl:max-w-[1280px] lg:max-w-[1280px] py-12 grid gap-8 md:grid-cols-1 sm:grid-cols-1 grid-cols-2">
    <div class="relative overflow-hidden" v-for="item in rooms" :key="item.title">
      <div class="relative overflow-hidden">
        <router-link class="block bg-cover bg-repeat bg-center bg-[#333] min-h-[18rem]" :to="{
      name: 'roomDetail',
      params: {
        roomName: item.roomName,
      },
    }" :style="{ backgroundImage: 'url(' + item.bgimg + ')' }">
        </router-link>
      </div>
      <div class="bg-white p-6">
        <p class="fixTitle text-[20px] text-left text-[#3d3935] leading-[150%] font-normal mb-5">
          {{ item.title }}
        </p>
        <h1 class="text-left mb-5">
          <router-link class="text-[26px] text-[#3d3935] leading-[150%] font-semibold" :to="{ name: 'homePage' }">
            {{ item.roomName }}
          </router-link>
        </h1>
        <hr class="mb-5" />
        <div class="flex items-center justify-between">
          <router-link class="flex items-center justify-center" :to="{ name: 'homePage' }">
            <span
              class="tracking-wider px-4 py-2 border border-[#d3b5a3] hover:border-[#111] hover:text-white hover:bg-[#111] bg-[#d3b5a3] uppercase">
              Đặt ngay
            </span>
          </router-link>
          <router-link class="flex items-center justify-center"
            :to="{ name: 'roomDetail', params: { roomName: item.roomName } }">
            <span
              class="flex items-center justify-center hover:border-[#111] hover:bg-[#111] hover:text-white tracking-wider border border-black px-4 py-2 uppercase">
              Chi tiết
              <i class="pl-2">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                </svg>
              </i>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    Axios.get("http://localhost:8080/fakeData.json")
      .then((Response) => {
        this.rooms = Response.data.roomsCategories[0].rooms;
      })
      .catch((Error) => {
        console.error("lỗi: ", Error);
      });
  },
};
</script>

<style scoped>
.fixTitle {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
</style>
