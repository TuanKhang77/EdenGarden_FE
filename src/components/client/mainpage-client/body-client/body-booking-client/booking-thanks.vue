<template>
  <div class="py-10 container mx-auto max-w-2xl">
    <div class="w-full px-5">
      <span class="text-3xl font-semibold block mb-4 text-center">
        Dear {{ clientName }},
      </span>
      <span class="text-xl block mb-4 text-justify">
        Thay mặt toàn thể khách sạn Eden Garden, tôi xin gửi lời cảm ơn
        gửi lời cảm ơn nồng nhiệt nhất của chúng tôi vì đã chọn ở lại với chúng tôi vì lợi ích của bạn
        chuyến thăm Hà Nội sắp tới. Chúng tôi thực sự vui mừng khi bạn là khách của chúng tôi và mong muốn đảm bảo kỳ
        nghỉ của bạn không thể đặc biệt hơn.
      </span>
      <span class="text-xl block mb-4 text-justify">
        Chúng tôi hiểu rằng bạn có nhiều lựa chọn chỗ ở dành cho mình,
        và chúng tôi rất vinh dự vì bạn đã đặt niềm tin vào chúng tôi. Chúng tôi
        cam kết sẽ mang đến cho bạn sự hiếu khách tuyệt vời
        và chúng tôi tin tưởng rằng bạn sẽ thấy khách sạn của chúng tôi như ngôi nhà thứ hai.
      </span>
      <span class="text-xl block mb-4">
        Vui lòng xem bên dưới bản tóm tắt chi tiết đặt phòng của bạn:
      </span>
      <ul class="list-disc list-inside ml-5 text-xl mb-4">
        <li>MR/MRS: {{ clientName }}</li>
        <li>Check-in: {{ formattedBeginDate }}</li>
        <li>Check-out: {{ formattedEndDate }}</li>
        <li>Số người ở: {{ numberOfPeople }}</li>
      </ul>
      <span class="text-xl block mb-4 text-justify">
        Nếu bạn có thắc mắc hoặc cần hỗ trợ thêm, vui lòng không
        còn chần chừ gì nữa hãy liên hệ với bộ phận đặt phòng của chúng tôi theo số 0988590818 hoặc trả lời câu hỏi này
        e-mail.
      </span>
      <span class="text-xl block mb-4 text-justify">
        Chúng tôi mong muốn được chào đón bạn đến với Khách sạn Eden Garden và cung cấp cho bạn
        với một kỳ nghỉ đáng nhớ.
      </span>
      <div class="flex items-center justify-center flex-col mb-8">
        <span class="text-xl block mb-4 text-left">Sincerely,</span>
        <span class="text-2xl font-bold block mb-2 text-left">
          Nguyễn Đức Tùng
        </span>
        <span class="text-2xl font-bold block mb-2">Administrator</span>
        <span class="text-2xl font-bold block mb-2">Eden Garden Hotel</span>
      </div>
      <div class="flex items-center justify-between">
        <router-link :to="{ name: 'homePage' }"
          class="px-12 border-px-6 py-2 bg-[#d3b5a3] uppercase border-[#d3b5a3] hover:border-[#d3b5a3] text-lg hover:bg-[#111] hover:text-white border border-transparent border-solid">
          Trang chủ
        </router-link>
        <router-link :to="{ name: 'bookingRoom' }"
          class="px-6 py-2 bg-[#d3b5a3] uppercase border-[#d3b5a3] hover:border-[#d3b5a3] text-lg hover:bg-[#111] hover:text-white border border-transparent border-solid">
          Đặt lại
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      clientName: "",
      beginDate: "",
      endDate: "",
      numberOfPeople: "",
      depositPrice: null,
    };
  },
  computed: {
    formattedBeginDate() {
      return moment(this.beginDate).format("DD/MM/YYYY");
    },
    formattedEndDate() {
      return moment(this.endDate).format("DD/MM/YYYY");
    },
  },
  created() {
    this.clientName = this.$route.query.clientName;
    this.beginDate = this.$route.query.beginDate;
    this.endDate = this.$route.query.endDate;
    this.numberOfPeople = this.$route.query.numberOfPeople;

  },
};
</script>

<style scoped></style>
