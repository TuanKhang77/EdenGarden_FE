<template>
  <div class="basePage">
    <div class="p-3">
      <h2 class="text-2xl font-bold mb-3">{{ nameServiceChild }}</h2>
      <!-- đoạn loading thêm sau -->
      <!-- <div v-if="isLoading">Loading...</div> -->
      <div class="theInputSearch flex justify-between">
        <div class="mb-6 relative divSharedHeader">
          <div>
            <form @submit.prevent="searchData" action="search">
              <div class="px-4 py-3 divForm ring-1 leading-[150%] rounded-lg text-[#1C1F23] bg-[#F6F9FC]">
                <span class="mr-2">
                  <i class="text-[#6B7075] align-[-0.125rem]">
                    <img :src="searchSVG" alt="Search" />
                  </i>
                </span>
                <!-- sau thay thế phần placeholder theo components -->
                <input class="bg-transparent border-none flex-1 outline-none" type="text" :placeholder="searchFormChild"
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
              <th scope="col" v-if="service1Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service1Child }}
              </th>
              <th scope="col" v-if="service2Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service2Child }}
              </th>
              <th scope="col" v-if="service3Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service3Child }}
              </th>
              <th scope="col" v-if="service4Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service4Child }}
              </th>
              <th scope="col" v-if="service5Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service5Child }}
              </th>
              <th scope="col" v-if="service6Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service6Child }}
              </th>
              <th scope="col" v-if="service7Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service7Child }}
              </th>
              <th scope="col" v-if="service8Child"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ service8Child }}
              </th>
            </tr>
          </thead>
          <tbody v-if="filteredData.length > 0" class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in paginated" :key="index" class="hover:bg-gray-100">
              <td v-for="(value, index) in item" :key="index"
                class="px-6 py-4 text-center whitespace-pre-wrap overflow-hidden text-ellipsis max-w-[200px]">
                <div class="text-sm text-gray-900">{{ value }}</div>
              </td>
              <td v-if="operationSettings.showEdit || operationSettings.showDelete
        " class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <!-- button sửa -->
                <button v-if="operationSettings.showEdit" @click="showEditModal">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" with="1rem" height="1rem">
                      <path fill="#0A75CA"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 
                            83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 
                            3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 
                            64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                    </svg>
                  </i>
                </button>
                <span v-if="operationSettings.showDelete" class="ml-1 mr-2 text-[20px]">/</span>
                <!-- button xóa -->
                <button v-if="operationSettings.showDelete" @click="showDeleteModal">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" with="1rem" height="1rem">
                      <path fill="#FF0000"
                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </i>
                </button>
                <!-- button xem chi tiết -->
                <span v-if="operationSettings.showReadme" class="ml-1 mr-2 text-[20px]">/</span>
                <button @click="showViewModal" v-if="operationSettings.showReadme">
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" with="1rem" height="1rem">
                      <path
                        d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
                    </svg>
                  </i>
                </button>
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
        <h2 class="text-2xl font-bold mb-8 uppercase">Thêm mới</h2>
        <form @submit.prevent="addRoom">
          <div v-for="(item, index) in fieldLabels" :key="index" class="mb-4">
            <label for="roomCode" class="block text-sm font-medium text-gray-700">{{ item }}</label>
            <input type="text" id="roomCode"
              class="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required />
          </div>
          <div class="flex justify-end space-x-2">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              Thêm mới
            </button>
            <button @click="showAddModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal sửa -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="editModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Sửa</h2>
        <form @submit.prevent="addRoom">
          <div v-for="(item, index) in fieldLabels" :key="index" class="mb-4">
            <label class="block text-sm font-medium text-gray-700">{{
        item
      }}</label>
            <input type="text" v-model="localFullData[index]"
              class="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required />
          </div>
          <div class="flex justify-end">
            <button class="button-confirm hover:bg-blue-700 hover:text-white">
              Sửa
            </button>
            <button @click="showEditModal" class="button-cancel hover:bg-[#CC0000] hover:text-white">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal xem chi tiết -->
    <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" v-if="viewModal">
      <!-- @click="showAddModal = false" -->
      <div class="modalContainer bg-white p-8 rounded-lg m-auto">
        <h2 class="text-2xl font-bold mb-4">Chi tiết</h2>
        <form>
          <div v-for="(item, index) in fieldLabels" :key="index" class="mb-4">
            <label class="block text-sm font-medium text-gray-700">{{
        item
      }}</label>
            <input disabled type="text" v-model="localFullData[index]"
              class="mt-1 p-2 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required />
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
        <h2 class="text-2xl font-bold mb-4">Bạn có chắc chắn muốn xóa ?</h2>
        <form @submit.prevent="addRoom">
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
    {{ this.localFullData }}
  </div>
</template>

<script>
export default {
  props: {
    nameServiceChild: String,
    service1Child: String,
    service2Child: String,
    service3Child: String,
    service4Child: String,
    service5Child: String,
    service6Child: String,
    service7Child: String,
    service8Child: String,
    searchFormChild: String,
    operationSettings: Object,
    tableData: {
      type: Array,
      default: () => [],
    },
    fullData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      itemPerPage: 12,
      searchSVG: require("@/assets/svg-file/search.svg"),
      searchTerm: "",
      filteredData: [],
      hasSearchResult: true,
      addModal: false,
      editModal: false,
      deleteModal: false,
      viewModal: false,
      localFullData: [],
    };
  },
  created() {
    this.filteredData = this.tableData;
    this.localFullData = this.fullData;
    this.$parent.$on("update-full-data", (data) => {
      this.localFullData = data;
    });
    this.$parent.$on("update-filtered-data", (data) => {
      this.filteredData = data;
    });
  },
  methods: {
    searchData() {
      // Kiểm tra xem có từ khóa tìm kiếm không
      if (typeof this.searchTerm !== "undefined" && !this.searchTerm.trim()) {
        // Nếu không có từ khóa, hiển thị toàn bộ dữ liệu
        this.filteredData = this.tableData;
        return;
      }

      this.filteredData = this.tableData.filter((item) => {
        // Kiểm tra xem searchTerm có ít nhất 1 ký tự không
        if (this.searchTerm.length >= 1) {
          // Lấy 1, 2, 3 hoặc 4 ký tự đầu tiên của searchTerm
          const prefix = this.searchTerm.substring(
            0,
            Math.min(5, this.searchTerm.length)
          );
          // Kiểm tra xem prefix có phải là số không
          if (!isNaN(prefix)) {
            // Kiểm tra xem item có thuộc tính staffCode không
            if (item.staffCode) {
              // So sánh staffCode với prefix
              const staffCodeStr = item.staffCode.toString();
              if (staffCodeStr.includes(prefix)) {
                return true;
              }
            }
          }
        }
        // Kiểm tra xem searchTerm có ít nhất 1 ký tự không
        if (this.searchTerm.length >= 1) {
          // Lấy 1, 2, 3 hoặc 4 ký tự đầu tiên của searchTerm
          const prefix = this.searchTerm.substring(
            0,
            Math.min(4, this.searchTerm.length)
          );
          // Kiểm tra xem prefix có phải là số không
          if (!isNaN(prefix)) {
            // Kiểm tra xem item có thuộc tính serviceCode không
            if (item.serviceCode) {
              // So sánh serviceCode với prefix
              const serviceCodeStr = item.serviceCode.toString();
              if (serviceCodeStr.includes(prefix)) {
                return true;
              }
            }
          }
        }
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
        // Kiểm tra đầy đủ thuộc tính serviceCode để tìm mã dịch vụ
        const serviceCodeMatch =
          item.serviceCode && item.serviceCode === searchTermInt;
        // Kiểm tra đầy đủ thuộc tính staffCode để tìm mã nhân viên
        const staffCodeMatch =
          item.staffCode && item.staffCode === searchTermInt;

        // Kiểm tra xem item có thuộc tính type và có chứa searchTerm không
        const typeMatch =
          item.type &&
          item.type.toLowerCase().includes(this.searchTerm.toLowerCase());
        // Kiểm tra xem item có thuộc tính status và có chứa searchTerm không
        const statusMatch =
          item.status &&
          item.status.toLowerCase().includes(this.searchTerm.toLowerCase());
        // Kiểm tra xem item có thuộc tính nameCustomer và có chứa searchTerm không
        const nameCustomerMatch =
          item.nameCustomer &&
          item.nameCustomer
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        // Kiểm tra xem item có thuộc tính identityCard và có chứa searchTerm không
        const identityCardMatch =
          item.identityCard &&
          item.identityCard
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());

        // Trả về true nếu bất kỳ điều kiện nào đúng
        return (
          roomCodeMatch ||
          typeMatch ||
          statusMatch ||
          nameCustomerMatch ||
          identityCardMatch ||
          serviceCodeMatch ||
          staffCodeMatch
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
    showAddModal() {
      this.addModal = !this.addModal;
    },
    showEditModal() {
      this.editModal = !this.editModal;
    },
    showDeleteModal() {
      this.deleteModal = !this.deleteModal;
    },
    showViewModal() {
      this.viewModal = !this.viewModal;
    },
  },
  computed: {
    paginated() {
      const data = this.filteredData.length
        ? this.filteredData
        : this.tableData;
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
        : this.tableData;
      return Math.ceil(data.length / this.itemPerPage);
    },
    hasNextPage() {
      return this.currentPage < this.totalPage;
    },
    numberOfColumns() {
      const serviceChildren = [
        this.service1Child,
        this.service2Child,
        this.service3Child,
        this.service4Child,
        this.service5Child,
        this.service6Child,
        this.service7Child,
        this.service8Child,
      ];
      return serviceChildren.filter((child) => !!child).length;
    },
  },
};
</script>

<style scoped>
.button-confirm,
.button-cancel {
  width: 120px;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-confirm {
  background-color: #0a75ca;
  color: white;
  border-radius: 4px;
  margin-right: 8px;
}

.button-cancel {
  background-color: #ff0000;
  color: white;
  border-radius: 4px;
}

.modalContainer {
  width: 1000px;
}

.divSharedHeader {
  border: 0px solid transparent;
}

.divForm {
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 1px #ffffff;
  display: inline-flex;
  position: relative;
  width: 350px;
  font-size: 14px;
}

.divForm:focus-within {
  box-shadow: 0 0 0 1px #007aff;
}
</style>
