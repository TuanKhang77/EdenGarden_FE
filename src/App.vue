<template>
  <div id="app" class="font-default">
    <NavbarClient v-if="!isAdminNBookingPage"></NavbarClient>
    <HeaderClient v-if="!isAdminNBookingPage"></HeaderClient>
    <router-view></router-view>
    <FooterClient v-if="!isAdminNBookingPage"></FooterClient>
  </div>
</template>

<script>
import NavbarClient from "./components/client/mainpage-client/header-client/navbar-client.vue";
import HeaderClient from "./components/client/mainpage-client/header-client/header-client.vue";
import FooterClient from "./components/client/mainpage-client/footer-client/footer-client.vue";
export default {
  components: {
    NavbarClient,
    HeaderClient,
    FooterClient,
  },
  computed: {
    isAdminNBookingPage() {
      return (
        this.$route.path.startsWith("/admin") ||
        this.$route.path === "/login" ||
        this.$route.path.startsWith("/booking")
      );
    },
  },
};
</script>

<style>
.font-default {
  font-family: "ITC New Baskerville", serif;
}
font-serif {
  font-family: "ITC New Baskerville", serif;
}
</style>
