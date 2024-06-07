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
          <button
            class="ml-2 px-4 py-2 uppercase bg-green-500 text-white rounded-lg hover:bg-green-700 flex items-center">
            {{ popupContent.addService }}
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
                <td :key="key"
                  class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                  <div class="text-sm text-gray-900">{{ value }}</div>
                </td>
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
            Trang {{ currentPage }} của {{ totalPage }}
          </span>
          <button :disabled="currentPage === totalPage || !hasNextPage" @click="currentPage++"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300">
            Sau
          </button>
        </div>
      </div>
    </div>

    <!-- modal thêm mới service đã xong -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="addModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-8 uppercase">
          {{ popupContent.addService }}
        </h2>
        <form @submit.prevent="addService">
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceName }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input :placeholder="popupContent.serviceName" class="bg-transparent border-none flex-1 outline-none"
                type="text" v-model="newService.serviceName" required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.servicePrice }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input :placeholder="popupContent.servicePrice" class="bg-transparent border-none flex-1 outline-none"
                type="text" v-model="newService.price" required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceDescript }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input :placeholder="popupContent.serviceDescript" class="bg-transparent border-none flex-1 outline-none"
                type="text" v-model="newService.serviceDescription" />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button class="button-confirm uppercase hover:bg-blue-700 hover:text-white">
              {{ popupContent.addService }}
            </button>
            <button @click="showAddModal" class="button-cancel uppercase hover:bg-[#CC0000] hover:text-white">
              {{ popupContent.calcelService }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal sửa service đã xong -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="editModal">
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl uppercase font-bold mb-4">
          {{ popupContent.editService }}
        </h2>
        <form @submit.prevent="editService">
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Service Code
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="serviceDetail.id"
                required disabled />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceName }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="serviceDetail.serviceName" required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.servicePrice }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="serviceDetail.price"
                required />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceDescript }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="serviceDetail.serviceDescription" />
            </div>
          </div>
          <div class="flex justify-end">
            <button class="button-confirm uppercase hover:bg-blue-700 hover:text-white">
              {{ popupContent.editService }}
            </button>
            <button @click="showEditModal" class="button-cancel uppercase hover:bg-[#CC0000] hover:text-white">
              {{ popupContent.calcelService }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xem chi tiết đã xong -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="viewModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Chi tiết</h2>
        <form>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              Service Code
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="serviceDetail.id"
                disabled />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceName }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="serviceDetail.serviceName" required disabled />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.servicePrice }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text" v-model="serviceDetail.price"
                required disabled />
            </div>
          </div>
          <div class="flex flex-col mb-4">
            <label class="text-lg font-medium text-gray-700 mb-1">
              {{ popupContent.serviceDescript }}
            </label>
            <div
              class="px-4 py-2 w-full text-base divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
              <input class="bg-transparent border-none flex-1 outline-none" type="text"
                v-model="serviceDetail.serviceDescription" disabled />
            </div>
          </div>
          <div class="flex justify-end">
            <button @click="showViewModal" class="button-cancel uppercase hover:bg-[#CC0000] hover:text-white">
              {{ popupContent.calcelService }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xóa đã xong -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="deleteModal">
      <!-- @click="showAddModal = false" -->
      <div class="flex flex-col items-center justify-center bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Bạn có chắc chắn muốn xóa ?</h2>
        <form @submit.prevent="deleteService">
          <div class="container flex items-center justify-center">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              CÓ
            </button>
            <button @click="showDeleteModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
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
        serviceName: "Tên Dịch Vụ",
        servicePrice: "Giá Tiền(VNĐ)",
        serviceDescript: "Mô Tả",
        editService: "Sửa",
        addService: "Thêm mới",
        calcelService: "Đóng",
      },
      currentPage: 1,
      itemPerPage: 12,
      searchSVG: require("@/assets/svg-file/search.svg"),
      nameService: "Quản lý Dịch vụ",
      servicesHeader: [
        "Mã Dịch Vụ",
        "Tên Dịch Vụ",
        "Giá Tiền(VNĐ)",
        "Mô Tả",
        "Thao Tác",
      ],
      searchForm: "Mã dịch vụ, tên dịch vụ",
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
      addModal: false,
      editModal: false,
      deleteModal: false,
      viewModal: false,
      serviceIdEdit: null,
      //   newService dùng cho thêm mới
      newService: {
        serviceName: "",
        price: null,
        serviceDescription: "",
      },
    };
  },
  created() {
    // Sử dụng instance đã được tạo với interceptor
    axiosInstance
      .post("/service/getall")
      .then((response) => {
        // Lọc và chỉ lấy những trường cần thiết cho mảng short
        this.shortData = response.data.map(
          ({ id, serviceName, serviceDescription, price }) => ({
            id,
            serviceName,
            price,
            serviceDescription,
          })
        );
        this.shortData.sort((a, b) => a.id - b.id);

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
            Math.min(3, this.searchTerm.length)
          );
          // Kiểm tra xem prefix có phải là số không
          if (!isNaN(prefix)) {
            // Kiểm tra xem item có thuộc tính roomCode không
            if (item.id) {
              // So sánh roomCode với prefix
              const serviceIdStr = item.id.toString();
              if (serviceIdStr.includes(prefix)) {
                return true;
              }
            }
          }
        }
        // Kiểm tra xem item có thuộc tính roomCode và có chứa searchTerm không
        const searchTermInt = parseInt(this.searchTerm);
        // Kiểm tra đầy đủ thuộc tính roomCode để tìm số phòng
        const serviceCodeMatch = item.id && item.id === searchTermInt;

        // Kiểm tra xem item có thuộc tính type và có chứa searchTerm không
        const serviceNameMatch =
          item.serviceName &&
          item.serviceName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());

        // Trả về true nếu bất kỳ điều kiện nào đúng
        return serviceCodeMatch || serviceNameMatch;
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
    },
    showEditModal(serviceId) {
      this.serviceIdEdit = serviceId;
      this.editModal = !this.editModal;
      const selectedService = this.shortData.find(
        (service) => service.id === serviceId
      );
      this.serviceDetail = { ...selectedService };
    },
    showDeleteModal(serviceId) {
      this.serviceIdEdit = serviceId;
      this.deleteModal = !this.deleteModal;
    },
    showViewModal(serviceId) {
      this.serviceIdEdit = serviceId;
      this.viewModal = !this.viewModal;
      this.serviceDetail = this.shortData.find(
        (service) => service.id === serviceId
      );
    },

    // editService đã sửa
    editService() {
      const serviceId = this.serviceIdEdit;

      // Tạo object chứa dữ liệu của service cần sửa
      const serviceData = {
        id: serviceId,
        serviceName: this.serviceDetail.serviceName,
        price: this.serviceDetail.price,
        serviceDescription: this.serviceDetail.serviceDescription,
      };

      // Gửi request axios để sửa phòng với serviceId
      axiosInstance
        .post(`/service/Save`, serviceData) // Gửi dữ liệu dưới dạng JSON
        .then(() => {
          // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
          return axiosInstance.post("/service/getall");
        })
        .then((response) => {
          this.shortData = response.data.map(
            ({ id, serviceName, serviceDescription, price }) => ({
              id,
              serviceName,
              price,
              serviceDescription,
            })
          );
          this.shortData.sort((a, b) => a.id - b.id);

          if (!this.searchTerm.trim()) {
            // Nếu không, hiển thị toàn bộ dữ liệu
            this.filteredData = this.shortData;
          }
          // Xử lý sau khi sửa phòng thành công
          alert("Sửa dịch vụ thành công");
          this.editModal = false;
          this.serviceIdEdit = null;
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          alert("Lỗi khi sửa dịch vụ:", error);
        });
    },

    // đã sửa và đã hoạt động
    deleteService() {
      const serviceId = this.serviceIdEdit;
      const serviceData = {
        id: serviceId,
      };
      if (this.serviceIdEdit) {
        // Gửi request axios để xóa phòng với serviceId
        axiosInstance
          .post(`/service/delete`, serviceData)
          .then(() => {
            // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
            return axiosInstance.post("/service/getall");
          })
          .then((response) => {
            this.shortData = response.data.map(
              ({ id, serviceName, serviceDescription, price }) => ({
                id,
                serviceName,
                price,
                serviceDescription,
              })
            );
            this.shortData.sort((a, b) => a.id - b.id);

            if (!this.searchTerm.trim()) {
              // Nếu không, hiển thị toàn bộ dữ liệu
              this.filteredData = this.shortData;
            }
            // Xử lý sau khi xóa phòng thành công
            alert("Xóa dịch vụ thành công");

            // Ẩn modal xóa
            this.deleteModal = false;
          })
          .catch((error) => {
            // Xử lý lỗi nếu có
            alert("Lỗi khi xóa dịch vụ:", error);
          });
      } else {
        // Trường hợp serviceIdEdit không có giá trị
        console.error("Vui lòng chọn id dịch vụ để xóa");
      }
    },

    // addService đã sửa
    addService() {
      // Tạo object chứa dữ liệu của phòng cần sửa
      const serviceData = {
        serviceName: this.newService.serviceName,
        price: this.newService.price,
        serviceDescription: this.newService.serviceDescription,
      };

      // Gửi request axios để sửa phòng với serviceId
      axiosInstance
        .post(`/service/Save`, serviceData) // Gửi dữ liệu dưới dạng JSON
        .then(() => {
          // Gửi request để lấy lại toàn bộ danh sách phòng sau khi sửa thành công
          return axiosInstance.post("/service/getall");
        })
        .then((response) => {
          this.shortData = response.data.map(
            ({ id, serviceName, serviceDescription, price }) => ({
              id,
              serviceName,
              price,
              serviceDescription,
            })
          );
          this.shortData.sort((a, b) => a.id - b.id);

          if (!this.searchTerm.trim()) {
            // Nếu không, hiển thị toàn bộ dữ liệu
            this.filteredData = this.shortData;
          }
          // Xử lý sau khi sửa phòng thành công
          alert("Thêm mới dịch vụ thành công");
          this.addModal = false;
          // this.newService = {};
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          alert("Lỗi khi thêm mới dịch vụ: ", error);
        });
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
