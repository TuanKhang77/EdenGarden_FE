<template>
  <div class="header-admin">
    <div class="h-[60px]">
      <div class="flex bg-[#0A75CA] w-full h-full justify-between">
        <div class="px-3 py-2 flex items-center flex-1">
          <router-link :to="{ name: 'dashboard' }">
            <img class="w-12 h-12 rounded-lg" :src="srcLogo" alt="Logo">
          </router-link>
          <h1 class="ml-[10px] leading-[150%] text-[30px] text-white font-semibold whitespace-nowrap">Hệ thống quản trị
            Eden Garden Hotel
          </h1>
        </div>
        <div class="px-3 py-2 flex items-center">
          <div @click="changeAccountDropdown">
            <div class="flex items-center cursor-pointer">
              <div class="rounded-full overflow-hidden border-2 border-white w-12 h-12">
                <img class="w-full h-full object-cover" :src="currentAccount.avatar" alt="Avatar">
              </div>
              <span class="ml-2 text-white text-[15px] leading-[150%]">{{ currentAccount.staffName }}</span>
            </div>
            <div class="absolute top-[60px] right-[5px] mt-1 w-[11.5rem]" v-if="showDropdown">
              <div class="bg-white shadow-lg border-gray border rounded-md py-1">
                <router-link :to="{ name: 'inforAccount' }"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Thông tin tài khoản</router-link>
                <a @click="logoutFunction" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đăng xuất</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      srcLogo: require("@/assets/logo-edengarden-short.png"),
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters(['getCurrentAccount']),
    currentAccount() {
      return this.getCurrentAccount;
    }
  },
  methods: {
    changeAccountDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    ...mapActions(['logout']), // Import action logout từ Vuex

    logoutFunction() {
      this.logout(); // Gọi action logout từ Vuex để xóa thông tin tài khoản đăng nhập
      // Chuyển hướng người dùng về trang đăng nhập
      this.$router.push({ name: 'loginPage' });
    }
  }
}
</script>