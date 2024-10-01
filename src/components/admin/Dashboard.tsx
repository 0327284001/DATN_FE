import React, { useEffect, useState } from "react";
import { DeleteProduct, getAllproducts } from "../../service/products";
import { Iproduct } from "../../interface/products";
import { Popconfirm } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Update from "./update";

type Props = {};

const Dashboard = (props: Props) => {
  const [products, setProduct] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  console.log(param);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllproducts();
        setProduct(data);
        console.log(data,  "data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
    
  }, []);

  const delProduct = async (id: string) => {
    await DeleteProduct(id);
    const newproduct = products.filter(
      (product: Iproduct) => product._id !== id
    );
    console.log(id);
    setProduct(newproduct);
  };

  const updateProduct = (id: string) => {
    navigate(`update/${id}`);
  };

  return (
    <>
      <div className="flex-1 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Iproduct, index: number) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product?.category?.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button
                      onClick={() => updateProduct(product._id)}
                      type="button"
                      className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Edit
                    </button>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        delProduct(product._id);
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

export default Dashboard;
