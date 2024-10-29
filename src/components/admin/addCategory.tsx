import React, { useState } from 'react'
import { Form, FormProps, Input, message, Popconfirm, Select, SelectProps } from "antd";
import { Navigate, useNavigate } from 'react-router-dom';
import { Icategory } from '../../interface/category';
import { addCategory } from '../../service/category';

type Props = {}

const Addcategory = (props: Props) => {
    const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<Icategory[]>([]);
//   const [products, setProducts] = useState<Iproduct[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  const navigate = useNavigate();
  const [form] = Form.useForm();

  

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Category added successfully",
    });
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
     
    const payload =  {
      ...values,
     
    }
    const category = await addCategory(payload);
    console.log(category);

    const necategory = [category];
    setCategory(necategory);
    setName("");
     
    info();

   navigate("/admin/category");

  };
  return (
   <>
   <div className="pt-[20px] px-[30px]">
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} initialValues={{ category: "1" }} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">
              Category name:
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your product category!!" },
              ]}
            >
              <Input
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Enter Category name"
              />
            </Form.Item>
          </div>
         
          <button
            type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thêm mới Danh Mục
          </button>
        </Form>
      </div>
      </div>
   </>
  )
}

export default Addcategory