import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  _id: string;
  cusId: string;
  revenue_all: number;
  prodDetails: {
    prodId: string;
    revenue: number;
    quantity: number;
    prodSpecification: string;
  }[];
  content: string;
  orderStatus: string;
  orderDate: string;
}

const DonHang: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách đơn hàng
    axios.get('/api/orders') // Đường dẫn API cần sửa theo server của bạn
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Danh sách đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mã đơn hàng</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mã khách hàng</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tổng doanh thu</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chi tiết sản phẩm</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Trạng thái</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order._id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.cusId}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.revenue_all.toLocaleString()}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {order.prodDetails.map((prod, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                      <p>Mã SP: {prod.prodId}</p>
                      <p>Doanh thu: {prod.revenue.toLocaleString()}</p>
                      <p>Số lượng: {prod.quantity}</p>
                      <p>Thông số kỹ thuật: {prod.prodSpecification}</p>
                    </div>
                  ))}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.orderStatus}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonHang;
