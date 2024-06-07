<template>
  <section class="restaurantNBar py-12">
    <div class="text-center">
      <div class="container max-w-[1280]">
        <span class="text-xl leading-[150%] text-[#666666] uppercase relative tracking-[6px]">
          RESTAURANT & BAR
        </span>
        <div class="restNBarContainer sm:px-[10px]">
          <swiper class="swiper3" :options="swiperOption">
            <swiper-slide v-for="item in restNBar" :key="item.bgImg">
              <div class="imageWrapper">
                <div class="bgCover" :style="{ backgroundImage: item.bgImg }" />
                <div class="slideContent">
                  <span class="text-base font-normal">
                    {{ item.titleSpan }}
                  </span>
                  <span class="text-[2.5rem] font-normal">
                    {{ item.titleH }}
                  </span>
                  <router-link :to="{ name: item.to }"
                    class="flex justify-center items-center bg-white mt-5 px-6 py-2 rounded-3xl hover:bg-[#FAF3E3]">
                    <span class="text-[#242021] font-extralight text-base">
                      Chi tiết
                    </span>
                  </router-link>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-responsive-breakpoints",
  title: "Responsive breakpoints",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      restNBar: [
        {
          titleSpan: "Buffet hàng ngày",
          titleH: "Breakfast",
          bgImg:
            "url(https://gmpremiumhotel.com/UploadFile/Breakfast/Breakfast-3-min.jpg)",
          to: "homePage",
        },
        {
          titleSpan: "Opening Soon",
          titleH: "Sky Brunch & Bar",
          to: "homePage",
          bgImg:
            "url(https://gmpremiumhotel.com/UploadFile/Grill-Restaurant/Breakfast-18-min.jpg)",
        },
        {
          titleSpan: "Panoramic City View",
          titleH: "Solar Bar",
          to: "homePage",
          bgImg: "url(http://localhost:8080/hotel-bar.jpg)",
        },
      ],
      swiperOption: {
        breakpoints: {
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
            allowSlideNext: false,
            allowSlidePrev: false,
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
    };
  },
};
</script>

<style lang="css" scoped>
.slideContent {
  margin-top: 0;
  position: absolute;
  height: 100%;
  color: #fff;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  padding: 0 24px 26px;
}

.swiper3 {
  height: 534px;
  /* Đặt chiều cao cố định cho swiper */
  width: 100%;
  max-width: 1280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}

.swiper-pagination-bullet-active {
  background: #333;
}

.restNBarContainer {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
  height: 534px;
  width: 100%;
}
</style>
