<template>
  <div class="bookingPage">
    <div class="w-full bg-[#333] z-[2001]">
      <div class="container flex justify-between">
        <div class="flex items-center justify-center h-[56px]">
          <router-link class="flex" :to="{ name: 'homePage' }">
            <span class="text-white text-2xl leading-[150%]">
              Eden Garden Hotel
            </span>
          </router-link>
          <div class="ml-[10px] flex items-center justify-center">
            <div class="flex space-x-1 text-white">
              <i v-for="index in 5" :key="index">
                <svg
                  class="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </i>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center h-[56px]">
          <span class="text-white text-xl leading-[150%]"> VND </span>
          <div class="border-gray-400 pr-2 border-r h-[30px]"></div>
          <span class="pl-2 text-white text-xl leading-[150%]"> English </span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
