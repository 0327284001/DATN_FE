import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVoucher: React.FC = () => {
  const [priceReduced, setPriceReduced] = useState<string>("");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [quantityVoucher, setQuantityVoucher] = useState<number | "">("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!priceReduced || !discountCode || !quantityVoucher) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newVoucher = {
      price_reduced: parseFloat(priceReduced),
      discount_code: discountCode,
      quantity_voucher: quantityVoucher,
    };

    console.log("Voucher Data:", newVoucher);

    // Reset form và quay lại màn hình chính
    setPriceReduced("");
    setDiscountCode("");
    setQuantityVoucher("");
    alert("Thêm voucher thành công!");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thêm Voucher</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <input
            type="number"
            placeholder="Giảm Giá (VNĐ)"
            value={priceReduced}
            onChange={(e) => setPriceReduced(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Mã Giảm Giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="number"
            placeholder="Số Lượng Voucher"
            value={quantityVoucher}
            onChange={(e) => setQuantityVoucher(e.target.valueAsNumber || "")}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Lưu Voucher
        </button>
        <button
          type="button"
          style={{ ...styles.button, backgroundColor: "#dc3545" }}
          onClick={() => navigate("/")}
        >
          Hủy
        </button>
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
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default AddVoucher;
