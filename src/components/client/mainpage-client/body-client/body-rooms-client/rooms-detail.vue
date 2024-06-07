<template>
  <div class="roomsDetail">
    <div>
      <div class="imageWrapper">
        <div class="bgCover" :style="{ backgroundImage: 'url(' + roomDataFilter.bgimg + ')' }" />
        <div class="overlay"></div>
        <div class="text-overlay">
          <h2 class="sm:text-[22px] md:text-[33px] text-[50px] mb-[20px] uppercase font-bold">
            {{ roomDataFilter.roomName }}
          </h2>
        </div>
      </div>
    </div>
    <div class="py-20 sm:px-[10px] md:px-[20px]">
      <div class="container max-w-[1280px]">
        <div class="description">
          <p class="text-[#3d3935] font-bold text-2xl mb-[20px]">
            Descriptions
          </p>
          <p class="text-[#3d3935] text-xl text-justify">
            {{ roomDataFilter.description }}
          </p>
          <br v-if="roomDataFilter.description2" />
          <p v-if="roomDataFilter.description2" class="text-[#3d3935] text-xl text-justify">
            {{ roomDataFilter.description2 }}
          </p>
        </div>
        <hr class="text-[#d3b5a3] border border-solid my-[45px]" />
        <div class="inforRoom">
          <ul class="flex flex-wrap sm:flex-col">
            <li v-if="roomDataFilter.inforRoom.size"
              class="text-[#d3b5a3] w-1/2 mb-3 flex items-center whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M512 128V32c0-17.7-14.3-32-32-32h-96c-17.7 0-32 14.3-32 32H160c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32v96c0 17.7 14.3 32 32 32v192c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32h192c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32V160c17.7 0 32-14.3 32-32zm-96-64h32v32h-32V64zM64 64h32v32H64V64zm32 384H64v-32h32v32zm352 0h-32v-32h32v32zm-32-96h-32c-17.7 0-32 14.3-32 32v32H160v-32c0-17.7-14.3-32-32-32H96V160h32c17.7 0 32-14.3 32-32V96h192v32c0 17.7 14.3 32 32 32h32v192z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.size }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.bed"
              class="text-[#d3b5a3] w-1/2 mb-3 flex items-center whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor"
                    d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.bed }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.bathroom"
              class="text-[#d3b5a3] flex items-center w-1/2 mb-3 whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.bathroom }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.smok"
              class="text-[#d3b5a3] flex items-center w-1/2 mb-3 whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor"
                    d="M448 32V43c0 38.2 15.2 74.8 42.2 101.8l21 21c21 21 32.8 49.5 32.8 79.2v11c0 17.7-14.3 32-32 32s-32-14.3-32-32V245c0-12.7-5.1-24.9-14.1-33.9l-21-21C405.9 151.1 384 98.1 384 43V32c0-17.7 14.3-32 32-32s32 14.3 32 32zM576 256V245c0-38.2-15.2-74.8-42.2-101.8l-21-21c-21-21-32.8-49.5-32.8-79.2V32c0-17.7 14.3-32 32-32s32 14.3 32 32V43c0 12.7 5.1 24.9 14.1 33.9l21 21c39 39 60.9 91.9 60.9 147.1v11c0 17.7-14.3 32-32 32s-32-14.3-32-32zM0 416c0-35.3 28.7-64 64-64H416c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H64c-35.3 0-64-28.7-64-64V416zm224 0v32H384V416H224zm288-64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32zm96 0c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.smok }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.max"
              class="text-[#d3b5a3] flex items-center w-1/2 mb-3 whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="currentColor"
                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.max }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.view"
              class="text-[#d3b5a3] flex items-center w-1/2 mb-3 whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="currentColor"
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.view }}
              </span>
            </li>
            <li v-if="roomDataFilter.inforRoom.uniqueFeatures"
              class="text-[#d3b5a3] flex items-center w-1/2 mb-3 whitespace-nowrap">
              <i>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
                </svg>
              </i>
              <span class="pl-3 text-[#3d3935] text-xl">
                {{ roomDataFilter.inforRoom.uniqueFeatures }}
              </span>
            </li>
          </ul>
        </div>
        <hr class="text-[#d3b5a3] border border-solid my-[45px]" />
        <div class="imgRoom">
          <swiper class="swiper2" :options="swiperOption">
            <swiper-slide v-for="item in roomDataFilter.imgRoom" :key="item.img">
              <div class="relative overflow-hidden">
                <div class="relative overflow-hidden">
                  <div class="block bg-cover bg-repeat bg-center bg-[#333] min-h-[18rem]"
                    :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev sm:hidden" slot="button-prev"></div>
            <div class="swiper-button-next sm:hidden" slot="button-next"></div>
          </swiper>
        </div>
        <hr class="text-[#d3b5a3] border border-solid my-[45px]" />
        <div class="inclusions">
          <div class="flex flex-col">
            <p class="text-[#3d3935] font-bold text-2xl mb-[20px]">
              Inclusions
            </p>
            <ul class="flex flex-col space-y-2 list-disc pl-4">
              <li v-for="item in roomDataFilter.servicesRoom" :key="item.service" class="">
                <p class="text-[#3d3935] text-xl text-justify">
                  {{ item.service }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <hr class="text-[#d3b5a3] border border-solid my-[45px]" />
        <div class="inclusions">
          <div class="flex flex-col">
            <p class="text-[#3d3935] font-bold text-2xl mb-[20px]">Amenities</p>
            <ul class="flex flex-col space-y-2 list-disc pl-4">
              <li v-for="item in roomDataFilter.amenitiesRoom" :key="item.amenity" class="">
                <p class="text-[#3d3935] text-xl text-justify">
                  {{ item.amenity }}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8">
          <router-link
            class="px-6 py-2 bg-[#d3b5a3] uppercase border-[#d3b5a3] hover:border-[#d3b5a3] text-lg hover:bg-[#111] hover:text-white border border-transparent border-solid"
            :to="{
          name: 'bookingRoom',
          params: { roomName: room },
        }">
            Đặt ngay
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Axios from "axios";
export default {
  props: ["roomName"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      room: String(this.$route.params.roomName),
      roomData: [],
      swiperOption: {
        centeredSlides: false,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1280: {
            slidesPerView: 2,
            spaceBetween: 30,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
        },
      },
    };
  },
  created() {
    Axios.get("http://localhost:8080/fakeData.json")
      .then((Response) => {
        this.roomData = Response.data.roomsCategories[0].rooms;
      })
      .catch((Error) => {
        console.error("lỗi: ", Error);
      });
  },
  computed: {
    roomDataFilter() {
      return this.roomData.find((item) => item.roomName === this.roomName);
    },
  },
};
</script>

<style scoped>
.swiper2 {
  width: 100%;
  height: auto;
  max-width: 1280px;
  position: relative;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px;
  background-color: #d3b5a3;
  color: white;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border-radius: 9999px;
  z-index: 10;
}

.swiper-button-prev {
  left: 15px;
}

.swiper-button-next {
  right: 15px;
}

.roomDetail {
  max-width: 1280px;
  padding: 20px 0;
}

.imageWrapper {
  overflow: hidden;
  display: block;
  position: relative;
  opacity: 1;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

.bgCover {
  background-position: center center;
  background-size: cover;
  background-color: #333;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: white;
  text-align: center;
}
</style>
