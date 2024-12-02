import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, ButtonGroup } from "@mui/material"; // Thêm thư viện UI Material-UI cho nút
import { styled } from "@mui/system"; // Thư viện để tùy chỉnh styles

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Định nghĩa kiểu dữ liệu của từng item trong mảng trả về từ API
interface StatItem {
  totalRevenue: number;   // Tổng doanh thu
  totalCost: number;      // Tổng chi phí
  totalQuantity: number;  // Tổng số lượng
  totalProfit: number;    // Tổng lợi nhuận
}

// Định nghĩa kiểu cho dữ liệu của biểu đồ
interface ChartData {
  labels: string[]; // Mảng chứa tên các danh mục
  datasets: {
    label: string;
    data: number[];  // Mảng chứa dữ liệu tương ứng
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[]; 
}

// Tùy chỉnh cho nút
const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [], // Mảng chứa các danh mục
    datasets: [
      {
        label: "Thống kê", // Tên cho bộ dữ liệu trong biểu đồ
        data: [], // Mảng dữ liệu ban đầu
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu sắc cho các cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền cho các cột
        borderWidth: 1,
      },
    ],
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  // Hàm gọi API để lấy dữ liệu thống kê
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/statistics/${selectedPeriod}`);
      const data: StatItem[] = response.data;

      const labels = ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"];
      const values = [
        data[0].totalRevenue,
        data[0].totalCost,
        data[0].totalQuantity,
        data[0].totalProfit,
      ];

      // Cập nhật lại chartData với dữ liệu mới
      setChartData({
        labels,
        datasets: [
          {
            label: "Thống kê",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu thống kê", error);
    }
  };

  // Gọi hàm fetchData mỗi khi khoảng thời gian được thay đổi
  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Biểu đồ Thống kê
      </h2>

      {/* Các nút chọn khoảng thời gian */}
      <StyledButtonGroup variant="contained" aria-label="time period selection">
        <StyledButton onClick={() => setSelectedPeriod("today")}>Hôm nay</StyledButton>
        <StyledButton onClick={() => setSelectedPeriod("yesterday")}>Hôm qua</StyledButton>
        <StyledButton onClick={() => setSelectedPeriod("last-week")}>1 tuần trước</StyledButton>
        <StyledButton onClick={() => setSelectedPeriod("last-three-months")}>3 tháng trước</StyledButton>
      </StyledButtonGroup>

      {/* Biểu đồ Bar */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Thống kê theo khoảng thời gian",
                font: { size: 18 },
                padding: 20,
              },
              tooltip: {
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
//npm install @mui/material @mui/system
//npm install @emotion/react @emotion/styled

export default BarChart;
