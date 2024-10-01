import { Form, FormProps, Input, Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import { addProduct } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { upload } from "../../service/upload";
import { url } from "inspector";
import { getAllCategories } from "../../service/category";
import { Icategory } from "../../interface/category";
type Props = {};
type LabelRender = SelectProps["labelRender"];
const Add = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [img, setImg] = useState<string>("");
  const [category, setCategory] = useState<Icategory[]>([]);
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [tailen, setTailen] = useState<any>(null)
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Product added successfully",
    });
  };

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getAllCategories();
          setCategory(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCategories();
    }, []);
  

  // const options = [
  //   { label: "Computer", value: "Computer" },
  //   { label: "TV", value: "TV" },
  //   { label: "Headphones", value: "Headphones" },
  //   { label: "Mouse", value: "Mouse" },
  //   { label: "Keyboard", value: "Keyboard" },
  //   { label: "Accessory", value: "Accessory" },
  // ];
  const labelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
      return value;
    }
    return <span>Please choose the category: </span>;
  };

  const uploadImage = async (files:any) => {
    const formdata = new FormData()
    formdata.append('images', files)
    const upImage = await upload (formdata)
    console.log(upImage.payload[0].url);
    return upImage.payload[0].url
    
  }



  const onFinish = async (values: any) => {
    console.log("Success:", values);
     const fileResult = await uploadImage(tailen)
    const payload =  {
      ...values,
      img : fileResult,
      categoryID : values.category
    }
    console.log(values);
    
    const product = await addProduct(payload);
    console.log(product);

    const newproducts = [product];
    setProducts(newproducts);
    setName("");
    setImg("");
    setPrice(0);
    setCategory([]);
    info();

    form.resetFields();

  };
  return (
    <>
      {contextHolder}
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} initialValues={{ category: "1" }} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">
              Coffee name:
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Coffeename!" },
              ]}
            >
              <Input
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Enter Coffee name"
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
                    message: "Please input your Coffee price!",
                  },
                ]}
              >
                <Input
                  className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                  placeholder="Enter Price $$$"
                />
              </Form.Item>
              <div className="absolute left-4"></div>
            </div>

            <label className="mb-2 text-sm text-black block">Your Image:</label>
            <div className="relative flex items-center">
              <Form.Item
                name="img"
                rules={[
                  {
                    required: false,
                    message: "Please input your Coffee image!",
                  },
                ]}
              >
                <Input
                type="file"
                onChange={(e:any)=>{setTailen(e.target.files[0])}}
                  className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                  placeholder="Enter Coffee image"
                />
              </Form.Item>
              <div className="absolute left-4"></div>
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
                  {category.map((categoryID:Icategory, index:number) => (
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
            Thêm mới sản phẩm
          </button>
        </Form>
      </div>
    </>
  );
};

export default Add;
