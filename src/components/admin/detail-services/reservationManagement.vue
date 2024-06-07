<template>
    <BasePageServices
        :name-service-child="nameService"
        :service1-child="service1"
        :service2-child="service2"
        :service3-child="service3"
        :service7-child="service7"
        :search-form-child="searchForm"
        :operation-settings="operationSettings"
        :table-data="reservationData">
    </BasePageServices>
</template>

<script>
import BasePageServices from './basePageServices.vue'
export default {
    components: {
        BasePageServices
    },
    data() {
        return {
            nameService: "Danh sách trạng thái phòng",
            service1: "Số phòng",
            service2: "Loại phòng",
            service3: "Trạng thái",
            service7: "Thao tác",
            searchForm: "Số phòng, loại phòng, trạng thái",
            operationSettings: {
                showEdit: true,
                showAdd: false,
                showDelete: false,
                showReadme: true
            },
            reservationData: [
                { roomCode: 201, type: "Phòng Deluxe", status: "trạng thái phòng lấy theo thuật ngữ của khách sạn" },
                { roomCode: 202, type: "Phòng Deluxe", status: "trạng thái phòng lấy theo thuật ngữ của khách sạn" },
                { roomCode: 203, type: "Phòng Suite", status: "trạng thái phòng lấy theo thuật ngữ của khách sạn" },
                { roomCode: 204, type: "Phòng Đơn", status: "trạng thái phòng lấy theo thuật ngữ của khách sạn" },
            ]
        }
    }
}
</script>