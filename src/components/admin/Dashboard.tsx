import React, { useEffect, useState } from "react";
import { DeleteProduct, getAllProducts } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { Popconfirm, Pagination, Input } from "antd"; // Thêm Input từ Ant Design
import { useNavigate } from "react-router-dom";

const { Search } = Input; // Input tìm kiếm từ Ant Design

const Dashboard = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 7; // Số sản phẩm mỗi trang

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

  const delProduct = async (id: string, e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation(); // Ngừng sự kiện chuyển hướng khi xóa
    }
    try {
      await DeleteProduct(id);
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const updateProduct = (id: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/admin/dashboard/${id}`);
  };

  const viewProductDetail = (id: string) => {
    navigate(`/admin/dashboard/product/details/${id}`);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset trang về 1 sau khi tìm kiếm
  };

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = products.filter((product) =>
    product.namePro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 p-4">
      <div className="mb-4">
        <Search
          placeholder="Tìm kiếm sản phẩm"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch} // Gọi hàm tìm kiếm khi nhập
        />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Tên sản phẩm</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Giá</th>
              <th className="px-6 py-3">Ngày tạo</th>
              <th className="px-6 py-3">Số lượng</th>
              <th className="px-6 py-3">Danh mục</th>
              <th className="px-6 py-3">Hình ảnh</th>
              <th className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-white even:bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700"
                onClick={() => viewProductDetail(product._id)}
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.namePro}
                </td>
                <td className="px-6 py-4">
                  {product.statusPro ? "Còn hàng" : "Hết hàng"}
                </td>
                <td className="px-6 py-4">{product.price}VND</td>
                <td className="px-6 py-4">
                  {product.creatDatePro || "Chưa cập nhật"}
                </td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.listPro || "Chưa phân loại"}</td>
                <td className="px-6 py-4">
                  {product.imgPro ? (
                    Array.isArray(product.imgPro) && product.imgPro.length > 0 ? (
                      <img
                        src={product.imgPro[0]}
                        alt={`Product ${product.namePro}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <span>Không có hình ảnh</span>
                    )
                  ) : (
                    <span>Không có hình ảnh</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button
                      onClick={(e) => updateProduct(product._id, e)}
                      className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg px-4 py-2 me-2"
                    >
                      Edit
                    </button>
                    <Popconfirm
                      title="Xóa sản phẩm"
                      description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                      onConfirm={(e) => delProduct(product._id, e)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <button
                        onClick={(e) => e.stopPropagation()}
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
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length} // Tính tổng số sản phẩm sau khi lọc
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
