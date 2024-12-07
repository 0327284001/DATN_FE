import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu của thống kê
interface StatData {
  namePro: string;
  quantity: number;
  profit: number;
  creatDatePro: string;
}

const BarChartComponent: React.FC = () => {
  const [data, setData] = useState<StatData[]>([]);  // Đảm bảo kiểu dữ liệu là StatData[]
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Hàm để lấy thống kê từ API
  const fetchStatistics = async () => {
    try {
      const response = await axios.get('/statistics/date', {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });
      setData(response.data);  // Gán dữ liệu vào state
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thống kê:', error);
    }
  };

  // Hàm để xử lý thay đổi ngày bắt đầu
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  // Hàm để xử lý thay đổi ngày kết thúc
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // Hàm để nạp dữ liệu khi thay đổi startDate hoặc endDate
  useEffect(() => {
    if (startDate && endDate) {
      fetchStatistics();
    }
  }, [startDate, endDate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thống kê sản phẩm</h2>

      {/* Input chọn ngày */}
      <div style={styles.dateContainer}>
        <label style={styles.label}>
          Ngày bắt đầu:
          <input 
            type="date" 
            value={startDate} 
            onChange={handleStartDateChange} 
            style={styles.dateInput} 
          />
        </label>
        <label style={styles.label}>
          Ngày kết thúc:
          <input 
            type="date" 
            value={endDate} 
            onChange={handleEndDateChange} 
            style={styles.dateInput} 
          />
        </label>
      </div>

      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="namePro" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
          <Bar dataKey="profit" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Style object cho giao diện
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center' as 'center', // Đảm bảo kiểu textAlign đúng
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
    marginRight: '10px',
  },
  dateInput: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '45%',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  dateInputFocus: {
    border: '1px solid #888',
  },
};


export default BarChartComponent;
