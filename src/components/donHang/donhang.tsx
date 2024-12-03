import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonHang.css";

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

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, orderStatus: newStatus } : order
      )
    );

    axios
      .put(`http://localhost:28017/orders/${id}`, { orderStatus: newStatus })
      .then(() => {
        console.log("Cập nhật trạng thái thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "red";
      case "Đã xác nhận":
        return "orange";
      case "Chờ giao hàng":
        return "blue";
      case "Đã giao":
        return "green";
      default:
        return "black";
    }
  };

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
                <td>{order._id.slice(0, 10)}...</td>
                <td>{order.cusId.slice(0, 10)}...</td>
                <td>{order.revenue_all.toLocaleString()} VND</td>
                <td>
                  {order.prodDetails.map((prod, index) => (
                    <div key={index} className="product-details">
                      <p>
                        <strong>Mã SP:</strong> {prod.prodId}
                      </p>
                      <p>
                        <strong>Doanh thu:</strong> {prod.revenue.toLocaleString()} VND
                      </p>
                      <p>
                        <strong>Số lượng:</strong> {prod.quantity}
                      </p>
                      <p>
                        <strong>Thông số:</strong> {prod.prodSpecification}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{
                      color: getStatusColor(order.orderStatus),
                      fontWeight: "bold",
                    }}
                  >
                    <option value="Chờ xác nhận" style={{ color: "red" }}>
                      Chờ xác nhận
                    </option>
                    <option value="Đã xác nhận" style={{ color: "orange" }}>
                      Đã xác nhận
                    </option>
                    <option value="Chờ giao hàng" style={{ color: "blue" }}>
                      Chờ giao hàng
                    </option>
                    <option value="Đã giao" style={{ color: "green" }}>
                      Đã giao
                    </option>
                  </select>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString("vi-VN", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonHang;
