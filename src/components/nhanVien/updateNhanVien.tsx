import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; // Import các biểu tượng Eye

interface NhanVien {
  maNhanVien: string;
  hoTen: string;
  soDienThoai: string;
  ngaySinh: string;
  matKhau: string;
}

interface UpdateNhanVienProps {
  nhanVien: NhanVien;
  onUpdate: (updatedNhanVien: NhanVien) => void;
}

const UpdateNhanVien: React.FC<UpdateNhanVienProps> = ({ nhanVien, onUpdate }) => {
  const [formData, setFormData] = useState<NhanVien>(nhanVien);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Thêm state để kiểm soát hiển thị mật khẩu

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateNhanVien = () => {
    if (!formData.maNhanVien || !formData.hoTen || !formData.soDienThoai || !formData.ngaySinh || !formData.matKhau) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (formData.hoTen.length < 6) {
      setError("Họ và tên phải ít nhất 6 ký tự.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.soDienThoai)) {
      setError("Số điện thoại phải gồm 10 chữ số và không chứa ký tự khác.");
      return;
    }

    setError(null);
    onUpdate(formData);
    alert('Cập nhật nhân viên thành công!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-center text-gray-700 mb-6">Cập Nhật Thông Tin Nhân Viên</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {error && (
          <div className="text-red-500 text-center mb-4 col-span-2">
            {error}
          </div>
        )}

        {['maNhanVien', 'hoTen', 'soDienThoai', 'ngaySinh', 'matKhau'].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="block text-gray-700 font-medium mb-2">
              {field === 'maNhanVien'
                ? 'Mã Nhân Viên'
                : field === 'hoTen'
                ? 'Họ và Tên'
                : field === 'soDienThoai'
                ? 'Số Điện Thoại'
                : field === 'ngaySinh'
                ? 'Ngày Sinh'
                : 'Mật Khẩu'}
            </label>
            <div className="relative">
              <input
                type={field === 'matKhau' ? (showPassword ? 'text' : 'password') : field === 'ngaySinh' ? 'date' : 'text'}
                name={field}
                className="w-full h-12 border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={(formData as any)[field]}
                onChange={handleInputChange}
              />
              {field === 'matKhau' && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)} // Đổi trạng thái khi click vào eye icon
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
          onClick={handleUpdateNhanVien}
        >
          Cập Nhật
        </button>
      </div>
    </div>
  );
};

export default UpdateNhanVien;
