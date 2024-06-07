<template>
  <div class="body-admin">
    <div class="flex">
      <div class="w-1/5">
        <div class="flex flex-col w-full h-full">
          <div v-for="item in serviceEdenGarden" :key="item.nameService"
            class="flex px-3 py-3 justify-start cursor-pointer divHover" :class="{
            active: selectedComponent === componentsMapping[item.nameService],
          }" @click="selectItem(item)">
            {{ item.nameService }}
          </div>
        </div>
      </div>
      <div class="w-4/5">
        <div class="flex flex-col">
          <component :is="selectedComponent"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomManagement from "../detail-services/roomManagement.vue";
import BookingStatusManagement from "../detail-services/orderManagement.vue";
import BillManagement from "../detail-services/billManagement.vue";
import CustomerManagement from "../detail-services/customerManagement.vue";
import ServiceManagement from "../detail-services/serviceManagement.vue";

import StatisticalManagement from "../detail-services/statisticalManagement.vue";
import RoomTypeManagement from "../detail-services/roomTypeManagement.vue";
import BookingManagement from "../detail-services/bookingManagement.vue";

export default {
  data() {
    return {
      selectedItem: null,
      searchSVG: require("@/assets/svg-file/search.svg"),
      serviceEdenGarden: [
        { nameService: "Quản lý Phòng" },
        { nameService: "Quản lý Loại phòng" },
        { nameService: "Quản lý Đơn đặt phòng" },
        { nameService: "Quản lý Chi tiết phòng đặt" },
        { nameService: "Quản lý Hoá đơn" },
        { nameService: "Quản lý Khách hàng" },
        { nameService: "Quản lý Dịch vụ" },

        { nameService: "Quản lý Thống kê" },
      ],
      componentsMapping: {
        "Quản lý Phòng": RoomManagement,
        "Quản lý Loại phòng": RoomTypeManagement,
        "Quản lý Đơn đặt phòng": BookingManagement,
        "Quản lý Chi tiết phòng đặt": BookingStatusManagement,
        "Quản lý Hoá đơn": BillManagement,
        "Quản lý Khách hàng": CustomerManagement,
        "Quản lý Dịch vụ": ServiceManagement,

        "Quản lý Thống kê": StatisticalManagement,
      },
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
  },
  computed: {
    selectedComponent() {
      if (this.selectedItem) {
        const selectedService = this.selectedItem.nameService;
        return (
          this.componentsMapping[selectedService] || BookingStatusManagement
        );
      }
      return BookingManagement;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #f0f0f0;
}

.divHover div:hover {
  background-color: #f0f0f0;
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
