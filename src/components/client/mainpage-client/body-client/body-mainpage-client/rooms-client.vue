<template>
  <section class="roomsClient py-12 bg-[#f9f5f2]">
    <div class="text-center flex justify-center items-center">
      <div class="container">
        <span class="text-xl leading-[150%] text-[#666666] uppercase relative tracking-[6px]">
          Rooms & Suite
        </span>
        <div class="flex justify-center items-center mt-7">
          <router-link class="flex justify-center items-center" :to="{ name: 'roomsNSuite' }">
            <div
              class="px-4 py-2 flex items-center justify-center text-2xl font-normal tracking-wider bg-transparent uppercase text-[#191617] hover:text-white hover:bg-[#191617] border border-[#191617]">
              Chi tiết loại phòng
              <i class="pl-2">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                </svg>
              </i>
            </div>
          </router-link>
        </div>
        <div class="roomsContainer sm:px-[10px]">
          <swiper class="swiper2" :options="swiperOption">
            <swiper-slide v-for="item in rooms" :key="item.title">
              <div class="relative overflow-hidden">
                <div class="relative overflow-hidden">
                  <div class="block bg-cover bg-repeat bg-center bg-[#333] min-h-[18rem]"
                    :style="{ backgroundImage: 'url(' + item.bgimg + ')' }"></div>
                </div>
                <div class="bg-white p-6">
                  <p class="fixTitle text-[20px] text-left text-[#3d3935] leading-[150%] font-normal mb-5">
                    {{ item.title }}
                  </p>
                  <h1 class="text-left mb-5">
                    <router-link class="text-[26px] text-[#3d3935] leading-[150%] font-semibold" :to="{
            name: 'roomDetail',
            params: { roomName: item.roomName },
          }">
                      {{ item.roomName }}
                    </router-link>
                  </h1>
                  <hr class="mb-5" />
                  <div class="flex items-center justify-between">
                    <router-link class="flex items-center justify-center" :to="{ name: 'bookingRoom' }">
                      <span
                        class="tracking-wider px-4 py-2 border border-[#d3b5a3] hover:border-[#111] hover:text-white hover:bg-[#111] bg-[#d3b5a3] uppercase">
                        Đặt ngay
                      </span>
                    </router-link>
                    <router-link class="flex items-center justify-center" :to="{
            name: 'roomDetail',
            params: { roomName: item.roomName },
          }">
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
            </swiper-slide>
            <div class="swiper-button-prev sm:hidden" slot="button-prev"></div>
            <div class="swiper-button-next sm:hidden" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Axios from "axios";

export default {
  name: "swiper-example-loop-group",
  title: "Loop mode with multiple slides per group",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
            allowSlideNext: true,
            allowSlidePrev: true,
            allowTouchMove: true,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
            allowSlideNext: true,
            allowTouchMove: true,
            allowSlidePrev: true,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
            allowSlideNext: true,
            allowTouchMove: true,
            allowSlidePrev: true,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
            allowSlideNext: true,
            allowTouchMove: true,
            allowSlidePrev: true,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            allowSlideNext: true,
            allowTouchMove: true,
            allowSlidePrev: true,
          },
        },
      },
      rooms: [],
    };
  },
  created() {
    Axios.get("http://localhost:8080/fakeData.json")
      .then((Response) => {
        this.rooms = Response.data.roomsCategories[0].rooms.map(
          ({ id, roomName, title, bgimg }) => ({
            id,
            roomName,
            title,
            bgimg,
          })
        );
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

.roomsContainer {
  margin-top: 1.5rem;
  position: relative;
}

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
</style>
