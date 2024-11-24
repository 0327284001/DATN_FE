import { Form, Input, Button, message, Select, Row, Col, Card, Switch, Upload } from "antd";  // Thêm Upload vào đây
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
  const [priceIn, setPriceIn] = useState<string>("");  // Giá nhập
  const [priceOut, setPriceOut] = useState<string>(""); // Giá bán

  // Hàm thông báo thành công
  const info = () => {
    messageApi.open({
      type: "success",
      content: "Sản phẩm đã được thêm thành công!",
    });
  };

  // Lấy danh mục sản phẩm từ server
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
    const { namePro, quantity, desPro, cateId, brand, statusPro, listPro, creatDatePro } = values;

    // Upload hình ảnh và lấy URL
    const imageUrls = await uploadImages(imageFiles);

    // Dữ liệu sản phẩm
    const productData = {
      ...values,
      imgPro: imageUrls,  // Thêm các hình ảnh đã upload vào dữ liệu sản phẩm
      creatDatePro: creatDatePro || new Date(),  // Nếu không có ngày tạo thì dùng ngày hiện tại
      priceIn: priceIn,  // Lấy giá nhập từ trường nhập liệu priceIn
      priceOut: priceOut,  // Lấy giá bán từ trường nhập liệu priceOut
    };

    try {
      const newProduct = await addProduct(productData);  // Thêm sản phẩm lên server
      info();  // Hiển thị thông báo thành công
      form.resetFields();  // Reset form sau khi thành công
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thêm sản phẩm thất bại!",
      });
    }
  };

  // Hàm xử lý thay đổi file chọn
  const handleChange = (info: any) => {
    if (info.fileList) {
      // Cập nhật danh sách file ảnh đã chọn
      setImageFiles(info.fileList);
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="Thêm Sản Phẩm" bordered={true} style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="namePro"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priceIn"
                label="Giá nhập"
                rules={[{ required: true, message: "Vui lòng nhập giá nhập sản phẩm!" }]}>
                <Input
                  value={priceIn}
                  onChange={(e) => setPriceIn(e.target.value)}  // Cập nhật giá nhập khi người dùng nhập
                  placeholder="Nhập giá nhập"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="priceOut"
                label="Giá bán"
                rules={[{ required: true, message: "Vui lòng nhập giá bán sản phẩm!" }]}>
                <Input
                  value={priceOut}
                  onChange={(e) => setPriceOut(e.target.value)}  // Cập nhật giá bán khi người dùng nhập
                  placeholder="Nhập giá bán"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng sản phẩm!" }]}>
                <Input type="number" placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="desPro"
                label="Mô tả sản phẩm">
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" maxLength={255} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
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
              <Form.Item
                name="brand"
                label="Thương hiệu">
                <Input placeholder="Nhập thương hiệu sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="listPro"
                label="Mô hình sản phẩm">
                <Input placeholder="Nhập mô hình sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="creatDatePro"
                label="Ngày tạo sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập ngày tạo!" }]}>
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ảnh sản phẩm"
                valuePropName="fileList"
                extra="Chọn các ảnh sản phẩm"
              >
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  fileList={imageFiles}
                  onChange={handleChange}  // Đảm bảo cập nhật fileList khi thay đổi
                  onRemove={(file) => {
                    setImageFiles(imageFiles.filter(item => item.uid !== file.uid));
                  }}
                  multiple // Cho phép chọn nhiều ảnh
                >
                  <div>+ Thêm ảnh</div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
