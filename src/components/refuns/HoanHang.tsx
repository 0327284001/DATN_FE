import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Định nghĩa kiểu dữ liệu cho Refund và Order
interface Refund {
  _id: string;
  cusId: string;
  orderRefundDate: string;
  refundStatus: string;
  content: string;
}

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

const HoanHang: React.FC = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch dữ liệu hoàn hàng từ API
  useEffect(() => {
    axios
      .get("http://localhost:28017/refunds")
      .then((response) => {
        setRefunds(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Hàm để lấy chi tiết đơn hàng từ API
  const handleViewDetails = (refundId: string) => {
    axios
      .get(`http://localhost:28017/orders/${refundId}`)
      .then((response) => {
        setOrderDetails(response.data); // Lưu thông tin đơn hàng vào state
        setIsModalOpen(true); // Mở modal
      })
      .catch((error) => console.error(error));
  };

  // Hàm xử lý thay đổi trạng thái của hoàn hàng
  const handleStatusChange = (id: string, newStatus: string) => {
    const refund = refunds.find((refund) => refund._id === id);
    const customerName = refund?.cusId || "Khách hàng";

    setRefunds((prevRefunds) =>
      prevRefunds.map((refund) =>
        refund._id === id ? { ...refund, refundStatus: newStatus } : refund
      )
    );

    axios
      .put(`http://localhost:28017/refunds/${id}`, { refundStatus: newStatus })
      .then((response) => {
        alert(`Trạng thái hoàn hàng của ${customerName} đã được cập nhật.`);
      })
      .catch((error) => console.error(error));
  };

  // Hàm lấy màu sắc trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "#f7b731";
      case "Hủy hoàn hàng":
        return "#e74c3c";
      case "Đã xác nhận":
        return "#2ecc71";
      case "Đã nhận hàng hoàn":
        return "#3498db";
      default:
        return "#dcdcdc";
    }
  };

  const tabOptions = ["Tất cả", "Chờ xác nhận", "Hủy hoàn hàng", "Đã xác nhận", "Đã nhận hàng hoàn"];

  return (
    <Container>
      <Header>
        <Title>Danh sách hoàn hàng</Title>
      </Header>

      {/* Tabs Trạng thái */}
      <TabContainer>
        {tabOptions.map((tab) => (
          <TabButton
            key={tab}
            isActive={currentTab === tab}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabContainer>

      {/* Search Input */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Tìm theo mã khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {/* Refunds Table */}
      {refunds.length === 0 ? (
        <NoRefunds>Không có hoàn hàng nào.</NoRefunds>
      ) : (
        <RefundTable>
          <thead>
            <tr>
              <TableHeader>Mã khách hàng</TableHeader>
              <TableHeader>Ngày hoàn hàng</TableHeader>
              <TableHeader>Trạng thái</TableHeader>
              <TableHeader>Chi tiết</TableHeader>
              <TableHeader>Thao tác</TableHeader>
            </tr>
          </thead>
          <tbody>
            {refunds
              .filter((refund) =>
                refund.cusId.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter((refund) => {
                if (currentTab === "Tất cả") return true;
                return refund.refundStatus === currentTab;
              })
              .map((refund) => (
                <tr key={refund._id}>
                  <TableData>{refund.cusId}</TableData>
                  <TableData>{new Date(refund.orderRefundDate).toLocaleDateString()}</TableData>
                  <TableData>
                    <StatusContainer>
                      <StatusButton
                        color={getStatusColor(refund.refundStatus)}
                        onClick={() =>
                          setOpenDropdown(openDropdown === refund._id ? null : refund._id)
                        }
                      >
                        {refund.refundStatus}
                      </StatusButton>

                      {openDropdown === refund._id && (
                        <Dropdown>
                          {["Chờ xác nhận", "Hủy hoàn hàng", "Đã xác nhận", "Đã nhận hàng hoàn"].map((status) => (
                            <DropdownItem
                              key={status}
                              onClick={() => {
                                handleStatusChange(refund._id, status);
                                setOpenDropdown(null);
                              }}
                            >
                              {status}
                            </DropdownItem>
                          ))}
                        </Dropdown>
                      )}
                    </StatusContainer>
                  </TableData>
                  <TableData>{refund.content}</TableData>
                  <TableData>
                    <ActionButton onClick={() => handleViewDetails(refund._id)}>
                      Xem chi tiết
                    </ActionButton>
                  </TableData>
                </tr>
              ))}
          </tbody>
        </RefundTable>
      )}

      {isModalOpen && orderDetails && (
        <Modal>
          <ModalContent>
            <ModalTitle>Chi tiết đơn hàng</ModalTitle>
            {/* Chỉnh sửa hiển thị thông tin chi tiết đơn hàng */}
            <ModalText><strong>Mã đơn hàng:</strong> {orderDetails._id}</ModalText>
            <ModalText><strong>Ngày đặt hàng:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</ModalText>
            <ModalText><strong>Số tiền:</strong> {orderDetails.revenue_all} VNĐ</ModalText>
            <ModalText>
              <strong>Sản phẩm:</strong> {orderDetails.prodDetails.map((prod) => prod.prodId.namePro).join(", ")}
            </ModalText>
            <CloseButton onClick={() => setIsModalOpen(false)}>Đóng</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

// Các styled components
const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
`;

const TabContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.isActive ? "white" : "#007bff")};
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#ddd")};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
`;

const RefundTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid #ccc;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ccc;
`;

const StatusContainer = styled.div`
  position: relative;
`;

const StatusButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap; /* Ngăn cách chữ sang dòng mới */
  width: auto;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10;
  width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ActionButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 30px;  /* Chiều ngang dài hơn */
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;  /* Giảm cỡ chữ */
  white-space: nowrap; /* Ngăn cắt chữ xuống dòng */
  text-align: center;  /* Đảm bảo chữ căn giữa */
  width: auto;
  height: 40px;  /* Chiều dọc ngắn lại */
  
  &:hover {
    background-color: #218838;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  margin-top: 15px;
`;

const NoRefunds = styled.p`
  text-align: center;
  font-size: 18px;
  color: #999;
`;

export default HoanHang;
