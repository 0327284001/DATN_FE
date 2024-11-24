import React, { useEffect, useState } from "react";
import { DeleteProduct, getAllProducts } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchData();
  }, []);

  const delProduct = async (id: string) => {
    try {
      await DeleteProduct(id);
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const updateProduct = (id: string) => {
    navigate(`/update/${id}`);
  };

  const viewProductDetail = (id: string) => {
    navigate(`/product/details/${id}`);
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
                onClick={() => viewProductDetail(product._id)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.namePro}
                </td>
                <td className="px-6 py-4">
                  {product.owerId ? product.owerId.toString() : "Không có chủ sở hữu"}
                </td>
                <td className="px-6 py-4">
                  {product.statusPro ? "Còn hàng" : "Hết hàng"}
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <p className="line-clamp-3">{product.desPro || "Không có mô tả"}</p>
                </td>
                <td className="px-6 py-4">
                  {product.creatDatePro || "Chưa cập nhật"}
                </td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.listPro || "Chưa phân loại"}</td>
                <td className="px-6 py-4">
                  {/* Xử lý hiển thị hình ảnh */}
                  {product.imgPro ? (
                    Array.isArray(product.imgPro) && product.imgPro.length > 0 ? (
                      <img
                        src={product.imgPro[0]}
                        alt={`Product ${product.namePro}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      typeof product.imgPro === "string" && product.imgPro.trim() !== "" ? (
                        <img
                          src={product.imgPro}
                          alt={`Product ${product.namePro}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <span>Không có hình ảnh</span>
                      )
                    )
                  ) : (
                    <span>Không có hình ảnh</span>
                  )}
                </td>
                <td className="px-6 py-4">{product.brand || "Không có thương hiệu"}</td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Ngừng sự kiện "onClick" lan tỏa
                        updateProduct(product._id);
                      }}
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
                      <button
                        onClick={(e) => e.stopPropagation()}  // Ngừng sự kiện "onClick" lan tỏa khi nhấn nút Delete
                        className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg px-4 py-2"
                      >
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
