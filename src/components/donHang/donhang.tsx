import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonHang.css";

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  _id: string;
  cusId: string;
  revenue_all: number;
  name_order: string;
  phone_order: string;
  address_order: string;
  payment_method: string;
  prodDetails: {
    prodId: {
      _id: string;
      namePro: string;
    };
    revenue: number;
    quantity: number;
    prodSpecification: string;
  }[];
  content: string;
  orderStatus: string;
  orderDate: string;
  __v: number;
}


const DonHang: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Tất cả");
  useEffect(() => {
    axios
      .get("http://localhost:28017/orders")
      .then((response) => {
        console.log(response.data);
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
  const tabs = ["Tất cả", "Chờ xác nhận", "Đã xác nhận", "Chờ giao hàng", "Đã giao", "Đã hủy"];
  const filteredOrders =
    currentTab === "Tất cả"
      ? orders.filter((order) => order.orderStatus !== "Đã hủy")
      : orders.filter((order) => order.orderStatus === currentTab);


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
  const handleNameClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };
  return (
    <div className="don-hang-container">
      <h1 className="title">Danh sách đơn hàng</h1>
      {/* Tab Buttons */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${currentTab === tab ? "active" : ""}`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {filteredOrders.length === 0 ? (
        <p className="no-orders">Không có đơn hàng nào.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Tổng doanh thu</th>
              <th>Chi tiết sản phẩm</th>
              <th>Trạng thái</th>
              <th>Ngày đặt hàng</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 10)}...</td>
                <td>
                  <button
                    onClick={() => handleNameClick(order)}
                    className="name-button"
                  >
                    {order.name_order}
                  </button>
                </td>
                <td>{order.revenue_all.toLocaleString()} VND</td>
                <td>
                  {order.prodDetails.map((prod, index) => (
                    <div key={index} className="product-details">
                      <p>
                        <strong>Tên SP:</strong> {prod.prodId?.namePro || "Tên sản phẩm không có"}
                      </p>
                      <p>
                        <strong>Giá bán 1 sản phẩm:</strong> {prod.revenue.toLocaleString()} VND
                      </p>
                      <p>
                        <strong>Số lượng:</strong> {prod.quantity}
                      </p>
                      <p>
                        <strong>Phân loại:</strong> {prod.prodSpecification}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {currentTab === "Đã hủy" ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>Đã hủy</span>
                  ) : (
                    <select
                      value={order.orderStatus} // Đảm bảo giá trị này luôn đồng bộ với trạng thái đơn hàng
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
                      {/* <option value="Đã hủy" style={{ color: "gray" }}>
                        Đã hủy
                      </option> */}
                    </select>

                  )}
                </td>

                <td>{new Date(order.orderDate).toLocaleDateString("vi-VN", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>

      )}

      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Thông tin chi tiết đơn hàng</h2>
            <p>
              <strong>Tên khách hàng:</strong> {selectedOrder.name_order}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedOrder.phone_order}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder.address_order}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {selectedOrder.payment_method}
            </p>
            <p>
              <strong>Tổng doanh thu:</strong>{" "}
              {selectedOrder.revenue_all.toLocaleString()} VND
            </p>
            <p>
              <strong>Chi tiết sản phẩm:</strong>
            </p>
            {selectedOrder.prodDetails.map((prod, index) => (
              <div key={index}>
                <p>
                  <strong>Tên SP:</strong>{" "}
                  {prod.prodId?.namePro || "Tên sản phẩm không có"}
                </p>
                <p>
                  <strong>Số lượng:</strong> {prod.quantity}
                </p>
                <p>
                  <strong>Phân loại:</strong> {prod.prodSpecification}
                </p>
              </div>
            ))}
            <button onClick={closeModal}>Đóng</button>
          </div>
        </div>
      )}

    </div>

  );
};

export default DonHang;
