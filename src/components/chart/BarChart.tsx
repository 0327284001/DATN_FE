// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({ labels, data, backgroundColor = '#1d4ed8', borderColor = '#1e3a8a' }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Data',
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
        text: 'Sample Bar Chart',
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
