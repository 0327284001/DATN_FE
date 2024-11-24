import { Form, Input, Button, message, Select, Upload, Row, Col, Card, Switch } from "antd";
import { useState, useEffect } from "react";
import { addProduct } from "../../service/products";  // Service để thêm sản phẩm
import { upload } from "../../service/upload";        // Service upload hình ảnh
import { getAllCategories } from "../../service/category";  // Service lấy danh mục sản phẩm
import { Icategory } from "../../interface/category";  // Interface cho danh mục

const AddProduct = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<Icategory[]>([]);  // Danh sách các danh mục
  const [imageFiles, setImageFiles] = useState<any[]>([]);        // Lưu các tệp hình ảnh
  const [ownerId, setOwnerId] = useState<string>(""); // Trường ownerId, có thể lấy từ session hoặc user context

  // Hàm thông báo thành công
  const info = () => {
    messageApi.open({
      type: "success",
      content: "Sản phẩm đã được thêm thành công!",
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();  // Lấy danh mục từ server
        setCategories(data);
      } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // Hàm upload hình ảnh lên server
  const uploadImages = async (files: any) => {
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("images", file);  // Thêm từng tệp hình vào FormData
    });
    try {
      const res = await upload(formData);  // Gửi yêu cầu upload
      return res.payload.map((item: any) => item.url);  // Lấy danh sách URL của các hình ảnh
    } catch (error) {
      console.log("Lỗi khi upload hình ảnh:", error);
      return [];  // Nếu có lỗi, trả về mảng rỗng
    }
  };

  // Hàm khi submit form
  const onFinish = async (values: any) => {
    const { namePro, price, quantity, desPro, cateId, brand, statusPro, listPro, creatDatePro } = values;

    // Upload hình ảnh và lấy URL
    const imageUrls = await uploadImages(imageFiles);
    
    const productData = {
      ...values,
      imgPro: imageUrls,  // Thêm các hình ảnh đã upload vào dữ liệu sản phẩm
      creatDatePro: creatDatePro || new Date(),  // Nếu không có ngày tạo thì dùng ngày hiện tại
      ownerId: ownerId || "defaultOwnerId",  // Thêm trường ownerId vào dữ liệu sản phẩm (lấy từ user context hoặc session)
    };

    try {
      const newProduct = await addProduct(productData);  // Thêm sản phẩm lên server
      console.log("Sản phẩm đã được thêm:", newProduct);
      info();  // Hiển thị thông báo thành công
      form.resetFields();  // Reset form sau khi thành công
    } catch (error) {
      console.log("Lỗi khi thêm sản phẩm:", error);
      messageApi.open({
        type: "error",
        content: "Thêm sản phẩm thất bại!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="Thêm Sản Phẩm" bordered={true} style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              {/* Tên sản phẩm */}
              <Form.Item
                name="namePro"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Chủ sở hữu */}
              <Form.Item
                name="ownerId"
                label="Chủ sở hữu"
                rules={[{ required: true, message: "Vui lòng nhập chủ sở hữu!" }]}>
                <Input placeholder="Nhập chủ sở hữu sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Giá sản phẩm */}
              <Form.Item
                name="price"
                label="Giá sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}>
                <Input type="number" placeholder="Nhập giá sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Số lượng sản phẩm */}
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng sản phẩm!" }]}>
                <Input type="number" placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Mô tả sản phẩm */}
              <Form.Item
                name="desPro"
                label="Mô tả sản phẩm"
                rules={[{ required: false }]}>
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" maxLength={255} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Trạng thái còn hàng hay hết hàng */}
              <Form.Item
                name="statusPro"
                label="Trạng thái"
                valuePropName="checked">
                <Switch checkedChildren="Còn hàng" unCheckedChildren="Hết hàng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Danh mục sản phẩm */}
              <Form.Item
                name="cateId"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục sản phẩm!" }]}>
                <Select placeholder="Chọn danh mục sản phẩm">
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Thương hiệu sản phẩm */}
              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[{ required: false }]}>
                <Input placeholder="Nhập thương hiệu sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* Phân loại các mô hình sản phẩm */}
              <Form.Item
                name="listPro"
                label="Mô hình sản phẩm"
                rules={[{ required: false }]}>
                <Input placeholder="Nhập mô hình sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* Hình ảnh sản phẩm */}
              <Form.Item
                name="imgPro"
                label="Hình ảnh sản phẩm"
                rules={[{ required: false }]}>
                <Upload
                  beforeUpload={(file) => {
                    setImageFiles((prev) => [...prev, file]);  // Thêm tệp vào danh sách hình ảnh
                    return false;  // Ngừng tự động upload
                  }}
                  listType="picture-card"
                  fileList={imageFiles}
                  accept="image/*">
                  <Button>Chọn hình ảnh</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Nút submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
