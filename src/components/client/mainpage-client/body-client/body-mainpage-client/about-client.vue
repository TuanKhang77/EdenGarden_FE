<template>
  <section class="aboutSection py-20">
    <div class="container max-w-[1280px] md:max-w-[768px] sm:mx-[10px] flex bg-[#f9f5f2] md:flex-col sm:flex-col">
      <!-- Phần ảnh bên trái -->
      <div class="lg:w-1/2 xl:w-1/2 2xl:w-1/2 lg:pr-[15px] xl:pr-[15px] 2xl:pr-[15px]">
        <swiper class="swiper1" :options="swiperOption">
          <swiper-slide>
            <div class="slide-content">
              <img src="https://gmpremiumhotel.com/UploadFile/A-NEW-GALLERY/GM-Premium-Hotel-Hanoi-6-min.jpg" alt />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-content">
              <img src="https://gmpremiumhotel.com/UploadFile/A-NEW-GALLERY/GM-Premium-Hotel-Hanoi-4-min.jpg" alt />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-content">
              <img src="https://gmpremiumhotel.com/UploadFile/Gallery/New-Year-GM-2-min.jpg" alt />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide-content">
              <img src="https://gmpremiumhotel.com/UploadFile/A-NEW-GALLERY/GM-Premium-Hotel-Hanoi-41-min.jpg" alt />
            </div>
          </swiper-slide>
          <div class="swiper-pagination1 swiper-pagination-white" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- Phần nội dung bên phải -->
      <div class="lg:w-1/2 xl:w-1/2 2xl:w-1/2 lg:pl-[15px] xl:pl-[15px] 2xl:pl-[15px]">
        <div class="p-9">
          <span class="text-[25px] sm:text-base text-[#666] tracking-[6px] uppercase mb-6">
            Về khách sạn
          </span>
          <h1 class="text-[45px] sm:text-[35px] text-[#3D3935] font-semibold mb-4 uppercase">
            Eden Garden
          </h1>
          <div class="text-justify">
            <p class="text-xl">
              Biểu đượng của sự sang trọng ở khu phố cổ Hà Nội. Nằm trong trái tim
              của Phố Hàng Bông cổ kính, khách sạn của chúng tôi có vị trí lý tưởng chỉ cách 300
              Hồ Hoàn Kiếm đẹp như tranh vẽ và chợ đêm vài mét. Chúng tôi
              cung cấp 60 phòng được bài trí đẹp mắt, mỗi phòng đều có phòng riêng
              ban công, tận dụng tối đa ánh sáng tự nhiên
              vũ trụ.
            </p>
            <br />
            <a href="#"
              class="hover:bg-[#d3b5a3] hover:border-[#d3b5a3] text-white bg-black px-4 py-2 text-xl border-black border font-normal tracking-wider">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-loop",
  title: "Loop mode / Infinite loop",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: {
          el: ".swiper-pagination1",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style scoped>
/* Hiển thị pagination tùy chỉnh */
.swiper-pagination1 {
  position: absolute;
  bottom: 10px;
  z-index: 10;
  color: white;
  text-align: center;
}

.swiper1 {
  height: auto;
  width: 100%;
}

.swiper-slide {
  position: relative;
}

.slide-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.slide-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: white;
  /* Màu mũi tên */
  font-size: 1rem;
  position: absolute;
  top: 53%;
  transform: translateY(-50%);
  width: 40px;
  /* Độ rộng của nút */
  height: 40px;
  /* Độ cao của nút */
  border-radius: 100%;
  /* Viền tròn */
  background-color: transparent;
  /* Màu nền trong suốt */
  border: 1px solid white;
  /* Viền trắng cho nút */
  cursor: pointer;
  /* Con trỏ tay */
  display: flex;
  /* Hiển thị như flexbox */
  justify-content: center;
  /* Căn giữa theo chiều ngang */
  align-items: center;
  /* Căn giữa theo chiều dọc */
}
</style>
