import { Form, Input, Button, message, Select, Switch, Row, Col, Card, Upload } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByID, updateProduct } from "../../service/products";
import { getAllCategories } from "../../service/category";
import { Icategory } from "../../interface/category";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [owerId, setOwerId] = useState<string>("");
  const navigate = useNavigate();

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhật sản phẩm thành công!",
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
      }
    };

    const fetchProduct = async () => {
      if (id) {
        try {
          const product = await getProductByID(id);
          form.setFieldsValue({
            namePro: product.namePro,
            price: product.price,
            quantity: product.quantity,
            desPro: product.desPro,
            cateId: product.cateId,
            statusPro: product.statusPro ? "Còn hàng" : "Hết hàng",
            brand: product.brand,
            import_price: product.import_price,
          });
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
      }
    };

    fetchCategories();
    fetchProduct();
  }, [form, id]);

  const onFinish = async (values: any) => {
    const { namePro, price, quantity, desPro, cateId, brand, statusPro, import_price } = values;

    const updatedProduct = {
      ...values,
      statusPro: statusPro === "Còn hàng",
    };

    try {
      const newProduct = await updateProduct(id as string, updatedProduct);
      console.log("Sản phẩm đã được cập nhật:", newProduct);
      info();  // Hiển thị thông báo thành công
      form.resetFields();  // Reset form sau khi cập nhật thành công
      navigate("/admin/dashboard");  // Điều hướng đến trang danh sách sản phẩm (hoặc trang khác bạn muốn)
    } catch (error) {
      console.log("Lỗi khi cập nhật sản phẩm:", error);
      messageApi.open({
        type: "error",
        content: "Cập nhật sản phẩm thất bại!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Card title="Cập nhật sản phẩm" bordered={true} style={{ width: '80%', margin: '0 auto', padding: '20px' }}>
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
                name="owerId"
                label="Chủ sở hữu"
                rules={[{ required: true, message: "Vui lòng nhập chủ sở hữu!" }]}>
                <Input placeholder="Nhập chủ sở hữu sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá sản phẩm"
                rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}>
                <Input type="number" placeholder="Nhập giá sản phẩm" />
              </Form.Item>
            </Col>
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
                name="import_price"
                label="Giá Nhập"
                rules={[{ required: true, message: "Vui lòng nhập giá nhập sản phẩm!" }]}>
                <Input type="number" placeholder="Vui lòng nhập giá nhập" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="desPro"
                label="Mô tả sản phẩm"
                rules={[{ required: false }]}>
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" maxLength={255} />
              </Form.Item>
            </Col>
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
                label="Thương hiệu"
                rules={[{ required: false }]}>
                <Input placeholder="Nhập thương hiệu sản phẩm" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="imgPro"
                label="Hình ảnh sản phẩm"
                rules={[{ required: false }]}>
                <Upload
                  beforeUpload={(file) => {
                    setImageFiles((prev) => [...prev, file]);
                    return false;
                  }}
                  listType="picture-card"
                  fileList={imageFiles}
                  accept="image/*">
                  <Button>Chọn hình ảnh</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="default"
                block
                onClick={() => navigate("/admin/dashboard")}>
                Quay lại
              </Button>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Cập nhật sản phẩm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UpdateProduct;
