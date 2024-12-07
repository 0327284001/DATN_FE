import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditVoucher: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState({
    price_reduced: 0,
    discount_code: "",
    quantity_voucher: 0,
  });

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vouchers/${id}`);
        setVoucher(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin voucher:", error);
      }
    };
    fetchVoucher();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/vouchers/${id}`, voucher);
      alert("Cập nhật voucher thành công");
      navigate("/vouchermanager");
    } catch (error) {
      console.error("Lỗi khi cập nhật voucher:", error);
    }
  };

  return (
    <div>
      <h2>Chỉnh sửa Voucher</h2>
      <input
        type="text"
        placeholder="Mã giảm giá"
        value={voucher.discount_code}
        onChange={(e) => setVoucher({ ...voucher, discount_code: e.target.value })}
      />
      <input
        type="number"
        placeholder="Giảm giá"
        value={voucher.price_reduced}
        onChange={(e) => setVoucher({ ...voucher, price_reduced: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={voucher.quantity_voucher}
        onChange={(e) => setVoucher({ ...voucher, quantity_voucher: Number(e.target.value) })}
      />
      <button onClick={handleUpdate}>Lưu</button>
      <button onClick={() => navigate("/vouchermanager")}>Hủy</button>
    </div>
  );
};

export default EditVoucher;
