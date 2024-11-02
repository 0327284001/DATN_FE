import { Form, FormProps, Input, Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Icategory } from "../../interface/category";
import { Iproduct } from "../../interface/products";
import { getProductByID, updateProduct } from "../../service/products";
import { getAllCategories } from "../../service/category";

type Props = {};

const Update = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<Icategory[]>([]); // Change this to array of Icategory
  const [Products, setProducts] = useState<Iproduct[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  console.log(id, "log id");

  type LabelRender = SelectProps["labelRender"];

  const labelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
      return value;
    }
    return <span>Please choose the type of product: </span>;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductByID(id);
        form.setFieldsValue({
          name: response.name,
          price: response.price,
          category: response.category,
        });
        console.log(response);
      } catch (error) {}
    };

    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategory(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, form]);

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const product: any = await updateProduct(id, values);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    alert("success");

    navigate("/admin/dashboard");
  };

  console.log(name);

  return (
    <>
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">
              Edit name:
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Enter name"
              />
            </Form.Item>
          </div>
          <div>
            <label className="mb-2 text-sm text-black block">
              Your price ($):
            </label>
            <div className="relative flex items-center">
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your product price!",
                  },
                ]}
              >
                <Input
                  className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                  placeholder="Enter Price $$$"
                />
              </Form.Item>
            </div>
            <div className="pt-[20px]">
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your Category!",
                  },
                ]}
              >
                <Select labelRender={labelRender} style={{ width: "100%" }}>
                  {category.map((categoryID: Icategory, index: number) => (
                    <Select.Option key={categoryID._id} value={categoryID._id}>
                      {categoryID.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <button
            type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cập nhật sản phẩm
          </button>
        </Form>
      </div>
    </>
  );
};

export default Update;