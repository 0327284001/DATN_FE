import { Form, FormProps, Input, Popconfirm, Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import { addProduct } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { upload } from "../../service/upload";
import { url } from "inspector";
import { Icategory } from "../../interface/category";
import { addCategory, delCategory, getAllCategories } from "../../service/category";
type Props = {};
type LabelRender = SelectProps["labelRender"];
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

    form.resetFields();

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategory(data);
        console.log(data,  "data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
    
  }, []);
  return (
    <>
      {contextHolder}
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

      
      <div className="flex-1 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              Category name
              </th>
              <th scope="col" className="px-6 py-3">
              Function
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((category: Icategory, index: number) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.name}
                </th>
                
                <td className="px-6 py-4">
                  <div className="flex">
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        delCategory(category._id);
                      }}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        // onClick={() => delProduct(product._id)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
        
     
    </>
  );
};

export default Addcategory;
