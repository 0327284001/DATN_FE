import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


interface Voucher {
  _id: string;
  price_reduced: number;
  discount_code: string;
  quantity_voucher: number;
}


const VoucherManager: React.FC = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [hoveredEdit, setHoveredEdit] = useState(false);
  const [hoveredDelete, setHoveredDelete] = useState(false);
  const navigate = useNavigate();

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:28017/vouchers");
        console.log("Dữ liệu nhận từ API:", response.data);
        setVouchers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
      }
    };
    fetchVouchers();
  }, []);

  // Xử lý xóa voucher
  // const handleDelete = async (discount_code: string) => {
  //   try {
  //     await axios.delete(`http://localhost:28017/vouchers/${discount_code}`);
  //     setVouchers(vouchers.filter((voucher) => voucher.discount_code !== discount_code));
  //   } catch (error) {
  //     console.error("Lỗi khi xóa voucher:", error);
  //   }
  // };

  const handleDelete = async (_id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa voucher này?");
    if (!confirmDelete) return; // Nếu người dùng hủy, thoát khỏi hàm
  
    try {
      await axios.delete(`http://localhost:28017/vouchers/${_id}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== _id)); // Cập nhật danh sách
      alert("Voucher đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa voucher:", error);
      alert("Đã xảy ra lỗi khi xóa voucher.");
    }
  };
  
  

  // Xử lý sửa voucher
  const handleEdit = (id: string) => {
    navigate(`/editvoucher/${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <NavLink to="/admin/addVoucher">
          <button className="text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg text-base px-4 py-2 shadow-lg transition duration-300 ease-in-out">
            Thêm Voucher
          </button>
        </NavLink>


      </div>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>Danh Sách Voucher</h2>
        <ul style={styles.list}>
          {vouchers.length === 0 ? (
            <p style={styles.noData}>Chưa có voucher nào</p>
          ) : (
            vouchers.map((voucher) => (
              <li key={voucher._id} style={styles.listItem}>
                <div><strong>Mã Giảm Giá:</strong> {voucher.discount_code}</div>
                <div><strong>Giảm Giá:</strong> {voucher.price_reduced} VNĐ</div>
                <div><strong>Thể Loại Giảm:</strong> {voucher.quantity_voucher}</div>

                {/* Các nút Sửa và Xóa */}
                <div style={styles.actionButtons}>
                  <button
                    style={hoveredEdit ? { ...styles.editButton, ...styles.editButtonHover } : styles.editButton}
                    onClick={() => handleEdit(voucher.discount_code)}
                    onMouseEnter={() => setHoveredEdit(true)}
                    onMouseLeave={() => setHoveredEdit(false)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(voucher._id)} // Sử dụng _id thay vì discount_code
                  >
                    Delete
                  </button>


                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "1000px",
    margin: "30px auto",
    padding: "10px",
  },
  navbar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "20px",
  },
  addButton: {
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  innerContainer: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: "20px",
    fontSize: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease", // Thêm hiệu ứng chuyển màu nền khi hover
  },
  editButtonHover: {
    backgroundColor: "#218838", // Màu khi hover
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease", // Thêm hiệu ứng chuyển màu nền khi hover
  },
  deleteButtonHover: {
    backgroundColor: "#c82333", // Màu khi hover
  },
  noData: {
    textAlign: "center" as const,
    color: "#888",
    fontSize: "16px",
  },
};


export default VoucherManager;
