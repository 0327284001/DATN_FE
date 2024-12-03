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
import { Button, ButtonGroup } from "@mui/material";
import "./styleBarChart.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatItem {
  totalRevenue: number;
  totalCost: number;
  totalQuantity: number;
  totalProfit: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Thống kê",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

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

  useEffect(() => {
    fetchData();
  }, [selectedPeriod]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Biểu đồ Thống kê</h2>

      <ButtonGroup className="button-group" variant="contained" aria-label="time period selection">
        <Button className="custom-button" onClick={() => setSelectedPeriod("today")}>
          Hôm nay
        </Button>
        <Button className="custom-button" onClick={() => setSelectedPeriod("yesterday")}>
          Hôm qua
        </Button>
        <Button className="custom-button" onClick={() => setSelectedPeriod("last-week")}>
          1 tuần trước
        </Button>
        <Button className="custom-button" onClick={() => setSelectedPeriod("last-three-months")}>
          3 tháng trước
        </Button>
        <Button className="custom-button" onClick={() => setSelectedPeriod("this-year")}>
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
