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
                <template v-if="key !== 'id'">
                  <td :key="key"
                    class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                    <div class="text-sm text-gray-900">{{ value }}</div>
                  </td>
                </template>
              </template>

              <!-- thao tác -->
              <td v-if="operationSettings.showEdit || operationSettings.showDelete
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
                <span v-if="operationSettings.showReadme" class="ml-1 mr-2 text-[20px]">/</span>
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
            Page {{ currentPage }} of {{ totalPage }}
          </span>
          <button :disabled="currentPage === totalPage || !hasNextPage" @click="currentPage++"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- modal thêm mới -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="addModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-8 uppercase">Add New Room</h2>
        <form @submit.prevent="addRoom">
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Room Code
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input placeholder="Room Code" class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="newRoom.RoomCode" required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Floor
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input placeholder="Floor" class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="newRoom.Floor" required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input placeholder="Service" class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="newRoom.RoomTypeId" required />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              Add
            </button>
            <button @click="showAddModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal sửa -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="editModal">
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Edit Room</h2>
        <form @submit.prevent="editBill">
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            Chi tiết
          </h2>
          <!-- first pay & payDay -->
          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Deposit Date
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.firstPay"
                  disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.payDay"
                  required disabled />
              </div>
            </div>
          </div>

          <!-- status & payment type -->
          <div class="flex items-center justify-center space-x-3 mb-5">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Status
              </label>
              <div class="relative">
                <div class="absolute z-10 top-[38px] mt-2 w-full border border-gray-300 rounded-lg shadow-lg bg-white"
                  v-if="isDropdownOpen">
                  <ul class="max-h-60 overflow-y-auto">
                    <li v-for="(option, index) in statusOptions" :key="index"
                      class="px-4 py-2 cursor-pointer hover:bg-gray-100" @click="selectStatus(option)" :class="{
        'hover:bg-gray-100': !isSelected(option),
        'bg-gray-100': isSelected(option),
      }">
                      {{ option }}
                    </li>
                  </ul>
                </div>
                <div
                  class="px-4 py-2 cursor-pointer w-full text-base ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] flex items-center justify-between"
                  @click="toggleDropdown">
                  <span class="flex">
                    {{ selectedStatus || billsDetail.status }}
                  </span>
                  <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5 7l5 5 5-5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Payment Type
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.paymentType" required disabled />
              </div>
            </div>
          </div>

          <!-- Booking & contact -->
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            ĐẶT PHÒNG & LIÊN HỆ
          </h2>
          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.clientName" required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Email
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.email"
                  required disabled />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.phoneNumber" required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Identity Card
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.cardId"
                  disabled />
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-5">
            <label class="text-lg font-medium text-gray-700 mb-1"> Note </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.note" />
            </div>
          </div>

          <!-- total -->
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            Total
          </h2>
          <div class="flex flex-col mb-2">
            <div class="text-2xl leading-[150%]">
              Ngày đặt: {{ billsDetail.bookday }}
            </div>
          </div>
          <div class="flex flex-col mb-2">
            <div class="text-2xl leading-[150%]">
              Tổng cộng: {{ billsDetail.totalPrice }} VND
            </div>
          </div>
          <div class="flex justify-end">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              Edit
            </button>
            <button @click="showEditModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xem chi tiết -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="viewModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">
          Detail Bill Number {{ billsDetail.bookingId }}
        </h2>
        <form>
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            Chi tiết
          </h2>
          <!-- first pay & payDay -->
          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Deposite Date
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.firstPay"
                  disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Payment Date
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.payDay"
                  required disabled />
              </div>
            </div>
          </div>

          <!-- status & payment type -->
          <div class="flex items-center justify-center space-x-3 mb-5">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Status
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.status"
                  required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Payment Type
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.paymentType" required disabled />
              </div>
            </div>
          </div>

          <!-- Booking & contact -->
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            ĐẶT PHÒNG & LIÊN HỆ
          </h2>
          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.clientName" required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Email
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.email"
                  required disabled />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center space-x-3">
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text"
                  v-model="billsDetail.phoneNumber" required disabled />
              </div>
            </div>
            <div class="flex flex-col mb-4 w-1/2">
              <label class="text-lg font-medium text-gray-700 mb-1">
                Identity Card
              </label>
              <div
                class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.cardId"
                  required disabled />
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-5">
            <label class="text-lg font-medium text-gray-700 mb-1"> Note </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="billsDetail.note"
                required disabled />
            </div>
          </div>

          <!-- total -->
          <h2 class="text-lg uppercase border-b border-solid border-[#506982] pb-[3px] mb-[5px] text-[#506982]">
            Total
          </h2>
          <div class="flex flex-col mb-2">
            <div class="text-2xl leading-[150%]">
              Book Time: {{ billsDetail.bookday }}
            </div>
          </div>
          <div class="flex flex-col mb-2">
            <div class="text-2xl leading-[150%]">
              Total Price: {{ billsDetail.totalPrice }} VND
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="showViewModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xóa -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="deleteModal">
      <!-- @click="showAddModal = false" -->
      <div class="flex flex-col items-center justify-center bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">
          Are you sure you want to delete this room ?
        </h2>
        <form @submit.prevent="deleteRoom">
          <div class="container flex items-center justify-center">
            <button class="button-confirm hover:bg-blue-700 hover:text-white uppercase">
              Yes
            </button>
            <button @click="showDeleteModal" class="button-cancel hover:bg-[#CC0000] hover:text-white uppercase">
              No
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
      nameService: "Quản lý Hóa đơn",
      servicesHeader: [
        "Mã Đơn",
        "Tổng Tiền(VNĐ)",
        "Trạng Thái",
        "Tên Khách Hàng",
        "Email",
        "Số Điện Thoại",
        "CCCD/CMND",
        "Thao Tác",
      ],
      searchForm: "CCCD/CMND, email, số điện thoại, trạng thái",
      operationSettings: {
        showEdit: true,
        showDelete: false,
        showAdd: false,
        showReadme: true,
      },
      searchTerm: "",
      hasSearchResult: true,
      filteredData: [],
      shortData: [],
      fullData: [],
      addModal: false,
      editModal: false,
      deleteModal: false,
      viewModal: false,
      billIdEdit: null,
      newRoom: {
        RoomCode: "",
        Floor: "",
        RoomTypeId: "",
      },
      isDropdownOpen: false,
      selectedStatus: null,
      statusOptions: ["Đã thanh toán", "Bỏ đơn"],
    };
  },
  created() {
    // Sử dụng instance đã được tạo với interceptor
    axiosInstance
      .post("/bill/getall")
      .then((response) => {
        // Gán dữ liệu từ response vào biến roomsData
        // this.fullData = response.data;
        this.fullData = response.data.map((item) => {
          return {
            ...item,
            payDay: moment(item.payDay).format("DD/MM/YYYY - HH:mm:ss"),
            bookday: moment(item.bookday).format("DD/MM/YYYY - HH:mm:ss"), // Chuyển đổi bookday
          };
        });
        // Lọc và chỉ lấy những trường cần thiết cho mảng short
        this.shortData = response.data.map(
          ({
            id,
            bookingId,
            totalPrice,
            status,
            clientName,
            email,
            phoneNumber,
            cardId,
          }) => ({
            id,
            bookingId,
            totalPrice,
            status,
            clientName,
            email,
            phoneNumber,
            cardId,
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
        const identityCardMatch = item.cardId && item.cardId === searchTermInt;

        // Kiểm tra đầy đủ thuộc tính roomCode để tìm số phòng
        const phoneNumberMatch =
          item.phoneNumber && item.phoneNumber === searchTermInt;

        // Kiểm tra xem item có thuộc tính type và có chứa searchTerm không
        const emailMatch =
          item.email &&
          item.email.toLowerCase().includes(this.searchTerm.toLowerCase());

        const statusMatch =
          item.status &&
          item.status.toLowerCase().includes(this.searchTerm.toLowerCase());

        // Trả về true nếu bất kỳ điều kiện nào đúng
        return (
          identityCardMatch || emailMatch || phoneNumberMatch || statusMatch
        );
      });

      // Kiểm tra kết quả tìm kiếm
      if (this.filteredData.length === 0) {
        // Nếu không có kết quả, hiển thị text
        this.hasSearchResult = false;
      } else {
        this.hasSearchResult = true;
      }
    },
    // showAddModal() {
    //   this.addModal = !this.addModal;
    // },
    showEditModal(billId) {
      this.billIdEdit = billId;
      this.editModal = !this.editModal;
      const selectedBill = this.fullData.find((bill) => bill.id === billId);
      this.billsDetail = { ...selectedBill };
    },
    // showDeleteModal(billId) {
    //   this.billIdEdit = billId;
    //   this.deleteModal = !this.deleteModal;
    // },
    showViewModal(billId) {
      this.billIdEdit = billId;
      this.viewModal = !this.viewModal;
      this.billsDetail = this.fullData.find((bill) => bill.id === billId);
    },
    editBill() {
      const billId = this.billIdEdit;

      // Tạo object chứa dữ liệu của phòng cần sửa
      const billData = {
        id: billId,
        status: this.selectedStatus || this.billsDetail.status,
        // payDay: moment(this.billsDetail.payDay).format("YYYY-MM-DDTHH:mm:ss"),
        payDay: this.billsDetail.payDay
          ? moment(this.billsDetail.payDay).format("YYYY-MM-DDTHH:mm:ss")
          : null,
      };
      // Gửi request axios để sửa phòng với billId
      axiosInstance
        .post(`/bill/save`, billData) // Gửi dữ liệu dưới dạng JSON
        .then(() => {
          // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
          return axiosInstance.post("/bill/getall");
        })
        .then((response) => {
          this.fullData = response.data.map((item) => {
            return {
              ...item,
              payDay: moment(item.payDay).format("DD/MM/YYYY - HH:mm:ss"),
              bookday: moment(item.bookday).format("DD/MM/YYYY - HH:mm:ss"), // Chuyển đổi bookday
            };
          });
          // Lọc và chỉ lấy những trường cần thiết cho mảng short
          this.shortData = response.data.map(
            ({
              id,
              bookingId,
              totalPrice,
              status,
              clientName,
              email,
              phoneNumber,
              cardId,
            }) => ({
              id,
              bookingId,
              totalPrice,
              status,
              clientName,
              email,
              phoneNumber,
              cardId,
            })
          );
          this.shortData.sort((a, b) => b.id - a.id);

          if (!this.searchTerm.trim()) {
            // Nếu không, hiển thị toàn bộ dữ liệu
            this.filteredData = this.shortData;
          }
          // Xử lý sau khi sửa phòng thành công
          alert("Sửa hoá đơn thành công");
          this.editModal = false;
          this.billIdEdit = null;
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          alert("Lỗi khi sửa hoá đơn:", error);
        });
    },
    // deleteRoom() {
    //   const billId = this.billIdEdit;
    //   const billData = {
    //     id: billId,
    //   };
    //   if (this.billIdEdit) {
    //     // Gửi request axios để xóa phòng với billId
    //     axiosInstance
    //       .post(`/room/Delete`, billData)
    //       .then(() => {
    //         // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
    //         return axiosInstance.post("/room/getall");
    //       })
    //       .then((response) => {
    //         this.fullData = response.data.map(
    //           ({
    //             id,
    //             roomCode,
    //             typeName,
    //             numofPeople,
    //             price,
    //             floor,
    //             service,
    //           }) => ({
    //             id,
    //             roomCode,
    //             typeName,
    //             numofPeople,
    //             price,
    //             floor,
    //             service,
    //           })
    //         );
    //         // Lọc và chỉ lấy những trường cần thiết cho mảng short
    //         this.shortData = response.data.map(
    //           ({ id, roomCode, typeName, price, description }) => ({
    //             id,
    //             roomCode,
    //             typeName,
    //             price,
    //             description,
    //           })
    //         );
    //         this.shortData.sort((a, b) => a.roomCode - b.roomCode);

    //         if (!this.searchTerm.trim()) {
    //           // Nếu không, hiển thị toàn bộ dữ liệu
    //           this.filteredData = this.shortData;
    //         }
    //         // Xử lý sau khi xóa phòng thành công
    //         alert("Xóa phòng thành công");

    //         // Ẩn modal xóa
    //         this.deleteModal = false;
    //       })
    //       .catch((error) => {
    //         // Xử lý lỗi nếu có
    //         alert("Lỗi khi xóa phòng:", error);
    //       });
    //   } else {
    //     // Trường hợp billIdEdit không có giá trị
    //     console.error("Vui lòng chọn id phòng để xóa");
    //   }
    // },
    // addRoom() {
    //   // Tạo object chứa dữ liệu của phòng cần sửa
    //   const billData = {
    //     RoomCode: this.newRoom.RoomCode,
    //     Floor: this.newRoom.Floor,
    //     RoomTypeId: this.newRoom.RoomTypeId,
    //   };

    //   // Gửi request axios để sửa phòng với billId
    //   axiosInstance
    //     .post(`/room/Save`, billData) // Gửi dữ liệu dưới dạng JSON
    //     .then(() => {
    //       // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
    //       return axiosInstance.post("/room/getall");
    //     })
    //     .then((response) => {
    //       this.fullData = response.data.map(
    //         ({
    //           id,
    //           roomCode,
    //           typeName,
    //           numofPeople,
    //           price,
    //           floor,
    //           service,
    //         }) => ({
    //           id,
    //           roomCode,
    //           typeName,
    //           numofPeople,
    //           price,
    //           floor,
    //           service,
    //         })
    //       );
    //       // Lọc và chỉ lấy những trường cần thiết cho mảng short
    //       this.shortData = response.data.map(
    //         ({ id, roomCode, typeName, price, description }) => ({
    //           id,
    //           roomCode,
    //           typeName,
    //           price,
    //           description,
    //         })
    //       );
    //       this.shortData.sort((a, b) => a.roomCode - b.roomCode);

    //       if (!this.searchTerm.trim()) {
    //         // Nếu không, hiển thị toàn bộ dữ liệu
    //         this.filteredData = this.shortData;
    //       }
    //       // Xử lý sau khi sửa phòng thành công
    //       alert("Thêm mới phòng thành công");
    //       this.addModal = false;
    //       // this.newRoom = {};
    //     })
    //     .catch((error) => {
    //       // Xử lý lỗi nếu có
    //       alert("Lỗi khi thêm mới phòng: ", error);
    //     });
    // },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectStatus(status) {
      this.selectedStatus = status;
      if (status === "Đã thanh toán") {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        this.billsDetail.payDay = formattedDate;
      } else if (status === "Bỏ đơn") {
        this.billsDetail.payDay = null;
      }
      this.isDropdownOpen = false;
    },
    isSelected(option) {
      return option === this.selectedStatus;
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
