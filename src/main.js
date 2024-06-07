import Vue from 'vue'
import App from './App.vue'
import router from './VueRouter/router.js'
import store from './store/store.js'
import 'tailwindcss/tailwind.css'

Vue.config.productionTip = false

// Kiểm tra trạng thái đăng nhập khi khởi tạo ứng dụng
const loggedInAccount = JSON.parse(localStorage.getItem("loggedInAccount"));
if (loggedInAccount) {
  store.commit("setLoggedInAccount", loggedInAccount);
}

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
