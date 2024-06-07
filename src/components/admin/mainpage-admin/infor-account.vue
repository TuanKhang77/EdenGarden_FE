<template>
    <div class="staffAccountInfor">
        <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <!-- Avatar -->
            <!-- <div class="mb-4 flex justify-center">
                <img :src="currentAccount.avatar" alt="Avatar" class="w-20 h-20 rounded-full border-4 border-white">
            </div> -->
            <div class="flex justify-center mb-4">
                <div class="rounded-full overflow-hidden border-2 border-white w-40 h-40">
                    <img class="w-full h-full object-cover" :src="currentAccount.avatar" alt="Avatar">
                </div>
            </div>
            <!-- <div class="mb-4 flex justify-center rounded-full overflow-hidden border-2 border-white w-12 h-12">
                <img class="w-full h-full object-cover" :src="currentAccount.avatar" alt="Avatar">
            </div> -->

            <!-- Mã nhân viên -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Mã nhân viên:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.staffCode }}</p>
            </div>
            <!-- Tên tài khoản -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Tên tài khoản:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.accountName }}</p>
            </div>

            <!-- Tên nhân viên -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Tên nhân viên:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.staffName }}</p>
            </div>

            <!-- Số CCCD/CMND -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Số CCCD/CMND:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.identityCard }}</p>
            </div>

            <!-- Ngày/tháng/năm sinh -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Ngày/tháng/năm sinh:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.dateOfBirth }}</p>
            </div>

            <!-- Địa chỉ -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Địa chỉ:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.staffAddress }}</p>
            </div>

            <!-- Chức vụ -->
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">Chức vụ:</label>
                <p class="text-gray-900 text-lg">{{ currentAccount.staffPosition }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getCurrentAccount']),
        currentAccount() {
            return this.getCurrentAccount
        }
    }
}
</script>