<template>
  <div class="roomManagement">
    <Style></Style>
    <div class="p-3">
      <h2 class="text-2xl font-bold mb-3">{{ nameService }}</h2>
      <div class="theInputSearch flex justify-between">
        <div class="mb-6 relative divSharedHeader">
          <div>
            <form @submit.prevent="searchData" action="search">
              <div class="px-4 py-3 divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
                style="width: 350px">
                <span class="mr-2">
                  <i class="text-[#6B7075] align-[-0.125rem]">
                    <img :src="searchSVG" alt="Search" />
                  </i>
                </span>
                <!-- sau thay thế phần placeholder theo components -->
                <input class="bg-transparent border-none flex-1 outline-none" type="text" :placeholder="searchForm"
                  v-model="searchTerm" @input="searchData" />
              </div>
            </form>
          </div>
        </div>
        <!-- button thêm mới -->
        <div @click="showAddModal" v-if="operationSettings.showAdd">
          <button class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center">
            Thêm mới
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1rem" height="1rem" class="ml-1">
                <path fill="white"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 
                                32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </i>
          </button>
        </div>
      </div>
      <div class="dataTable">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="item in servicesHeader" :key="item" scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody v-if="filteredData.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="item in paginated" :key="item.id" class="hover:bg-gray-100">
              <template v-for="(value, key) in item">
                <!-- <template v-if="key !== 'id'"> -->
                <td :key="key"
                  class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                  <!-- <div class="text-sm text-gray-900">{{ value }}</div> -->
                  <div class="text-sm text-gray-900" v-html="formatValue(key, value)"></div>
                </td>
                <!-- </template> -->
              </template>

              <!-- thao tác -->
              <td v-if="operationSettings.showEdit ||
        operationSettings.showDelete ||
        operationSettings.showAdd ||
        operationSettings.showReadme
        " class="px-6 py-4 whitespace-nowrap flex items-center justify-center text-center text-sm font-medium">
                <!-- button sửa -->
                <div class="cursor-pointer" v-if="operationSettings.showEdit" @click="showEditModal(item.id)">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" with="1rem" height="1rem">
                      <path fill="#0A75CA"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 
                            83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 
                            3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 
                            64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                    </svg>
                  </i>
                </div>
                <span v-if="operationSettings.showDelete" class="ml-1 mr-2 text-[20px]">/</span>
                <!-- button xóa -->
                <div class="cursor-pointer" v-if="operationSettings.showDelete" @click="showDeleteModal(item.id)">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" with="1rem" height="1rem">
                      <path fill="#FF0000"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </i>
                </div>
                <!-- button xem chi tiết -->
                <span v-if="operationSettings.showDelete" class="ml-1 mr-2 text-[20px]">/</span>
                <div class="cursor-pointer" @click="showViewModal(item.id)" v-if="operationSettings.showReadme">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" with="1rem" height="1rem">
                      <path
                        d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
                    </svg>
                  </i>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="numberOfColumns" class="px-6 py-4 text-center whitespace-nowrap">
                <div class="text-xl text-gray-900">Không có kết quả</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="hasSearchResult" class="pagination-container">
        <div class="pagination mt-4 flex justify-center">
          <button :disabled="currentPage === 1" @click="currentPage--"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300">
            Trước
          </button>
          <span class="px-3 py-1 bg-gray-200 text-gray-700">
            Trang {{ currentPage }} của {{ totalPage }}
          </span>
          <button :disabled="currentPage === totalPage || !hasNextPage" @click="currentPage++"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300">
            Sau
          </button>
        </div>
      </div>
    </div>

    <!-- modal xem chi tiết -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="viewModal">
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl uppercase font-bold mb-4">
          Chi tiết đơn {{ bookingDetail.id }}
        </h2>
        <form>
          <!-- first pay & payDay -->
          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Ngày Đặt
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="bookingDetail.bookday" disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Tiền Đã Đặt Cọc
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="bookingDetail.firstPay" required disabled />
              </div>
            </div>
          </div>

          <!-- status & payment type -->
          <div class="flex items-center justify-center space-x-3 mb-5">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Dịch Vụ Bổ Sung
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <div v-html="formatCombinedServiceNames(
        bookingDetail.combinedServiceNames
      )
        "></div>
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Số Lượng Phòng Theo Loại Phòng
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <div v-html="formatCombinedTypeRoomNames(
        bookingDetail.combinedTypeRoomNames
      )
        "></div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/3">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Tên Khách Hàng
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="bookingDetail.clientName" required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/3">
              <label class="text-lg font-medium text-gray-700 mb-1">
                CCCD/CMND
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="bookingDetail.cardId"
                  required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/3">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Số Người
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="bookingDetail.numOfPeople" required disabled />
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-5">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Lời Nhắn
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="bookingDetail.note"
                disabled />
            </div>
          </div>

          <!-- total -->
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            Total
          </h2>
          <div class="flex flex-col mb-2">
            <div class="text-2xl leading-[150%]">
              Tổng Tiền Thanh Toán: {{ numberWithDots(bookingDetail.totalAmount) }} VND
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="showViewModal" class="button-cancel uppercase hover:bg-[#CC0000] hover:text-white">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Style from "./styleServices.vue";
import axiosInstance from "@/axiosInstance/defaultAPI.js";
import moment from "moment";

export default {
  components: {
    Style,
  },
  data() {
    return {
      currentPage: 1,
      itemPerPage: 12,
      searchSVG: require("@/assets/svg-file/search.svg"),
      nameService: "Quản lý Đơn đặt phòng",
      servicesHeader: [
        "Mã Đơn",
        "Tên Khách Hàng",
        "CCCD/CMND",
        "Ngày Đặt",
        "Dịch Vụ Bổ Sung",
        "Số Lượng Phòng",
        "Số Người",
        "Tổng Tiền",
        "Thao Tác",
      ],
      searchForm: "CCCD/CMND",
      operationSettings: {
        showEdit: false,
        showDelete: false,
        showAdd: false,
        showReadme: true,
      },
      searchTerm: "",
      hasSearchResult: true,
      filteredData: [],
      shortData: [],
      fullData: [],
      viewModal: false,
      bookingIdView: null,
    };
  },
  created() {
    // Sử dụng instance đã được tạo với interceptor
    axiosInstance
      .post("/booking/getall")
      .then((response) => {
        // Gán dữ liệu từ response vào biến roomsData
        // this.fullData = response.data;
        this.fullData = response.data.map((item) => {
          return {
            ...item,
            bookday: moment(item.bookday).format("DD/MM/YYYY - HH:mm:ss"), // Chuyển đổi bookday
          };
        });
        // Lọc và chỉ lấy những trường cần thiết cho mảng short
        this.shortData = response.data.map(
          ({
            // id,
            // bookday,
            // note,
            // totalAmount,
            // firstPay,
            // combinedServiceNames,

            id,
            clientName,
            cardId,
            bookday,
            combinedServiceNames,
            combinedTypeRoomNames,
            numOfPeople,
            totalAmount,
          }) => ({
            id,
            clientName,
            cardId,
            bookday: moment(bookday).format("DD/MM/YYYY - HH:mm:ss"),
            combinedServiceNames,
            combinedTypeRoomNames,
            numOfPeople,
            totalAmount,
          })
        );
        this.shortData.sort((a, b) => b.id - a.id);

        if (!this.searchTerm.trim()) {
          // Nếu không, hiển thị toàn bộ dữ liệu
          this.filteredData = this.shortData;
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {
    numberWithDots(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    searchData() {
      // Kiểm tra xem có từ khóa tìm kiếm không
      if (typeof this.searchTerm !== "undefined" && !this.searchTerm.trim()) {
        // Nếu không có từ khóa, hiển thị toàn bộ dữ liệu
        this.filteredData = this.shortData;
        return;
      }

      this.filteredData = this.shortData.filter((item) => {
        // Kiểm tra xem searchTerm có ít nhất 1 ký tự không
        if (this.searchTerm.length >= 1) {
          // Lấy 1, 2 hoặc 3 ký tự đầu tiên của searchTerm
          const prefix = this.searchTerm.substring(
            0,
            Math.min(20, this.searchTerm.length)
          );
          // Kiểm tra xem prefix có phải là số không
          if (!isNaN(prefix)) {
            // Kiểm tra xem item có thuộc tính roomCode không
            if (item.cardId) {
              // So sánh roomCode với prefix
              const identityCardStr = item.cardId.toString();
              if (identityCardStr.includes(prefix)) {
                return true;
              }
            }
          }
        }
        // Kiểm tra xem item có thuộc tính roomCode và có chứa searchTerm không
        const searchTermInt = parseInt(this.searchTerm);
        // Kiểm tra đầy đủ thuộc tính roomCode để tìm số phòng
        const identityCardMatch = item.cardID && item.cardID === searchTermInt;
        // const identityCardMatch =
        //   item.cardId &&
        //   item.cardId.toLowerCase().includes(this.searchTerm.toLowerCase());

        // Trả về true nếu bất kỳ điều kiện nào đúng
        return identityCardMatch;
      });

      // Kiểm tra kết quả tìm kiếm
      if (this.filteredData.length === 0) {
        // Nếu không có kết quả, hiển thị text
        this.hasSearchResult = false;
      } else {
        this.hasSearchResult = true;
      }
    },
    showViewModal(bookingId) {
      this.bookingIdView = bookingId;
      this.viewModal = !this.viewModal;
      this.bookingDetail = this.fullData.find((item) => item.id === bookingId);
    },
    formatValue(key, value) {
      if (key === "combinedTypeRoomNames") {
        return this.formatCombinedTypeRoomNames(value);
      } else if (key === "combinedServiceNames") {
        return this.formatCombinedServiceNames(value);
      } else if (key === "totalAmount") {
        return this.numberWithDots(value);
      }
      else {
        return value;
      }
    },
    formatCombinedTypeRoomNames(combinedTypeRoomNames) {

      // Tách chuỗi thành mảng các phần tử bằng dấu chấm phẩy
      const roomNamesArray = combinedTypeRoomNames.split("; ");
      // Trả về chuỗi HTML chứa danh sách các phòng
      return (
        "<ol class='list-decimal ml-4 text-left'><li  class='pl-1'>" +
        roomNamesArray.join("</li><li  class='pl-1'>") +
        "</li></ol>"
      );
    },
    formatCombinedServiceNames(combinedServiceNames) {
      if (combinedServiceNames == null) {
        return '';
      }
      // Tách chuỗi thành mảng các phần tử bằng dấu chấm phẩy
      const serviceNameArray = combinedServiceNames.split(", ");
      // Trả về chuỗi HTML chứa danh sách các phòng
      return (
        "<ol class='list-decimal ml-4 text-left'><li  class='pl-2'>" +
        serviceNameArray.join("</li><li  class='pl-2'>") +
        "</li></ol>"
      );
    },
  },
  computed: {
    paginated() {
      const data = this.filteredData.length
        ? this.filteredData
        : this.shortData;
      const startPage = (this.currentPage - 1) * this.itemPerPage;
      const endPage = startPage + this.itemPerPage;

      if (endPage > data.length) {
        return data.slice(startPage);
      } else {
        return data.slice(startPage, endPage);
      }
    },
    totalPage() {
      const data = this.filteredData.length
        ? this.filteredData
        : this.shortData;
      return Math.ceil(data.length / this.itemPerPage);
    },
    hasNextPage() {
      return this.currentPage < this.totalPage;
    },
    numberOfColumns() {
      return this.servicesHeader.filter((child) => !!child).length;
    },
  },
};
</script>

<style scoped>
.divForm {
  width: 100%;
  font-size: 16px;
}
</style>
