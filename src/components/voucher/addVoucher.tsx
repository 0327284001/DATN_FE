import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Nếu bạn cần sử dụng axios để gửi yêu cầu API

const AddVoucher: React.FC = () => {
  const [priceReduced, setPriceReduced] = useState<string>("");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [quantityVoucher, setQuantityVoucher] = useState<number | "">("");
  const [errors, setErrors] = useState({
    priceReduced: "",
    discountCode: "",
    quantityVoucher: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      priceReduced: "",
      discountCode: "",
      quantityVoucher: "",
    };

    if (!priceReduced) {
      newErrors.priceReduced = "Vui lòng nhập giảm giá!";
    } else if (parseFloat(priceReduced) <= 0) {
      newErrors.priceReduced = "Giảm giá phải lớn hơn 0!";
    }

    if (!discountCode) {
      newErrors.discountCode = "Vui lòng nhập mã giảm giá!";
    } else if (!/^[a-zA-Z0-9]+$/.test(discountCode)) {
      newErrors.discountCode = "Mã giảm giá chỉ được chứa ký tự chữ và số!";
    }

    if (!quantityVoucher) {
      newErrors.quantityVoucher = "Vui lòng nhập số lượng voucher!";
    } else if (quantityVoucher <= 0 || !Number.isInteger(quantityVoucher)) {
      newErrors.quantityVoucher = "Số lượng phải là số nguyên lớn hơn 0!";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newVoucher = {
      price_reduced: parseFloat(priceReduced),
      discount_code: discountCode,
      quantity_voucher: quantityVoucher,
    };

    // Gửi dữ liệu tới API (giả sử bạn đã cấu hình axios)
    try {
      await axios.post("http://localhost:28017/vouchers", newVoucher);
      alert("Thêm voucher thành công!");
      navigate("/voucher");
    } catch (error) {
      console.error("Lỗi khi thêm voucher:", error);
      alert("Đã xảy ra lỗi khi thêm voucher!");
    }

    // Reset form và điều hướng
    setPriceReduced("");
    setDiscountCode("");
    setQuantityVoucher("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thêm Voucher</h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {Object.values(errors).some((error) => error) && (
        <div style={styles.globalError}>
          Vui lòng kiểm tra lại các trường bên dưới!
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Giảm Giá */}
        <div style={styles.formGroup}>
          <input
            type="number"
            placeholder="Giảm Giá (VNĐ)"
            value={priceReduced}
            onChange={(e) => setPriceReduced(e.target.value)}
            style={styles.input}
          />
          {errors.priceReduced && <span style={styles.error}>{errors.priceReduced}</span>}
        </div>

        {/* Mã Giảm Giá */}
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Mã Giảm Giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            style={styles.input}
          />
          {errors.discountCode && <span style={styles.error}>{errors.discountCode}</span>}
        </div>

        {/* Số Lượng Voucher */}
        <div style={styles.formGroup}>
          <input
            type="number"
            placeholder="Số Lượng Voucher"
            value={quantityVoucher}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              setQuantityVoucher(value > 0 ? value : "");
            }}
            style={styles.input}
          />
          {errors.quantityVoucher && <span style={styles.error}>{errors.quantityVoucher}</span>}
        </div>

        <div style={styles.buttonsContainer}>
          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: "#28a745",
              marginRight: "10px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
          >
            Lưu Voucher
          </button>
          <button
            type="button"
            style={{
              ...styles.button,
              backgroundColor: "#dc3545",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
            onClick={() => navigate("/voucher")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center" as const,
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  error: {
    marginTop: "5px",
    color: "#dc3545",
    fontSize: "12px",
  },
  globalError: {
    padding: "10px",
    marginBottom: "10px",
    color: "#721c24",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "5px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AddVoucher;
