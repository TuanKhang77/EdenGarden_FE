import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from "@/axiosInstance/defaultAPI.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        accounts: [], // Mảng lưu trữ thông tin các tài khoản
    },
    mutations: {
        setLoggedInAccount(state, token) {
            state.token = token; // Lưu mã thông báo JWT vào trạng thái Vuex
            localStorage.setItem("token", token); // Lưu mã thông báo JWT vào bộ nhớ cục bộ
        },
        clearLoggedInAccount(state) {
            state.token = null; // Xóa mã thông báo JWT khi logout
            localStorage.removeItem("token"); // Xóa mã thông báo JWT từ bộ nhớ cục bộ
        },
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                const response = await axiosInstance.post("/admin/login", {
                    username,
                    password,
                });
                const token = response.data.token;
                commit("setLoggedInAccount", token);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        logout({ commit }) {
            // Thực hiện logout bằng cách xóa thông tin tài khoản đăng nhập khỏi Vuex
            commit("clearLoggedInAccount");
        },
    },
    getters: {
        getCurrentAccount: (state) => state.token, // Thay đổi từ loggedInAccount sang token
        getAccounts: (state) => state.accounts, // Getter để lấy danh sách các tài khoản
    },
});
