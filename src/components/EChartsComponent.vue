<template>
  <div>
    <h2>Biểu đồ dữ liệu lỗi</h2>
    <div id="stationChart" style="width: 100%; height: 400px;"></div>
    <div id="errorCodeChart" style="width: 100%; height: 400px;"></div>
    <div id="rootCauseChart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { io } from "socket.io-client";
import { inject } from "vue"

// biến config dc inject 'config' vào để làm url động thay đổi trong public/config.json:
const config = inject('config');
export default {
  data() {
    return {
      socket: null, // Đối tượng Socket.IO
    };
  },
  methods: {
    connectSocketIO() {
      // Tạo kết nối Socket.IO
      this.socket = io(config.API_BASE_URL, {
        timeout: 60000,
        // path: "/api/v1/chats/ws", // Đường dẫn Socket.IO
      });

      // Khi kết nối thành công
      this.socket.on("connect", () => {
        console.log("Socket.IO connected:", this.socket.id);
      });

      // Xử lý dữ liệu nhận được từ server
      this.socket.on("update_failure_records", (data) => {
        console.log("Received data:", data);

        // Vẽ biểu đồ dựa trên dữ liệu nhận được
        this.renderStationChart(data.station_count);
        this.renderErrorCodeChart(data.error_code_count);
        this.renderRootCauseChart(data.root_cause_count);
      });

      // Xử lý lỗi kết nối
      this.socket.on("connect_error", (error) => {
        console.error("Socket.IO connection error:", error);
      });

      // Khi kết nối bị ngắt
      this.socket.on("disconnect", () => {
        console.log("Socket.IO disconnected");
      });
    },
    renderStationChart(data) {
      console.log("Data for station chart:", data);
      const stationChart = echarts.init(document.getElementById("stationChart"));
      stationChart.setOption({
        title: {
          text: "Số lượng lỗi theo công đoạn",
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: Object.keys(data),
          axisLabel: {
            interval: 0, // Hiển thị tất cả các nhãn
            rotate: 45, // Xoay nhãn 45 độ
            formatter: (value) => value, // Định dạng nhãn
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Object.values(data),
            type: "bar",
          },
        ],
      });
    },
    renderErrorCodeChart(data) {
      const errorCodeChart = echarts.init(
        document.getElementById("errorCodeChart")
      );
      errorCodeChart.setOption({
        title: {
          text: "Tỉ lệ các loại lỗi",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            data: Object.entries(data).map(([key, value]) => ({
              name: key,
              value: value,
            })),
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {d}%",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
          },
        ],
      });
    },
    renderRootCauseChart(data) {
      const rootCauseChart = echarts.init(
        document.getElementById("rootCauseChart")
      );
      rootCauseChart.setOption({
        title: {
          text: "Tỉ lệ nguyên nhân lỗi",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            data: Object.entries(data).map(([key, value]) => ({
              name: key,
              value: value,
            })),
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {d}%",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    // Kết nối Socket.IO khi component được mount
    this.connectSocketIO();
  },
  beforeUnmount() {
    // Đóng kết nối Socket.IO khi component bị hủy
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>
