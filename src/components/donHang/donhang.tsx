import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonHang.css";

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
    axios
      .get("http://localhost:28017/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      });
  }, []);

  return (
    <div className="don-hang-container">
      <h1 className="title">Danh sách đơn hàng</h1>
      {orders.length === 0 ? (
        <p className="no-orders">Không có đơn hàng nào.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Mã khách hàng</th>
              <th>Tổng doanh thu</th>
              <th>Chi tiết sản phẩm</th>
              <th>Trạng thái</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order._id.slice(0, 10)}...</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.cusId.slice(0, 10)}...</td>
                <td>{order.revenue_all.toLocaleString()} VND</td>
                <td>
                  {order.prodDetails.map((prod, index) => (
                    <div key={index} className="product-details">
                      <p><strong>Mã SP:</strong> {prod.prodId}</p>
                      <p><strong>Doanh thu:</strong> {prod.revenue.toLocaleString()} VND</p>
                      <p><strong>Số lượng:</strong> {prod.quantity}</p>
                      <p><strong>Thông số:</strong> {prod.prodSpecification}</p>
                    </div>
                  ))}
                </td>
                <td className="status-column">
                  <div className="status-spinner">
                    <div className={`spinner ${order.orderStatus === 'Chờ xác nhận' ? 'pending' :
                      order.orderStatus === 'Đã xác nhận' ? 'confirmed' :
                        order.orderStatus === 'Chờ giao hàng' ? 'shipping' : 'delivered'}`}>
                      <div className="spinner-icon"></div>
                    </div>
                    <p>{order.orderStatus}</p>
                  </div>
                </td>

                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonHang;
