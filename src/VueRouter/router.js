import Vue from "vue";
import VueRouter from "vue-router";

// store vuex
import store from "@/store/store";

Vue.use(VueRouter);

const routes = [
  // path admin
  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/admin/mainpage-admin/mainpage-admin.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../components/admin/mainpage-admin/body-admin.vue")
      },
      {
        path: "account",
        name: "inforAccount",
        component: () => import("../components/admin/mainpage-admin/infor-account.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "loginPage",
    component: () => import("../components/admin/login-page/login-page.vue"),
  },

  // path client
  {
    path: "/",
    name: "homePage",
    component: () => import("../components/client/mainpage-client/mainpage-client.vue")
  },
  {
    path: "/rooms&suite",
    name: "roomsNSuite",
    component: () => import("../components/client/mainpage-client/body-client/body-rooms-client/rooms-categories.vue"),
  },
  {
    path: "/rooms&suite/:roomName",
    name: "roomDetail",
    props: true,
    component: () => import("../components/client/mainpage-client/body-client/body-rooms-client/rooms-detail.vue")
  },
  {
    path: "/booking",
    name: "bookingPage",
    props: true,
    component: () => import("../components/client/mainpage-client/body-client/body-booking-client/booking-page.vue"),
    children: [
      {
        path: "Reservation",
        name: "bookingRoom",
        component: () => import("../components/client/mainpage-client/body-client/body-booking-client/booking-room.vue"),
        props: true
      },
      {
        path: "Thank-you",
        name: "thankYou",
        component: () => import("../components/client/mainpage-client/body-client/body-booking-client/booking-thanks.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  // Cuộn lên đầu trang trước khi chuyển trang
  window.scrollTo(0, 0);

  // Kiểm tra trạng thái đăng nhập trước mỗi lần chuyển trang
  const loggedInAccount = store.getters.getCurrentAccount;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !loggedInAccount) {
    // Nếu trang yêu cầu xác thực và không có tài khoản đăng nhập, chuyển hướng về trang đăng nhập
    next({ name: "loginPage" });
  }
  else if (to.name === 'loginPage' && loggedInAccount) {
    // Nếu người dùng đã đăng nhập và cố gắng truy cập trang đăng nhập, chuyển hướng về trang admin
    next({ name: 'dashboard' });
  }
  else {
    // Ngược lại, cho phép truy cập
    next();
  }
});

export default router;
