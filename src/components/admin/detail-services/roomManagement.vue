<template>
  <div class="roomManagement">
    <Style></Style>
    <div class="p-3">
      <h2 class="text-2xl font-bold mb-3">{{ nameService }}</h2>
      <div class="theInputSearch flex justify-between">
        <div class="mb-6 relative divSharedHeader">
          <div>
            <form @submit.prevent="searchData" action="search">
              <div
                class="px-4 py-3 divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
                style="width: 350px"
              >
                <span class="mr-2">
                  <i class="text-[#6B7075] align-[-0.125rem]">
                    <img :src="searchSVG" alt="Search" />
                  </i>
                </span>
                <!-- sau thay thế phần placeholder theo components -->
                <input
                  class="bg-transparent border-none flex-1 outline-none"
                  type="text"
                  :placeholder="searchForm"
                  v-model="searchTerm"
                  @input="searchData"
                />
              </div>
            </form>
          </div>
        </div>
        <!-- button thêm mới -->
        <div @click="showAddModal" v-if="operationSettings.showAdd">
          <button
            class="ml-2 px-4 py-2 uppercase bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            {{ popupContent.addRoom }}
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="1rem"
                height="1rem"
                class="ml-1"
              >
                <path
                  fill="white"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 
                                32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                />
              </svg>
            </i>
          </button>
        </div>
      </div>
      <div class="dataTable">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="item in servicesHeader"
                :key="item"
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody
            v-if="filteredData.length > 0"
            class="bg-white divide-y divide-gray-200"
          >
            <tr
              v-for="item in paginated"
              :key="item.id"
              class="hover:bg-gray-100"
            >
              <template v-for="(value, key) in item">
                <template v-if="key !== 'id'">
                  <td
                    :key="key"
                    class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]"
                  >
                    <div class="text-sm text-gray-900">{{ value }}</div>
                  </td>
                </template>
              </template>

              <!-- thao tác -->
              <td
                v-if="
                  operationSettings.showEdit || operationSettings.showDelete
                "
                class="px-6 py-4 whitespace-nowrap flex items-center justify-center text-center text-sm font-medium"
              >
                <!-- button sửa -->
                <div
                  class="cursor-pointer"
                  v-if="operationSettings.showEdit"
                  @click="showEditModal(item.id)"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      with="1rem"
                      height="1rem"
                    >
                      <path
                        fill="#0A75CA"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 
                            83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 
                            3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 
                            64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
                      />
                    </svg>
                  </i>
                </div>
                <span
                  v-if="operationSettings.showDelete"
                  class="ml-1 mr-2 text-[20px]"
                  >/</span
                >
                <!-- button xóa -->
                <div
                  class="cursor-pointer"
                  v-if="operationSettings.showDelete"
                  @click="showDeleteModal(item.id)"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      with="1rem"
                      height="1rem"
                    >
                      <path
                        fill="#FF0000"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                      />
                    </svg>
                  </i>
                </div>
                <!-- button xem chi tiết -->
                <span
                  v-if="operationSettings.showReadme"
                  class="ml-1 mr-2 text-[20px]"
                  >/</span
                >
                <div
                  class="cursor-pointer"
                  @click="showViewModal(item.id)"
                  v-if="operationSettings.showReadme"
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      with="1rem"
                      height="1rem"
                    >
                      <path
                        d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"
                      />
                    </svg>
                  </i>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                :colspan="numberOfColumns"
                class="px-6 py-4 text-center whitespace-nowrap"
              >
                <div class="text-xl text-gray-900">Không có kết quả</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="hasSearchResult" class="pagination-container">
        <div class="pagination mt-4 flex justify-center">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300"
          >
            Trước
          </button>
          <span class="px-3 py-1 bg-gray-200 text-gray-700">
            Trang {{ currentPage }} của {{ totalPage }}
          </span>
          <button
            :disabled="currentPage === totalPage || !hasNextPage"
            @click="currentPage++"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
          >
            Sau
          </button>
        </div>
      </div>
    </div>

    <!-- modal thêm mới -->
    <div
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
      v-if="addModal"
    >
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-8 uppercase">Thêm mới phòng</h2>
        <form @submit.prevent="addRoom">
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomCode }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                :placeholder="popupContent.roomCode"
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="newRoom.RoomCode"
                required
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.floor }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                :placeholder="popupContent.floor"
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="newRoom.Floor"
                required
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomTypeName }}
            </label>
            <div class="relative">
              <div
                class="absolute z-10 top-[38px] mt-2 w-full border border-gray-300 rounded-lg shadow-lg bg-white"
                v-if="isDropdownOpenRoomType"
              >
                <ul class="max-h-60 overflow-y-auto rounded-lg">
                  <li
                    v-for="roomType in roomTypes"
                    :key="roomType.id"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    @click="selectRoomTypeForAdd(roomType)"
                    :class="{
                      'hover:bg-gray-100': !isSelectedRoomType(roomType),
                      'bg-gray-100': isSelectedRoomType(roomType),
                    }"
                  >
                    {{ roomType.typeName }}
                  </li>
                </ul>
              </div>
              <div
                class="px-4 py-2 cursor-pointer w-full text-base ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] flex items-center justify-between"
                @click="toggleDropdownRoomType"
              >
                <span class="flex">
                  {{ selectedRoomType.typeName || "Vui lòng chọn Loại phòng" }}
                </span>
                <svg
                  class="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 7l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              class="button-confirm uppercase hover:bg-blue-700 hover:text-white"
            >
              {{ popupContent.addRoom }}
            </button>
            <button
              @click="showAddModal"
              class="button-cancel uppercase hover:bg-[#CC0000] hover:text-white"
            >
              {{ popupContent.calcelRoom }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal sửa -->
    <div
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
      v-if="editModal"
    >
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Sửa phòng</h2>
        <form @submit.prevent="editRoom">
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomCode }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.roomCode"
                required
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.floor }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.floor"
                required
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomTypeName }}
            </label>
            <div class="relative">
              <div
                class="absolute z-10 top-[38px] mt-2 w-full border border-gray-300 rounded-lg shadow-lg bg-white"
                v-if="isDropdownOpenRoomType"
              >
                <ul class="max-h-60 overflow-y-auto rounded-lg">
                  <li
                    v-for="roomType in roomTypes"
                    :key="roomType.id"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    @click="selectRoomTypeForEdit(roomType)"
                    :class="{
                      'hover:bg-gray-100': !isSelectedRoomType(roomType),
                      'bg-gray-100': isSelectedRoomType(roomType),
                    }"
                  >
                    {{ roomType.typeName }}
                  </li>
                </ul>
              </div>
              <div
                class="px-4 py-2 cursor-pointer w-full text-base ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] flex items-center justify-between"
                @click="toggleDropdownRoomType"
              >
                <span class="flex">
                  {{ selectedRoomType.typeName || roomDetail.typeName }}
                </span>
                <svg
                  class="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 7l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomStatus }}
            </label>
            <div class="relative">
              <div
                class="absolute z-10 top-[38px] mt-2 w-full border border-gray-300 rounded-lg shadow-lg bg-white"
                v-if="isDropdownOpen"
              >
                <ul class="max-h-60 overflow-y-auto rounded-lg">
                  <li
                    v-for="(option, index) in statusOptions"
                    :key="index"
                    class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    @click="selectStatus(option)"
                    :class="{
                      'hover:bg-gray-100': !isSelected(option),
                      'bg-gray-100': isSelected(option),
                    }"
                  >
                    {{ option }}
                  </li>
                </ul>
              </div>
              <div
                class="px-4 py-2 cursor-pointer w-full text-base ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC] flex items-center justify-between"
                @click="toggleDropdown"
              >
                <span class="flex">
                  {{ selectedStatus || roomDetail.roomStatus }}
                </span>
                <svg
                  class="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 7l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              {{ popupContent.editRoom }}
            </button>
            <button
              @click="showEditModal"
              class="button-cancel hover:bg-[#CC0000] hover:text-white"
            >
              {{ popupContent.calcelRoom }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xem chi tiết -->
    <div
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
      v-if="viewModal"
    >
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Chi tiết</h2>
        <form>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomCode }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.roomCode"
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomTypeName }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.typeName"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Số người trong phòng
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.numofPeople"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.floor }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.floor"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Dịch vụ đi kèm
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.service"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Giá tiền(VNĐ)
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.price"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.roomStatus }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]"
            >
              <input
                class="bg-transparent border-none flex-1 outline-none"
                type="text"
                v-model="roomDetail.roomStatus"
                required
                disabled
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="showViewModal"
              class="button-cancel hover:bg-[#CC0000] hover:text-white"
            >
              {{ popupContent.calcelRoom }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xóa -->
    <div
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
      v-if="deleteModal"
    >
      <!-- @click="showAddModal = false" -->
      <div
        class="flex flex-col items-center justify-center bg-white p-8 rounded-lg m-auto"
      >
        <h2 class="text-2xl font-bold mb-4">Bạn có thực sự muốn xóa ?</h2>
        <form @submit.prevent="deleteRoom">
          <div class="container flex items-center justify-center">
            <button
              class="button-confirm hover:bg-blue-700 hover:text-white uppercase"
            >
              CÓ
            </button>
            <button
              @click="showDeleteModal"
              class="button-cancel hover:bg-[#CC0000] hover:text-white uppercase"
            >
              KHÔNG
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

export default {
  components: {
    Style,
  },
  data() {
    return {
      popupContent: {
        roomCode: "Mã Phòng",
        floor: "Số Tầng",
        roomTypeName: "Loại Phòng",
        roomStatus: "Trạng thái",
        editRoom: "Sửa",
        addRoom: "Thêm mới",
        calcelRoom: "Đóng",
      },
      currentPage: 1,
      itemPerPage: 12,
      searchSVG: require("@/assets/svg-file/search.svg"),
      nameService: "Quản lý Phòng",
      servicesHeader: [
        "Mã Phòng",
        "Loại Phòng",
        "Giá tiền(VNĐ)",
        "Mô Tả",
        "Trạng Thái",
        "Thao Tác",
      ],
      searchForm: "Mã phòng, loại phòng, giá tiền, trạng thái",
      operationSettings: {
        showEdit: true,
        showDelete: true,
        showAdd: true,
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
      roomIdEdit: null,
      newRoom: {
        RoomCode: "",
        Floor: "",
        RoomTypeId: "",
      },
      isDropdownOpen: false,
      isDropdownOpenRoomType: false,
      selectedStatus: null,
      statusOptions: ["Varcant", "Occupied", "Cleaning", "Maintaining"],
      selectedRoomType: "", // Biến lưu giá trị của loại phòng được chọn
      roomTypes: [], // Mảng lưu danh sách các loại phòng
    };
  },
  created() {
    // Sử dụng instance đã được tạo với interceptor
    Promise.all([
      axiosInstance.post("/room/getall"),
      axiosInstance.post("/roomtype/getall"),
    ])
      .then((responses) => {
        // Xử lý dữ liệu từ response của yêu cầu lấy thông tin phòng
        const roomResponse = responses[0];
        this.fullData = roomResponse.data.map(
          ({
            id,
            roomCode,
            typeName,
            roomTypeId,
            numofPeople,
            price,
            floor,
            service,
            roomStatus,
          }) => ({
            id,
            roomCode,
            typeName,
            numofPeople,
            price,
            floor,
            service,
            roomTypeId,
            roomStatus,
          })
        );

        // Lọc và chỉ lấy những trường cần thiết cho mảng short
        this.shortData = roomResponse.data.map(
          ({ id, roomCode, typeName, price, description, roomStatus }) => ({
            id,
            roomCode,
            typeName,
            price,
            description,
            roomStatus,
          })
        );
        this.shortData.sort((a, b) => a.roomCode - b.roomCode);

        if (!this.searchTerm.trim()) {
          // Nếu không, hiển thị toàn bộ dữ liệu
          this.filteredData = this.shortData;
        }

        // Xử lý dữ liệu từ response của yêu cầu lấy thông tin loại phòng
        this.roomTypes = responses[1].data.map(({ id, typeName }) => ({
          id,
          typeName,
        }));
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
            Math.min(3, this.searchTerm.length)
          );
          // Kiểm tra xem prefix có phải là số không
          if (!isNaN(prefix)) {
            // Kiểm tra xem item có thuộc tính roomCode không
            if (item.roomCode) {
              // So sánh roomCode với prefix
              const roomCodeStr = item.roomCode.toString();
              if (roomCodeStr.includes(prefix)) {
                return true;
              }
            }
          }
        }
        // Kiểm tra xem item có thuộc tính roomCode và có chứa searchTerm không
        const searchTermInt = parseInt(this.searchTerm);
        // Kiểm tra đầy đủ thuộc tính roomCode để tìm số phòng
        const roomCodeMatch = item.roomCode && item.roomCode === searchTermInt;

        // Kiểm tra đầy đủ thuộc tính roomCode để tìm số phòng
        const priceMatch = item.price && item.price === searchTermInt;

        // Kiểm tra xem item có thuộc tính type và có chứa searchTerm không
        const typeMatch =
          item.typeName &&
          item.typeName.toLowerCase().includes(this.searchTerm.toLowerCase());

        const roomStatusMatch =
          item.roomStatus &&
          item.roomStatus.toLowerCase().includes(this.searchTerm.toLowerCase());

        // Trả về true nếu bất kỳ điều kiện nào đúng
        return roomCodeMatch || typeMatch || priceMatch || roomStatusMatch;
      });

      // Kiểm tra kết quả tìm kiếm
      if (this.filteredData.length === 0) {
        // Nếu không có kết quả, hiển thị text
        this.hasSearchResult = false;
      } else {
        this.hasSearchResult = true;
      }
    },
    showAddModal() {
      this.addModal = !this.addModal;
      this.newRoom.RoomCode = null;
      this.newRoom.Floor = null;
      this.newRoom.RoomTypeId = null;
    },
    showEditModal(roomId) {
      this.roomIdEdit = roomId;
      this.editModal = !this.editModal;
      const selectedRoom = this.fullData.find((room) => room.id === roomId);
      this.roomDetail = { ...selectedRoom };
    },
    showDeleteModal(roomId) {
      this.roomIdEdit = roomId;
      this.deleteModal = !this.deleteModal;
    },
    showViewModal(roomId) {
      this.roomIdEdit = roomId;
      this.viewModal = !this.viewModal;
      this.roomDetail = this.fullData.find((room) => room.id === roomId);
    },
    editRoom() {
      const roomId = this.roomIdEdit;

      // Tạo object chứa dữ liệu của phòng cần sửa
      const roomData = {
        id: roomId,
        RoomCode: this.roomDetail.roomCode,
        Floor: this.roomDetail.floor,
        RoomTypeId: this.roomDetail.roomTypeId,
        roomStatus: this.selectedStatus || this.roomDetail.roomStatus,
      };

      // Gửi request axios để sửa phòng với roomId
      axiosInstance
        .post(`/room/Save`, roomData) // Gửi dữ liệu dưới dạng JSON
        .then(() => {
          // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
          return axiosInstance.post("/room/getall");
        })
        .then((response) => {
          this.fullData = response.data.map(
            ({
              id,
              roomCode,
              typeName,
              numofPeople,
              price,
              floor,
              service,
              roomTypeId,
              roomStatus,
            }) => ({
              id,
              roomCode,
              typeName,
              numofPeople,
              price,
              floor,
              service,
              roomTypeId,
              roomStatus,
            })
          );
          // Lọc và chỉ lấy những trường cần thiết cho mảng short
          this.shortData = response.data.map(
            ({ id, roomCode, typeName, price, description, roomStatus }) => ({
              id,
              roomCode,
              typeName,
              price,
              description,
              roomStatus,
            })
          );
          this.shortData.sort((a, b) => a.roomCode - b.roomCode);

          if (!this.searchTerm.trim()) {
            // Nếu không, hiển thị toàn bộ dữ liệu
            this.filteredData = this.shortData;
          }
          // Xử lý sau khi sửa phòng thành công
          alert("Sửa phòng thành công");
          this.editModal = false;
          this.roomIdEdit = null;
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          alert("Lỗi khi sửa phòng:", error);
        });
    },
    deleteRoom() {
      const roomId = this.roomIdEdit;
      const roomData = {
        id: roomId,
      };
      if (this.roomIdEdit) {
        // Gửi request axios để xóa phòng với roomId
        axiosInstance
          .post(`/room/Delete`, roomData)
          .then(() => {
            // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
            return axiosInstance.post("/room/getall");
          })
          .then((response) => {
            this.fullData = response.data.map(
              ({
                id,
                roomCode,
                typeName,
                numofPeople,
                price,
                floor,
                service,
                roomStatus,
              }) => ({
                id,
                roomCode,
                typeName,
                numofPeople,
                price,
                floor,
                service,
                roomStatus,
              })
            );
            // Lọc và chỉ lấy những trường cần thiết cho mảng short
            this.shortData = response.data.map(
              ({ id, roomCode, typeName, price, description, roomStatus }) => ({
                id,
                roomCode,
                typeName,
                price,
                description,
                roomStatus,
              })
            );
            this.shortData.sort((a, b) => a.roomCode - b.roomCode);

            if (!this.searchTerm.trim()) {
              // Nếu không, hiển thị toàn bộ dữ liệu
              this.filteredData = this.shortData;
            }
            // Xử lý sau khi xóa phòng thành công
            alert("Xóa phòng thành công");

            // Ẩn modal xóa
            this.deleteModal = false;
          })
          .catch((error) => {
            // Xử lý lỗi nếu có
            alert("Lỗi khi xóa phòng:", error);
          });
      } else {
        // Trường hợp roomIdEdit không có giá trị
        console.error("Vui lòng chọn id phòng để xóa");
      }
    },
    addRoom() {
      // Tạo object chứa dữ liệu của phòng cần sửa
      const roomData = {
        RoomCode: this.newRoom.RoomCode,
        Floor: this.newRoom.Floor,
        RoomTypeId: this.newRoom.RoomTypeId,
      };

      // Gửi request axios để sửa phòng với roomId
      axiosInstance
        .post(`/room/Save`, roomData) // Gửi dữ liệu dưới dạng JSON
        .then(() => {
          // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
          return axiosInstance.post("/room/getall");
        })
        .then((response) => {
          this.fullData = response.data.map(
            ({
              id,
              roomCode,
              typeName,
              numofPeople,
              price,
              floor,
              service,
              roomStatus,
            }) => ({
              id,
              roomCode,
              typeName,
              numofPeople,
              price,
              floor,
              service,
              roomStatus,
            })
          );
          // Lọc và chỉ lấy những trường cần thiết cho mảng short
          this.shortData = response.data.map(
            ({ id, roomCode, typeName, price, description, roomStatus }) => ({
              id,
              roomCode,
              typeName,
              price,
              description,
              roomStatus,
            })
          );
          this.shortData.sort((a, b) => a.roomCode - b.roomCode);

          if (!this.searchTerm.trim()) {
            // Nếu không, hiển thị toàn bộ dữ liệu
            this.filteredData = this.shortData;
          }
          // Xử lý sau khi sửa phòng thành công
          alert("Thêm mới phòng thành công");
          this.resetNewRoomData();
          this.addModal = false;
          // this.newRoom = {};
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          alert("Lỗi khi thêm mới phòng: ", error);
        });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectStatus(status) {
      // this.selectedStatus = status;
      this.roomDetail.roomStatus = status;
      this.isDropdownOpen = false;
    },
    isSelected(option) {
      return option === this.selectedStatus;
    },
    toggleDropdownRoomType() {
      this.isDropdownOpenRoomType = !this.isDropdownOpenRoomType;
    },
    selectRoomTypeForEdit(roomType) {
      this.selectedRoomType = roomType; // Cập nhật selectedRoomType thành roomType
      this.roomDetail.roomTypeId = roomType.id; // Lưu ID của loại phòng được chọn
      this.isDropdownOpenRoomType = false; // Đóng dropdown sau khi chọn
    },
    selectRoomTypeForAdd(roomType) {
      this.selectedRoomType = roomType; // Cập nhật selectedRoomType thành roomType
      this.newRoom.RoomTypeId = roomType.id; // Lưu ID của loại phòng được chọn
      this.isDropdownOpenRoomType = false; // Đóng dropdown sau khi chọn
    },
    isSelectedRoomType(roomType) {
      if (this.roomDetail && this.roomDetail.roomTypeId) {
        return this.roomDetail.roomTypeId === roomType.id;
      }
      return false;
    },
    resetNewRoomData() {
      this.newRoom = {
        RoomCode: "",
        Floor: "",
        RoomTypeId: "",
      };
      this.selectedRoomType.id = ""; // Đặt lại giá trị room type đã chọn
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
