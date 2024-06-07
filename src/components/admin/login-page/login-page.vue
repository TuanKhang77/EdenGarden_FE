<template>
  <div class="login-page">
    <div class="bg-overlay"></div>
    <div class="content">
      <div class="logo">
        <img
          src="@/assets/logo-edengarden-nobuffer.png"
          alt="Logo"
          class="logo-image"
        />
      </div>
      <div class="bg-white p-8 rounded shadow-md w-[27rem]">
        <h1 class="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="username" class="block text-sm font-semibold mb-2"
              >Tên đăng nhập:</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-semibold mb-2"
              >Mật khẩu:</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <div v-if="error" class="text-red-500 mt-4 text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["login"]), // Ánh xạ action login từ Vuex store
    handleSubmit() {
      if (this.username && this.password) {
        // Gọi action login từ Vuex store, truyền thông tin tài khoản
        this.login({ username: this.username, password: this.password })
          .then(() => {
            // Đăng nhập thành công
            // Chuyển hướng đến trang dashboard khi đăng nhập thành công
            this.$router.push({ name: "dashboard" });
          })
          .catch(() => {
            // Xử lý khi đăng nhập không thành công
            this.error =
              "Đăng nhập không thành công. Tài khoản hoặc mật khẩu không chính xác.";
          });
      } else {
        this.error = "Vui lòng điền đầy đủ thông tin đăng nhập.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-image: url("@/assets/hotel.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 100vh;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.content {
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.logo {
  position: absolute;
  top: 40px;
  left: 50px;
}

.logo-image {
  width: 250px;
  height: auto;
}
</style>
