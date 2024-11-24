import React, { useEffect, useState } from "react";
import { DeleteProduct, getAllproducts } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const navigate = useNavigate();

  // Fetch dữ liệu sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllproducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchData();
  }, []);

  // Xóa sản phẩm
  const delProduct = async (id: string) => {
    try {
      await DeleteProduct(id);
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // Chuyển đến trang cập nhật sản phẩm
  const updateProduct = (id: string) => {
    navigate(`update/${id}`);
  };

  // Hàm toggle mô tả chi tiết
  const [expandedDescription, setExpandedDescription] = useState<string | null>(null);

  const toggleDescription = (id: string) => {
    setExpandedDescription(expandedDescription === id ? null : id);
  };

  return (
    <div className="flex-1 p-4">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Tên sản phẩm</th>
              <th className="px-6 py-3">Chủ sở hữu</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Giá</th>
              <th className="px-6 py-3">Mô tả</th>
              <th className="px-6 py-3">Ngày tạo</th>
              <th className="px-6 py-3">Số lượng</th>
              <th className="px-6 py-3">Danh mục</th>
              <th className="px-6 py-3">Hình ảnh</th>
              <th className="px-6 py-3">Thương hiệu</th>
              <th className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-white even:bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.namePro}
                </td>
                <td className="px-6 py-4">
                  {/* Kiểm tra owerId có tồn tại trước khi gọi toString */}
                  {product.ownerId ? product.ownerId.toString() : "Không có chủ sở hữu"}
                </td>
                <td className="px-6 py-4">
                  {product.statusPro ? "Còn hàng" : "Hết hàng"}
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  {/* Hiển thị mô tả ngắn gọn và có thể mở rộng */}
                  {product.desPro && product.desPro.length > 100 ? (
                    <>
                      {expandedDescription === product._id
                        ? product.desPro
                        : `${product.desPro.slice(0, 100)}...`}
                      <button
                        onClick={() => toggleDescription(product._id)}
                        className="text-blue-600 ml-2 underline"
                      >
                        {expandedDescription === product._id ? "Thu gọn" : "Xem thêm"}
                      </button>
                    </>
                  ) : (
                    product.desPro || "Không có mô tả"
                  )}
                </td>
                <td className="px-6 py-4">
                  {product.creatDatePro || "Chưa cập nhật"}
                </td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.listPro || "Chưa phân loại"}</td>
                <td className="px-6 py-4">
                  {product.imgPro && product.imgPro.length ? (
                    product.imgPro.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Product ${product.namePro}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    "Không có hình ảnh"
                  )}
                </td>

                <td className="px-6 py-4">{product.brand || "Không có thương hiệu"}</td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button
                      onClick={() => updateProduct(product._id)}
                      className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg px-4 py-2 me-2"
                    >
                      Edit
                    </button>
                    <Popconfirm
                      title="Xóa sản phẩm"
                      description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                      onConfirm={() => delProduct(product._id)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <button className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg px-4 py-2">
                        Delete
                      </button>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
