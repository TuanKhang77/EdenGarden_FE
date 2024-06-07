<template>
  <header>
    <swiper
      v-if="useSwiper && isHomePage"
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="item in currentHeaderContents" :key="item.img">
        <div class="imageWrapper">
          <div
            class="bgCover"
            :style="{
              backgroundImage: 'url(' + item.img + ')',
            }"
          />
          <div class="overlay"></div>
          <div class="text-overlay">
            <p
              class="sm:text-[15px] md:text-[20px] text-[25px] mb-[10px] uppercase font-light"
            >
              {{ item.pContent }}
            </p>
            <h2
              class="sm:text-[22px] md:text-[33px] text-[50px] mb-[20px] uppercase font-bold"
            >
              {{ item.hContent }}
            </h2>
            <router-link
              :to="{ name: item.to }"
              class="cta-button text-[1.2rem] sm:text-base md:text-[1.15rem] hover:bg-white hover:text-[#111]"
              >{{ item.buttonContent }}</router-link
            >
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev sm:hidden" slot="button-prev"></div>
      <div class="swiper-button-next sm:hidden" slot="button-next"></div>
    </swiper>

    <div v-else>
      <div
        class="imageWrapper"
        v-for="item in currentHeaderContents"
        :key="item.img"
      >
        <div
          class="bgCover"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
        />
        <div class="overlay"></div>
        <div class="text-overlay">
          <p
            class="sm:text-[15px] md:text-[20px] text-[25px] mb-[10px] uppercase font-light"
          >
            {{ item.pContent }}
          </p>
          <h2
            class="sm:text-[22px] md:text-[33px] text-[50px] mb-[20px] uppercase font-bold"
          >
            {{ item.hContent }}
          </h2>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import axios from "axios";
import "swiper/css/swiper.css";
import { EventBus } from "@/eventBus/EventBus.js";

export default {
  name: "swiper-example-autoplay",
  title: "Autoplay",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        effect: "fade",
        updateOnWindowResize: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      currentHeaderContents: [],
      useSwiper: true,
      isHomePage: false,
      roomImage: "",
    };
  },
  created() {
    this.updateHeaderContents(this.$route.name);
    EventBus.$on("roomImageChanged", (roomImage) => {
      this.roomImage = roomImage;
    });
    console.log("check image: ", this.roomImage);
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.updateHeaderContents(to.name);
      }
    },
  },
  methods: {
    updateHeaderContents(routeName) {
      axios
        .get("http://localhost:8080/fakeData.json")
        .then((response) => {
          const data = response.data;

          if (routeName === "homePage") {
            this.currentHeaderContents = [
              ...data.homeCategories,
              ...data.locatedCategories,
              ...data.roomsCategories,
              ...data.poolCategories,
              ...data.barCategories,
            ];
            this.useSwiper = true;
            this.isHomePage = true;
          } else {
            switch (routeName) {
              case "roomsNSuite":
                this.currentHeaderContents = data.roomsCategories;
                break;
              case "pool":
                this.currentHeaderContents = data.poolCategories;
                break;
              case "bar":
                this.currentHeaderContents = data.barCategories;
                break;
              case "located":
                this.currentHeaderContents = data.locatedCategories;
                break;
              default:
                // Default header contents
                this.currentHeaderContents = [];
                break;
            }
            this.useSwiper = false;
            this.isHomePage = false;
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
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

.swiper {
  height: auto;
  width: 100%;
}

.swiper-slide {
  position: relative;
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

.cta-button {
  background-color: transparent;
  border: 2px solid white;
  text-transform: uppercase;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: white; /* Màu mũi tên */
  font-size: 2.5rem; /* Kích thước mũi tên */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.swiper-button-prev {
  left: 10px; /* Khoảng cách từ cạnh trái */
}

.swiper-button-next {
  right: 10px; /* Khoảng cách từ cạnh phải */
}
</style>
