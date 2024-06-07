<template>
  <nav class="navbar fixed px-[10px] sm:bg-[#111] md:bg-[#111] lg:bg-[#111]" :class="{ active: isScrolled }">
    <!-- thanh nav bar -->
    <div class="!relative container">
      <div class="flex items-center justify-center">
        <div class="divChild items-center justify-start flex">
          <button @click="toggleSidebar" class="flex font-semibold items-center">
            <i class="">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                class="w-[1.75rem] h-[1.75rem] text-white" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M2 19.5A1.5 1.5 0 013.5 18h6a1.5 1.5 0 010 3h-6A1.5 1.5 0 012 19.5ZM2 12a1.5 1.5 0 
                                    011.5-1.5h11a1.5 1.5 0 010 3h-11A1.5 1.5 0 012 12Zm0-7.5A1.5 1.5 0 013.5 3h17a1.5 1.5 0 010 3h-17A1.5 1.5 0 012 4.5Z"
                  opacity=".99" />
              </svg>
            </i>
            <span class="ml-[10px] text-3xl uppercase leading-[150%] text-white sm:hidden md:hidden">
              Menu
            </span>
          </button>
        </div>
        <div class="divChild items-center flex">
          <div class="logoWrapper flex items-center whitespace-nowrap">
            <router-link :to="{ name: 'homePage' }">
              <div class="py-[10px] text-center">
                <img class="md:w-[90px] sm:w-[70px] lg:w-[100px]" src="@/assets/logo-edengarden-nobuffer.png" alt
                  :class="{
    'logo-small': isScrolled,
    'logo-large': !isScrolled,
  }" />
              </div>
            </router-link>
          </div>
        </div>
        <div class="divChild items-center flex justify-end space-x-2">
          <a class="leading-[150%] items-center px-[15px] pt-[4px] pb-[3px] bg-[#ECECEC] flex md:hidden sm:hidden"
            href="tel:+84988590818">
            <i class="">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-5 h-5"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="#333" fill-rule="evenodd"
                  d="M9.784 12.973a41.274 41.274 0 01-1.7-1.806 1.1 1.1 0 01.287-1.684l1.685-.973a1.21 1.21 0 00.444-1.655L7.47 1.606a1.212 1.212 0 00-1.656-.443L1.615 3.587a1.21 1.21 0 00-.596.882c-.062.312.038.888.14 1.224a24.742 24.742 0 006.054 9.85 24.731 24.731 0 0011.76 6.593l.002-.002a1.213 1.213 0 001.27-.586l2.425-4.199a1.212 1.212 0 00-.444-1.655l-5.248-3.03a1.212 1.212 0 00-1.656.443L14.15 15.14a1.101 1.101 0 01-1.66.308 41.113 41.113 0 01-2.705-2.474Z"
                  clip-rule="evenodd" />
              </svg>
            </i>
            <span class="ml-2 text-[#333] leading-[150%] text-[19px] lg:text-[17px]" disabled>
              (+84) 98 8590818
            </span>
          </a>
          <!-- thẻ này sau thay thành router link khi đã dựng xong màn booking -->
          <router-link :to="{ name: 'bookingRoom' }"
            class="bg-[#D3B5A3] px-[15px] py-[6.5px] sm:px-[13px] sm:py-[2px] flex items-center hover:bg-[#8E1C01]">
            <span class="text-[15px] uppercase font-semibold text-white tracking-wide lg:text-[13px] whitespace-nowrap">
              Đặt ngay
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- menu side bar -->
    <transition-group tag="div" name="sidebar-transition">
      <div v-if="situationSideBar" :key="sideBarMenu[0].menuItem"
        class="sideBar space-y-4 sm:w-[100%] md:w-[25rem] lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem]"
        :class="{ active: situationSideBar }">
        <!-- button close side bar -->
        <button @click="toggleSidebar" class="text-white right-0 top-0 absolute buttonClose hover:bg-slate-600">
          <div class="flex items-center justify-center">
            <i class="">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M17.657 19.778a1.5 1.5 0 002.121-2.121L14.121 12l5.657-5.657a1.5 1.5 0 00-2.121-2.121L12 9.879 6.343 
                                4.222a1.5 1.5 0 10-2.121 2.121L9.879 12l-5.657 5.657a1.5 1.5 0 002.121 2.121L12 14.121l5.657 5.657Z" />
              </svg>
            </i>
          </div>
        </button>
        <!-- logo -->
        <div class="flex items-center justify-center">
          <img class="w-[170px]" src="@/assets/logo-edengarden-nobuffer.png" alt />
        </div>
        <!-- menu side bar -->
        <div class="flex items-center justify-center">
          <ul class="flex items-center justify-center flex-col space-y-2">
            <li v-for="item in sideBarMenu" :key="item.menuItem" class="py-2 text-white hover:text-[#D2B48C]">
              <div v-if="!item.subMenu" class="flex items-center justify-center">
                <router-link :to="{ name: item.to }">
                  <span class="menuIcon" :style="item.menuIcon"></span>
                  <span class="ml-[10px] text-[18px] font-medium tracking-wider uppercase hover:text-[#D2B48C]">
                    {{ item.menuItem }}
                  </span>
                </router-link>
              </div>
              <div v-else class="flex items-center justify-center cursor-pointer">
                <router-link :to="{ name: item.to }">
                  <span class="menuIcon" :style="item.menuIcon"></span>
                  <span class="ml-[10px] text-[18px] font-medium tracking-wider uppercase hover:text-[#D2B48C]">
                    {{ item.menuItem }}
                  </span>
                </router-link>
                <span @click="openSubMenu(item)"
                  class="text-white hover:text-[#D2B48C] hover:bg-[#333] absolute right-[30px] top-[15.55rem] flex cursor-pointer w-6 h-6 items-center justify-center rounded-full">
                  <svg class="svgStyle" :class="{
    svgUp: item.showSubMenu,
    svgDown: !item.showSubMenu,
  }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                  </svg>
                </span>
              </div>

              <transition-group tag="div" name="slide-down">
                <ul v-if="item.showSubMenu" :key="item.menuItem" class="text-center space-y-1 px-4 py-2 h-[360px]">
                  <li v-for="subItem in item.subMenu" :key="subItem.id"
                    class="py-1 cursor-pointer text-white hover:text-[#D2B48C]">
                    <router-link :to="{
    name: 'roomDetail',
    params: { roomName: subItem.roomName },
  }">
                      <span class="text-[16px] font-medium tracking-wider">
                        {{ subItem.roomName }}
                      </span>
                    </router-link>
                  </li>
                </ul>
              </transition-group>
            </li>
          </ul>
        </div>
      </div>
    </transition-group>

    <!-- overlay -->
    <div v-show="situationSideBar" @click="toggleSidebar" class="sidebar-overlay"></div>
  </nav>
</template>

<script>
import Axios from "axios";
export default {
  created() {
    Axios.get("http://localhost:8080/fakeData.json")
      .then((response) => {
        const roomsData = response.data.roomsCategories[0].rooms; // Lấy mảng rooms từ roomsCategories

        // Tìm mục "Rooms & Suite" trong sideBarMenu và cập nhật subMenu của nó
        const roomsMenu = this.sideBarMenu.find(
          (item) => item.menuItem === "Rooms & Suite"
        );
        if (roomsMenu) {
          roomsMenu.subMenu = roomsData.map(({ id, roomName }) => ({
            id,
            roomName,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  data() {
    return {
      sideBarMenu: [
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/home-w.png);",
          menuItem: "Trang chủ",
          to: "homePage",
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/room-w.png);",
          menuItem: "Rooms & Suite",
          to: "roomsNSuite",
          showSubMenu: false,
          subMenu: [],
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/restaurant-w.png);",
          menuItem: "Restaurant & bar",
          to: "homePage",
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/offer-w.png);",
          menuItem: "Ưu đãi đặc biệt",
          to: "homePage",
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/spa-w.png);",
          menuItem: "Senses Massage",
          to: "homePage",
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/services-w.png);",
          menuItem: "Dịch vụ",
          to: "homePage",
        },
        {
          menuIcon:
            "background-image: url(https://gmpremiumhotel.com/icons/icon-wellness-w.svg);",
          menuItem: "Wellness",
          to: "homePage",
        },
      ],
      situationSideBar: false,
      isScrolled: false,
      logoWidth: 150,
    };
  },
  watch: {
    $route() {
      this.closeSidebar();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleSidebar() {
      this.situationSideBar = !this.situationSideBar;
      if (this.situationSideBar) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    openSubMenu(item) {
      item.showSubMenu = !item.showSubMenu;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    closeSidebar() {
      this.situationSideBar = false;
      this.sideBarMenu.forEach((item) => {
        if (item.showSubMenu) {
          item.showSubMenu = false;
        }
      });
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  /* Slide lên trên 20px khi xuất hiện */
}

.svgDown {
  transform: rotateX(0deg);
}

.svgUp {
  transform: rotateX(180deg);
}

.svgStyle {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.menuIcon {
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 20px;
  width: 20px;
  height: 25px;
  float: left;
}

.buttonClose {
  background: transparent;
  width: 2.5rem;
  height: 2.5rem;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.sideBar {
  background-image: url(https://gmpremiumhotel.com/images/bg-menu-mobile.jpg);
  background-position: center center;
  background-size: cover;
  padding: 2.5rem 1.5rem 0;
  overflow: auto;
  position: fixed;
  z-index: 1026;
  left: 0;
  top: 0;
  bottom: 0;
}

.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
  transition: transform 0.5s ease;
}

.sidebar-transition-enter,
.sidebar-transition-leave-to

/* .sidebar-transition-leave-active in <2.1.8 */
  {
  transform: translateX(-25rem);
}

.logoWrapper {
  float: initial;
  margin: 0 auto;
}

.logo-small {
  width: 100px;
  /* Kích thước nhỏ khi cuộn */
}

.logo-large {
  width: 150px;
  /* Kích thước lớn khi chưa cuộn */
}

.logoWrapper img {
  transition: width 0.5s ease;
  /* Thêm transition cho kích thước */
}

.logoWrapper img {
  transition: width 0.5s ease;
  /* Loại bỏ transition trên width và thay thế bằng transition trên transform */
}

.divChild {
  position: relative;
  width: 100%;
}

.navbar.active {
  background-color: #111;
  /* Màu nền mới khi cuộn trang */
}

.navbar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: transparent;
  z-index: 99;
  padding: 0;
  transition: background-color 0.3s ease;
}
</style>
