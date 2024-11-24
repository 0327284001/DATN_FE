import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icategory } from "../../interface/category";
import { Iproduct } from "../../interface/products";
import { getProductByID, updateProduct } from "../../service/products";
import { getAllCategories } from "../../service/category";

const Update = () => {
  const [categories, setCategories] = useState<Icategory[]>([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [form] = Form.useForm();

  // Lấy dữ liệu sản phẩm và danh mục
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product: Iproduct = await getProductByID(id as string); // Lấy chi tiết sản phẩm
        form.setFieldsValue({
          namePro: product.namePro,
          price: product.price,
          quantity: product.quantity,
          desPro: product.desPro,
          cateId: product.cateId,
          statusPro: product.statusPro ? "Còn hàng" : "Hết hàng",
          brand: product.brand,
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, form]);

  // Xử lý khi nhấn nút cập nhật
  const onFinish = async (values: any) => {
    try {
      const updatedProduct: Iproduct = {
        ...values,
        statusPro: values.statusPro === "Còn hàng",
      };
      await updateProduct(id as string, updatedProduct);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="namePro"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá sản phẩm ($)"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
        >
          <Input type="number" placeholder="Nhập giá sản phẩm" />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <Input type="number" placeholder="Nhập số lượng" />
        </Form.Item>

        <Form.Item
          name="desPro"
          label="Mô tả sản phẩm"
          rules={[{ required: false }]}
        >
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={4} />
        </Form.Item>

        <Form.Item
          name="cateId"
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="statusPro"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Còn hàng">Còn hàng</Select.Option>
            <Select.Option value="Hết hàng">Hết hàng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brand"
          label="Thương hiệu"
          rules={[{ required: false }]}
        >
          <Input placeholder="Nhập thương hiệu (nếu có)" />
        </Form.Item>

        <button
          type="submit"
          className="w-full px-4 py-2.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cập nhật sản phẩm
        </button>
      </Form>
    </div>
  );
};

export default Update;
