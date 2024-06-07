<template>
  <div class="statisticalManagement">
    <div class="container p-3 pb-14">
      <div class="flex flex-col">
        <span class="text-2xl font-bold mb-3">Thống kê</span>
        <div class="flex items-center justify-center flex-col mb-12">
          <LineChartGenerator
            v-if="loaded"
            :chart-options="lineChartOptions"
            :chart-data="lineChartData"
            :chart-id="lineChartId"
            :dataset-id-key="lineDatasetIdKey"
            :plugins="lineChartPlugins"
            :css-classes="lineChartCssClasses"
            :styles="lineChartStyles"
            :width="lineChartWidth"
            :height="lineChartHeight"
          />
          <span class="text-xl font-bold mt-3">
            Biểu đồ thống kê thu nhập từng tháng trong năm {{ year }}
          </span>
        </div>
        <div class="flex items-center justify-center flex-col mb-12">
          <Bar
            v-if="loaded"
            :chart-options="lineChartOptions1"
            :chart-data="barChartData"
            :chart-id="barChartId"
            :dataset-id-key="barDatasetIdKey"
            :plugins="barChartPlugins"
            :css-classes="barChartCssClasses"
            :styles="barChartStyles"
            :width="barChartWidth"
            :height="barChartHeight"
          />
          <span class="text-xl font-bold mt-3">
            Biểu đồ phòng được đặt nhiều nhất
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Line as LineChartGenerator, Bar } from "vue-chartjs/legacy";
import axiosInstance from "@/axiosInstance/defaultAPI.js";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  BarElement,
  CategoryScale,
  PointElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  BarElement,

  CategoryScale,
  PointElement,
  ArcElement
);

export default {
  name: "StatisticalManagement",
  components: {
    LineChartGenerator,
    Bar,
  },
  props: {
    // Props cho biểu đồ đường (Line Chart)
    lineChartId: {
      type: String,
      default: "line-chart",
    },
    lineDatasetIdKey: {
      type: String,
      default: "label",
    },
    lineChartWidth: {
      type: Number,
      default: null,
    },
    lineChartHeight: {
      type: Number,
      default: null,
    },
    lineChartCssClasses: {
      default: "relative w-full max-w-[700px] h-auto",
      type: String,
    },
    lineChartStyles: {
      type: Object,
      default: () => {},
    },
    lineChartPlugins: {
      type: Object,
      default: () => {},
    },
    // linechart phòng
    barChartId: {
      type: String,
      default: "line-chart",
    },
    barDatasetIdKey: {
      type: String,
      default: "label",
    },
    barChartWidth: {
      type: Number,
      default: null,
    },
    barChartHeight: {
      type: Number,
      default: null,
    },
    barChartCssClasses: {
      default: "relative w-full max-w-[700px] h-auto",
      type: String,
    },
    barChartStyles: {
      type: Object,
      default: () => {},
    },
    barChartPlugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      year: new Date().getFullYear(),
      loaded: false,
      // Dữ liệu và tùy chọn cho biểu đồ đường
      lineChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Thu nhập của tháng",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
      barChartData: {
        labels: [],
        datasets: [
          {
            label: "Phòng được đặt nhiều nhất",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      lineChartOptions1: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
  created() {
    Promise.all([
      axiosInstance.post("/statistical/GetAmountRecordsByMonth", {
        year: this.year,
      }),
      axiosInstance.post("/statistical/GetRoomRecordsByYear", {
        year: this.year,
      }),
    ])
      .then((responses) => {
        // responses là một mảng chứa kết quả của từng yêu cầu API
        const monthlyData = responses[0].data.map((item) => item.amount);

        // Cập nhật dữ liệu cho biểu đồ đường
        this.lineChartData.datasets[0].data = monthlyData;

        // Xử lý dữ liệu API để phù hợp với cấu trúc biểu đồ tròn
        const roomData = responses[1].data;
        const labels = roomData.map((item) => item.typeName);
        const data = roomData.map((item) => item.numberOfRecords);

        // Cập nhật dữ liệu cho biểu đồ tròn
        this.barChartData.labels = labels;
        this.barChartData.datasets[0].data = data;

        this.loaded = true;
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  },
};
</script>

<style scoped></style>
