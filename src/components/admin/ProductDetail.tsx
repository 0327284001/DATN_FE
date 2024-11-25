import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosservice } from '../../config/API';


const ProductDetails = () => {
  const { id } = useParams(); // Lấy id từ URL params
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      const { data } = await axiosservice.get(`/product/details/${id}`);
      console.log(data); // Log toàn bộ dữ liệu trả về
      if (data && data.product) {
        setProduct(data.product);
      } else {
        setError('Sản phẩm không tồn tại');
      }
    } catch (error) {
      console.log('Error:', error); // Log lỗi chi tiết
      setError('Không tìm thấy sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  fetchProductDetails();
}, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {product && (
        <>
          <h1>{product.namePro}</h1>
          <p>{product.desPro}</p>
          <p>Giá: {product.price}</p>
          <p>Số lượng: {product.quantity}</p>
          <p>Trạng thái: {product.statusPro ? 'Còn hàng' : 'Hết hàng'}</p>
          <p>Thương hiệu: {product.brand}</p>
          <p>Ngày tạo: {new Date(product.creatDatePro).toLocaleDateString()}</p>
          <img src={product.imgPro[0]} alt={product.namePro} />
          <button onClick={() => window.history.back()}>Quay lại</button> {/* Nút quay lại */}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
