<template>
  <section class="airportPickup">
    <div class="container z-10 relative flex justify-center items-center flex-col">
      <span class="text-[45px] sm:text-[35px] whitespace-nowrap text-white leading-10 font-semibold">
        Đưa đón sân bay
      </span>
      <span class="sm:hidden text-white mt-6 text-[20px] font-normal leading-7">
        Dịch vụ đón và trả khách tại sân bay của chúng tôi rất hoàn hảo
        sắp xếp cho bạn. Đảm bảo tiện lợi, an toàn và giá cả tốt nhất
      </span>
      <router-link class="flex items-center justify-center" :to="{ name: 'bookingRoom' }">
        <span
          class="tracking-wider px-4 py-2 border border-[#d3b5a3] hover:border-[#111] hover:text-white hover:bg-[#111] bg-[#d3b5a3] uppercase">
          Đặt ngay
        </span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.airportPickup {
  background-image: url("https://gmpremiumhotel.com/UploadFile/Service/Airport-Transfer-Service.jpg");
  padding: 10rem 10rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
