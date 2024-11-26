import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  backgroundColor?: string;
  borderColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({ backgroundColor = '#4CAF50', borderColor = '#388E3C' }) => {
  const [filter, setFilter] = useState<string>('month'); // Thời gian mặc định là 'month'

  // Dữ liệu cứng
  const dataByDay = [1200, 1300, 1100, 1500, 1600, 1400, 1800]; // Doanh thu cho từng ngày
  const dataByWeek = [7000, 7500, 8000, 7200]; // Doanh thu cho từng tuần
  const dataByMonth = [32000, 34000, 30000, 35000, 33000]; // Doanh thu cho từng tháng
  const dataByYear = [400000, 420000, 430000]; // Doanh thu cho từng năm

  // Nhãn tương ứng với từng dữ liệu
  const labelsByDay = ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4', 'Ngày 5', 'Ngày 6', 'Ngày 7'];
  const labelsByWeek = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
  const labelsByMonth = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'];
  const labelsByYear = ['Năm 2022', 'Năm 2023', 'Năm 2024'];

  // Lựa chọn dữ liệu và nhãn dựa trên filter
  let data: number[] = [];
  let labels: string[] = [];

  switch (filter) {
    case 'day':
      data = dataByDay;
      labels = labelsByDay;
      break;
    case 'week':
      data = dataByWeek;
      labels = labelsByWeek;
      break;
    case 'month':
      data = dataByMonth;
      labels = labelsByMonth;
      break;
    case 'year':
      data = dataByYear;
      labels = labelsByYear;
      break;
    default:
      data = dataByMonth;
      labels = labelsByMonth;
      break;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Doanh thu',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Doanh thu',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: filter === 'day' ? 'Ngày' : filter === 'week' ? 'Tuần' : filter === 'month' ? 'Tháng' : 'Năm',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
        beginAtZero: true,
      },
    },
  };

  // Hàm thay đổi phạm vi lọc
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // Dữ liệu cho top sản phẩm bán chạy nhất
  const topProducts = [
    { name: 'Sản phẩm GunDam', quantitySold: 500 },
    { name: 'Sản phẩm POPMART', quantitySold: 450 },
    { name: 'Sản phẩm Lego', quantitySold: 400 },
    { name: 'Sản phẩm OTHER PRODUCTS', quantitySold: 350 },
    { name: 'Sản phẩm FINDING UNICORN', quantitySold: 300 },
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Phần lọc dữ liệu */}
      <div className="mb-4 flex justify-between">
        <button
          className={`px-4 py-2 rounded ${filter === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleFilterChange('day')}
        >
          Ngày
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleFilterChange('week')}
        >
          Tuần
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleFilterChange('month')}
        >
          Tháng
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleFilterChange('year')}
        >
          Năm
        </button>
      </div>

      {/* Biểu đồ doanh thu */}
      <Bar data={chartData} options={options} />

      {/* Top sản phẩm bán chạy nhất */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top Sản Phẩm Bán Chạy Nhất</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Tên sản phẩm</th>
              <th className="border p-2 text-left">Số lượng bán</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.quantitySold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarChart;
