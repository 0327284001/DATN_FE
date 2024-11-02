import React, { useEffect, useState } from 'react'
import { Form, FormProps, Input, message, Popconfirm, Select, SelectProps } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { Icategory } from '../../interface/category';
import { getCategoryByID, updateCategory } from '../../service/category';


type Props = {}

const Updatecategory = (props: Props) => {
    const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<Icategory[]>([]);
//   const [products, setProducts] = useState<Iproduct[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByID(id);
        form.setFieldsValue({
          name: response.name,
          
        });
        console.log(response);
      } catch (error) {}
    };
    fetchCategory();
  }, [id, form])

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Category update successfully",
    });
  };

  const onFinish = async (values: any) => {
    try {
      const categoryData = { ...values };
      const updatedCategory = await updateCategory(id, categoryData);
  
      if (updatedCategory) {
        console.log("Updated Category:", updatedCategory);
        info();  
        form.resetFields();  
        navigate("/admin/category");  
      } else {
        messageApi.error("Failed to update category");
      }
  
    } catch (error) {
      console.error("Error updating category:", error);
      messageApi.error("Server Error: Could not update category.");
    }
  };
  return (
   <>
   <div className="pt-[20px] px-[30px]">
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} onFinish={onFinish}>
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
            Sửa Danh Mục
          </button>
        </Form>
      </div>
      </div>
   </>
  )
}

export default Updatecategory