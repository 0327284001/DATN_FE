import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button, ButtonGroup } from "@mui/material";
import "./styleBarChart.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  // Dữ liệu cứng theo từng khoảng thời gian
  const staticData: Record<string, { labels: string[]; values: number[] }> = {
    today: {
      labels: ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"],
      values: [1000, 300, 50, 700],
    },
    yesterday: {
      labels: ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"],
      values: [900, 350, 45, 550],
    },
    "last-week": {
      labels: ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"],
      values: [6000, 2000, 320, 4000],
    },
    "last-three-months": {
      labels: ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"],
      values: [18000, 8000, 1200, 10000],
    },
    "this-year": {
      labels: ["Doanh thu", "Chi phí", "Số lượng", "Lợi nhuận"],
      values: [72000, 30000, 4800, 42000],
    },
  };

  const chartData = {
    labels: staticData[selectedPeriod].labels,
    datasets: [
      {
        label: "Thống kê",
        data: staticData[selectedPeriod].values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Màu đỏ
          "rgba(54, 162, 235, 0.6)", // Màu xanh dương
          "rgba(255, 206, 86, 0.6)", // Màu vàng
          "rgba(75, 192, 192, 0.6)", // Màu xanh lá
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        hoverBorderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Biểu đồ Thống kê</h2>

      <ButtonGroup className="button-group" variant="contained" aria-label="time period selection">
        <Button
          className={`custom-button ${selectedPeriod === "today" ? "active" : ""}`}
          onClick={() => setSelectedPeriod("today")}
        >
          Hôm nay
        </Button>
        <Button
          className={`custom-button ${selectedPeriod === "yesterday" ? "active" : ""}`}
          onClick={() => setSelectedPeriod("yesterday")}
        >
          Hôm qua
        </Button>
        <Button
          className={`custom-button ${selectedPeriod === "last-week" ? "active" : ""}`}
          onClick={() => setSelectedPeriod("last-week")}
        >
          1 tuần trước
        </Button>
        <Button
          className={`custom-button ${selectedPeriod === "last-three-months" ? "active" : ""}`}
          onClick={() => setSelectedPeriod("last-three-months")}
        >
          3 tháng trước
        </Button>
        <Button
          className={`custom-button ${selectedPeriod === "this-year" ? "active" : ""}`}
          onClick={() => setSelectedPeriod("this-year")}
        >
          1 năm nay
        </Button>
      </ButtonGroup>

      <div className="chart-wrapper">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Thống kê (${selectedPeriod})`,
                font: { size: 18 },
                padding: 20,
              },
              tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#aaa",
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 14, weight: "bold" } },
              },
              y: {
                beginAtZero: true,
                ticks: { font: { size: 14, weight: "bold" } },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
