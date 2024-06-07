<template>
  <div class="mainPage">
    <About></About>
    <RoomsClient></RoomsClient>
    <RestaurantNBar></RestaurantNBar>
    <AirportClient></AirportClient>
    <SpaNWellness></SpaNWellness>
  </div>
</template>

<script>
import About from "./body-client/body-mainpage-client/about-client.vue";
import RoomsClient from "./body-client/body-mainpage-client/rooms-client.vue";
import RestaurantNBar from "./body-client/body-mainpage-client/restaurant&bar-client.vue";
import AirportClient from "./body-client/body-mainpage-client/airport-client.vue";
import SpaNWellness from "./body-client/body-mainpage-client/spa&wellness-client.vue";
export default {
  components: {
    About,
    RoomsClient,
    RestaurantNBar,
    AirportClient,
    SpaNWellness,
  },
};
</script>

<style scoped></style>
