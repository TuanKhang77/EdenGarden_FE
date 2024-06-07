<template>
  <div class="bookingRoom pb-10">
    <div class="relative h-[260px] w-full bg-cover" style="
        background-image: url(https://tbb-prod-apac.imgix.net/attachments/properties/banners/26076/bbcc0ed3-c9cf-49e8-a4f0-798aa5ce9c74.jpg?auto=format,compress&fit=crop&crop=entropy&w=1380&h=300&q=55%201x,%20https://tbb-prod-apac.imgix.net/attachments/properties/banners/26076/bbcc0ed3-c9cf-49e8-a4f0-798aa5ce9c74.jpg?auto=format,compress&fit=crop&crop=entropy&w=1380&h=300&dpr=2&q=20%202x);
      "></div>
    <!-- popup-class="w-full" popup-class để style popup 
                  popup-class="bg-white w-full shadow-lg rounded-lg p-4 mt-2 border border-gray-200"
     -->

    <div class="max-w-[1280px] container flex">
      <div class="w-full">
        <form class="flex flex-col" @submit.prevent="orderBooking">
          <div class="mt-[-52px] w-full z-10 bg-white rounded-md border-solid border-[2px] border-black">
            <form @submit.prevent="checkRoom">
              <div class="py-[15px] px-[24px]">
                <div class="flex space-x-2 pb-3">
                  <div class="w-1/2 relative">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Chọn ngày: {{ numberOfNights }} ngày
                    </label>
                    <date-picker v-model="dateRange" format="DD-MM-YYYY" range :disabled-date="disabledDate"
                      :clearable="false" :editable="false"
                      input-class="px-4 py-2 w-full cursor-pointer text-xl ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] focus:outline-none"
                      popup-class="bg-white shadow-lg rounded-lg p-4 mt-2 border border-gray-200" :popup-style="{
          top: 360 + 'px',
          left: 297 + 'px',
          borderRadius: 0.5 + 'rem',
        }">
                    </date-picker>
                  </div>
                  <div class="w-1/2">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Số người: {{ guests }} người
                    </label>
                    <div class="relative">
                      <div class="">
                        <div class="input-number">
                          <button aria-label="Giảm" class="button-minus" :class="{
          'text-[#E6E8EA]': guests === 0,
          'text-[#1C1F23]': guests > 1,
        }" :disable="guests === 0" @click.prevent="decrementGuest()">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                              <use href="@/assets/svg-file/buttonMinus.svg#minus"></use>
                            </svg>
                          </button>
                          <input v-model="guests" class="count-input text-lg" id="count" min="0" inputmode="decimal"
                            type="text" disabled />
                          <button aria-label="Tăng" class="text-[#1C1F23] button-minus"
                            @click.prevent="incrementGuest()">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                              <use href="@/assets/svg-file/buttonPlus.svg#plus"></use>
                            </svg>
                          </button>

                        </div>
                      </div>
                      <!-- <div v-if="isDropdownOpen"
                        class="absolute z-10 top-[44px] mt-2 w-full border border-gray-300 rounded-lg shadow-lg bg-white">
                        <ul class="max-h-60 overflow-y-auto rounded-lg">
                          <li v-for="number in [1, 2, 3, 4, 5, 6]" :key="number" @click="selectGuests(number)"
                            class="flex justify-between items-center py-2 px-4 cursor-pointer hover:bg-gray-100" :class="{
          'hover:bg-gray-100': !isSelectedGuests(number),
          'bg-gray-100': isSelectedGuests(number),
        }">
                            <span class="text-lg">{{ number }}</span>
                          </li>
                        </ul>
                      </div> -->
                      <!-- <div @click="toggleDropdown"
                        class="px-4 py-[9px] cursor-pointer w-full text-xl ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] flex items-center justify-between">
                        <span class="text-lg">{{ guests }} Guests</span>
                        <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M5 7l5 5 5-5z" />
                        </svg>
                      </div> -->
                    </div>
                  </div>
                </div>

                <button type="submit"
                  class="w-full flex items-center justify-center space-x-1 rounded-lg bg-[#bee2ff] py-2 hover:bg-[#9dd3ff]">
                  <span class="text-lg"> Tìm kiếm phòng </span>
                  <span class="text-lg">
                    <i class="text-[#6B7075]">
                      <img :src="searchSVG" alt="Search" />
                    </i>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="w-full py-10">
            <div class="flex">
              <div class="w-full">
                <div class="w-full text-center">
                  <h2
                    class="text-xl uppercase border-b border-solid border-[#506982] pb-[3px] mb-[10px] text-[#506982]">
                    Chi tiết
                  </h2>
                </div>

                <div class="w-full pb-14">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col"
                          class="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                          Kiểu phòng
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                          Sức chứa
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                          Số phòng trống
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng phòng
                        </th>
                        <th scope="col"
                          class="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                          Giá tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="roomAvailable.length > 0" class="bg-white divide-y divide-gray-200">
                      <tr v-for="room in roomAvailable" :key="room.idRoomType" class="hover:bg-gray-100">
                        <td
                          class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                          <div class="text-lg text-gray-900">
                            {{ room.typeName }}
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                          <div class="text-lg text-gray-900">
                            {{ room.numofPeople }}
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                          <div class="text-lg text-gray-900">
                            {{ room.numOfRoomLeft }}
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                          <div class="text-lg text-gray-900">
                            <div class="input-number">
                              <button aria-label="Giảm" class="button-minus" @click.prevent="decrementRoom(room)"
                                :class="{
          'text-[#E6E8EA]': room.count === 0,
          'text-[#1C1F23]': room.count > 1,
        }" :disable="room.count === 0">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                  width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                  <use href="@/assets/svg-file/buttonMinus.svg#minus"></use>
                                </svg>
                              </button>
                              <input v-model="room.count" class="count-input text-lg" id="count" min="0"
                                inputmode="decimal" type="text" disabled />
                              <button aria-label="Tăng" class="text-[#1C1F23] button-minus"
                                @click.prevent="incrementRoom(room)" :disable="room.numOfRoomLeft === 0 ||
          room.count === room.numOfRoomLeft
          " :class="{
          'text-[#E6E8EA]':
            room.count === room.numOfRoomLeft,
          'text-[#1C1F23]':
            room.count < room.numOfRoomLeft,
        }">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                  width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                  <use href="@/assets/svg-file/buttonPlus.svg#plus"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                          <div class="text-lg text-gray-900">
                            {{ numberWithDots(room.price * room.count) }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="3" class="px-6 py-4 text-center whitespace-nowrap">
                          <div class="text-xl text-gray-900 uppercase">
                            Chúng tôi đã hết phòng ở thời điểm này.
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="w-full text-center">
                  <h2
                    class="text-xl uppercase border-b border-solid border-[#506982] pb-[3px] mb-[10px] text-[#506982]">
                    ĐẶT PHÒNG & LIÊN HỆ
                  </h2>
                </div>
                <div class="flex items-center justify-center space-x-3">
                  <div class="flex flex-col mb-4 w-1/2">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <div
                      class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                      <input placeholder="Họ và tên"
                        class="bg-transparent border-none flex-1 outline-none text-lg w-full" type="text" required
                        v-model="clientInfor.name" />
                    </div>
                  </div>
                  <div class="flex flex-col mb-4 w-1/2">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Căn cước
                    </label>
                    <div
                      class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                      <input placeholder="Căn cước"
                        class="bg-transparent border-none flex-1 outline-none text-lg w-full" type="decimal" required
                        v-model="clientInfor.cardid" maxlength="15" />
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-center space-x-3">
                  <div class="flex flex-col mb-4 w-1/2">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div
                      class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                      <input placeholder="example@email.com"
                        class="bg-transparent border-none flex-1 outline-none text-lg w-full" type="email" required
                        v-model="clientInfor.email" />
                    </div>
                  </div>
                  <div class="flex flex-col mb-4 w-1/2">
                    <label class="text-lg font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <div
                      class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                      <input placeholder="Số điện thoại"
                        class="bg-transparent border-none flex-1 outline-none text-lg w-full" type="number" required
                        v-model="clientInfor.phonenumber" maxlength="10" />
                    </div>
                  </div>
                </div>
                <div class="flex flex-col pb-14">
                  <label class="text-lg font-medium text-gray-700 mb-1">
                    Dịch vụ đi kèm
                  </label>
                  <div
                    class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                    <Multiselect v-model="selectedServices" :options="serviceIds" :multiple="true" label="serviceName"
                      track-by="id" placeholder="Chọn một hoặc nhiều"
                      class="custom-multiselect bg-transparent border-none flex-1 outline-none text-lg"
                      :close-on-select="false"></Multiselect>
                  </div>
                </div>
                <div class="w-full text-center">
                  <h2
                    class="text-xl uppercase border-b border-solid border-[#506982] pb-[3px] mb-[10px] text-[#506982]">
                    Tổng cộng
                  </h2>
                </div>
                <div class="flex items-center justify-center">
                  <span class="uppercase text-2xl mr-2"> </span>
                  <span class="uppercase text-2xl">{{ numberWithDots(totalPrice) }} VND</span>
                </div>
                <div class="flex items-center justify-center pt-10">
                  <button type="submit"
                    class="border-solid border border-[#d3b5a3] px-6 py-2 bg-[#d3b5a3] uppercase text-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none hover:disabled:hover:bg-[#d3b5a3] hover:disabled:hover:text-lg hover:disabled:hover:border-[#d3b5a3]"
                    :class="{
          'hover:bg-[#111] hover:text-white hover:border-[#111]':
            !isButtonDisabled,
        }" :disabled="isButtonDisabled">
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import axiosInstance from "@/axiosInstance/defaultAPI";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  components: {
    DatePicker,
    Multiselect,
  },
  data() {
    return {
      bookingData: Object,
      ws: null,
      paymentWindowOpen: false,
      searchSVG: require("@/assets/svg-file/search.svg"),
      dateRange: [],
      isDropdownOpen: false,
      guests: 2,
      roomAvailable: [],
      clientInfor: {
        name: "",
        email: "",
        phonenumber: "",
        cardid: "",
      },
      serviceIds: [],
      roomTypeIds: [],
      selectedServices: [],
    };
  },
  mounted() {
    this.checkRoom(); // Gọi phương thức checkRoom khi component được mounted
    this.checkAndSetDateRange();
  },
  created() {
    this.connectWebSocket();
    Promise.all([
      axiosInstance.post("/service/getall"),
      axiosInstance.post("/roomtype/getall"),
    ])
      .then(([serviceResponse, roomTypeResponse]) => {
        // Xử lý dữ liệu từ /service/getall
        this.serviceIds = serviceResponse.data.map(
          ({ id, serviceName, price }) => ({
            id,
            serviceName,
            price,
          })
        );

        // Xử lý dữ liệu từ /roomtype/getall
        this.roomTypeIds = roomTypeResponse.data.map(({ id, price, numofPeople }) => ({
          id,
          price,
          numofPeople,
        }));

      })
      .catch((e) => {
        console.log("error: ", e);
      });
  },
  watch: {
    dateRange: {
      handler() {
        this.checkRoom();
      },
      deep: true, // Đảm bảo watch nhận ra sự thay đổi trong mảng
    },
    guests() {
      this.checkRoom();
    },
  },
  computed: {
    currentUrl() {
      return this.$route.fullPath;
    },
    arrivalDate() {
      return this.dateRange
        ? moment(this.dateRange[0]).format("DD-MM-YYYY")
        : null;
    },
    departureDate() {
      return this.dateRange
        ? moment(this.dateRange[1]).format("DD-MM-YYYY")
        : null;
    },
    arrivalDateForBackend() {
      return this.dateRange
        ? moment(this.dateRange[0]).format("YYYY-MM-DD")
        : null;
    },
    departureDateForBackend() {
      return this.dateRange
        ? moment(this.dateRange[1]).format("YYYY-MM-DD")
        : null;
    },
    numberOfNights() {
      if (this.dateRange) {
        const startDate = moment(this.dateRange[0]);
        const endDate = moment(this.dateRange[1]);
        return endDate.diff(startDate, "days"); // Lấy số ngày giữa hai ngày
      }
      return null;
    },
    isButtonDisabled() {
      // Kiểm tra nếu tất cả các giá trị room.count đều bằng 0
      const allCountsZero = this.roomAvailable.every(
        (room) => room.count === 0
      );

      // Trả về true nếu tất cả counts đều là 0, ngược lại trả về false
      return allCountsZero || this.paymentWindowOpen;
    },
    selectedServiceIds() {
      return this.selectedServices.map((service) => service.id);
    },
    totalPrice() {
      // Tính tiền phòng dựa trên số đêm và số lượng phòng
      var roomTotal = this.roomAvailable.reduce((total, room) => {
        return total + room.count * room.price * this.numberOfNights;
      }, 0);

      // Tính tiền dịch vụ phụ trội
      var extraServiceTotal = this.selectedServices.reduce(
        (total, service) => {
          return total + service.price * this.numberOfNights;
        },
        0
      );

      // Tổng tiền
      return roomTotal + extraServiceTotal;
    },
    depositPrice() {
      return this.totalPrice / 2;
    },
  },
  methods: {
    connectWebSocket() {
      // this.ws = new WebSocket("ws://localhost:5000/ws");
      this.ws = new WebSocket("ws://be-production-464b.up.railway.app/ws");

      this.ws.onmessage = (event) => {
        const paymentCode = event.data;
        console.log(paymentCode);
        if (paymentCode === "00") {
          const b = JSON.parse(localStorage.getItem("booking"));
          axiosInstance
            .post("/booking/SaveBooking", b)
            .then(() => {
              this.$router.push({
                path: "/booking/Thank-you",
                query: {
                  clientName: this.bookingData.bookedClient.name,
                  beginDate: this.bookingData.beginDate,
                  endDate: this.bookingData.endDate,
                  numberOfPeople: this.bookingData.numberOfPeople,
                },
              });
              alert("Đặt phòng thành công");
            })
            .catch(() => {
              alert("Đặt phòng không thành công, vui lòng thử lại sau!");
            });
          // this.checkRoom();
        } else {
          alert("Đặt phòng không thành công, vui lòng thử lại sau!");
        }
        localStorage.removeItem("booking");
        // this.messages.push(event.data);
      };
      this.ws.onclose = () => {
        console.log("WebSocket closed, reconnecting...");
        setTimeout(this.connectWebSocket, 1000);
      };
    },
    numberWithDots(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    disabledDate(date) {
      const now = new Date();
      const noon = new Date();
      noon.setHours(12, 0, 0, 0);

      // Nếu hiện tại đã qua 12h đêm của ngày hôm nay, thì ngày hiện tại không thể chọn,
      // nên chọn ngày hôm sau làm minDate
      if (now > noon) {
        return date <= now; // Vô hiệu hóa tất cả các ngày trước hoặc bằng ngày hiện tại
      }

      // Nếu chưa qua 12h đêm của ngày hôm nay, thì vẫn có thể chọn ngày hôm nay
      return date < noon;
    },
    checkAndSetDateRange() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

      this.dateRange = [tomorrow, dayAfterTomorrow];
    },
    getTomorrow() {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    // selectGuests(number) {
    //   this.guests = number;
    //   this.isDropdownOpen = false;
    // },
    isSelectedGuests(number) {
      return this.guests === number;
    },
    checkRoom() {
      if (
        this.arrivalDateForBackend &&
        this.departureDateForBackend &&
        this.guests
      ) {
        axiosInstance
          .post("/booking/GetAllRoomAvailable", {
            beginDate: this.arrivalDateForBackend,
            endDate: this.departureDateForBackend,
            numberofPeople: this.guests,
          })
          .then((response) => {
            this.roomAvailable = response.data.map((room) => ({
              ...room,
              count: 0,
              price:
                this.roomTypeIds.find((rt) => rt.id === room.idRoomType)
                  ?.price || 0,
              numofPeople: this.roomTypeIds.find(
                (rt) => rt.id === room.idRoomType
              ).numofPeople,
            }));
            // Thực hiện các hành động khác khi cần thiết với kết quả
          })
          .catch((error) => {
            console.error("Error checking availability:", error);
          });
      }
    },
    incrementRoom(room) {
      if (room.count === undefined) {
        this.$set(room, "count", 0); // Khởi tạo giá trị count cho phòng nếu chưa có
      } else if (room.count < room.numOfRoomLeft) {
        room.count++;
      }
    },
    decrementRoom(room) {
      if (room.count === undefined) {
        this.$set(room, "count", 0); // Khởi tạo giá trị count cho phòng nếu chưa có
      } else if (room.count > 0) {
        room.count--;
      }
    },
    incrementGuest() {
      this.guests++;
    },
    decrementGuest() {
      if (this.guests > 0)
        this.guests--;
    },
    orderBooking() {
      const currentDate = new Date();
      const arrivalDate = new Date(this.arrivalDateForBackend);
      const departureDate = new Date(this.departureDateForBackend);
      // Kiểm tra nếu ngày đến và ngày đi nhỏ hơn ngày hiện tại
      if (arrivalDate < currentDate || departureDate < currentDate) {
        alert("Please enter a valid date.");
        this.checkAndSetDateRange(); // Đặt lại ngày nếu ngày không hợp lệ
        this.checkRoom();
        return; // Dừng việc gửi yêu cầu nếu ngày không hợp lệ
      }
      let totalCapacity = 0;
      this.roomAvailable.forEach((room) => {
        totalCapacity += room.count * room.numofPeople;
      });

      if (totalCapacity < this.guests) {
        alert(
          "Số lượng phòng hiện tại không đủ để đáp ứng số lượng khách hàng. Quý khách vui lòng đặt thêm phòng để tiếp tục."
        );
        return;
      }
      this.bookingData = {
        beginDate: this.arrivalDateForBackend,
        endDate: this.departureDateForBackend,
        numberOfPeople: this.guests,
        bookedClient: {
          name: this.clientInfor.name,
          email: this.clientInfor.email,
          phonenumber: this.clientInfor.phonenumber,
          cardid: this.clientInfor.cardid,
        },
        roomRequests: [],
        serviceIds: this.selectedServiceIds,
        amount: this.totalPrice,
      };
      this.roomAvailable.forEach((room) => {
        if (room.count > 0) {
          this.bookingData.roomRequests.push({
            roomTypeId: room.idRoomType,
            quantity: room.count,
          });
        }
      });

      // var self = this;
      axiosInstance
        .post("/booking/CreateBooking", this.bookingData)
        .then((data) => {
          console.log(data);
          var payment_window = window.open(
            data.data.paymentUrl,
            "_blank",
            "resizable=0,toolbar=0,location=0,menubar=0"
          );
          this.paymentWindowOpen = true;
          var timer = setInterval(() => {
            if (payment_window.closed) {
              this.paymentWindowOpen = false;
              console.log("close")
              clearInterval(timer);
            }
          }, 1000);
          let bookingInfo = JSON.stringify(data.data.booking);
          localStorage.setItem("booking", bookingInfo);
          // this.$router.push({
          //   path: "/booking/Thank-you",
          //   query: {
          //     clientName: this.bookingData.bookedClient.name,
          //     beginDate: this.bookingData.beginDate,
          //     endDate: this.bookingData.endDate,
          //     numberOfPeople: this.bookingData.numberOfPeople,
          //   },
          // });
          // alert("Đặt phòng thành công");
          // this.checkRoom();
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    },
  },
};
</script>

<style>
.custom-multiselect .multiselect {
  display: flex;
  flex-direction: column;
}

.custom-multiselect .multiselect__input {
  background-color: transparent;
  border: none;
  outline: none;
  flex: 1;
  padding: 0;
  /* Adjust padding to match the input style */
  font-size: 1.125rem;
}

.custom-multiselect .multiselect__select {
  background-color: #f6f9fc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: left;
  font-size: 1.125rem;
  color: #1c1f23;
}

.custom-multiselect .multiselect__tags {
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 1rem;
}

.custom-multiselect .multiselect__tags-wrap {
  display: flex;
}

.custom-multiselect .multiselect__tag {
  margin-right: 5px;
  margin-bottom: 0px;
  padding: 7px 10px 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-multiselect .multiselect__option--highlight {
  background-color: #e2e8f0;
}

.custom-multiselect .multiselect__option--selected {
  background-color: #cbd5e0;
}

.custom-multiselect .multiselect__placeholder {
  margin: 0px;
  font-size: 1.125rem;
  padding-top: 0px;
}

.custom-multiselect .multiselect__tag-icon {
  position: inherit;
}

.custom-multiselect .multiselect__select:before {
  border-color: #000 transparent transparent;
}

.count-input {
  background: inherit;
  width: 70px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  flex: 1 1 0%;
  height: 100%;
  text-align: center;
}

.input-number {
  align-items: center;
  border-radius: 0.375rem;
  border-style: solid;
  border-width: 1px;
  display: inline-flex;
  height: 40px;
}

.button-minus {
  height: 100%;
  width: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.mx-datepicker {
  width: 100%;
}

.roomList-enter-active,
.roomList-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.roomList-enter,
.roomList-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  /* Slide lên trên 20px khi xuất hiện */
}
</style>
