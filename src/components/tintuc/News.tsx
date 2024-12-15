import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Hook để điều hướng
import axios from 'axios';

interface ArtStory {
  _id?: string;
  title: string;
  author?: string;
  date?: string;
  description?: string;
  content?: string;
  caption?: string[];
  imageUrl?: string[];
}

const NewArtStory: React.FC = () => {
  const [artStories, setArtStories] = useState<ArtStory[]>([]);
  const navigate = useNavigate(); // Sử dụng hook điều hướng

  useEffect(() => {
    fetchArtStories();
  }, []);

  const fetchArtStories = async () => {
    try {
      const response = await axios.get('http://localhost:28017/artstories');
      setArtStories(response.data);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu!');
    }
  };

  const handleDelete = async (id: string) => {
    const loadingMessage = message.loading('Đang xóa...', 0); // Hiển thị thông báo loading
    try {
      await axios.delete(`http://localhost:28017/artstories/${id}`);
      loadingMessage(); // Dừng loading
      message.success('Xóa thành công!');
      fetchArtStories(); // Tải lại dữ liệu sau khi xóa

      // Điều hướng về trang danh sách sau khi xóa thành công
      navigate('/admin/news'); // Đảm bảo trang này là trang bạn muốn quay lại
    } catch (error) {
      loadingMessage(); // Dừng loading
      message.error('Lỗi khi xóa dữ liệu!');
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      render: (author: string) => (author ? author : 'Chưa có'),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (description ? description.substring(0, 30) + '...' : 'Không có mô tả'),
    },
    {
      title: 'Chú thích',
      dataIndex: 'caption',
      key: 'caption',
      render: (caption: string[]) => (caption && caption.length > 0 ? caption[0] : 'Không có chú thích'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string[]) => (imageUrl && imageUrl.length > 0 ? <img src={imageUrl[0]} alt="Art" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> : 'Không có hình ảnh'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: ArtStory) => (
        <>
          <Button 
            onClick={(e) => { 
              e.stopPropagation(); // Ngừng sự kiện truyền xuống handleRowClick
              navigate(`/admin/EditArtStory/${record._id}`); 
            }} 
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Button onClick={() => handleDelete(record._id!)} danger>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const handleRowClick = (record: ArtStory) => {
    navigate(`/admin/ArtStoryDetail/${record._id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Quản lý ArtStory</h1>
      <Button type="primary" onClick={() => navigate('/admin/AddArtStory')} style={{ marginBottom: '20px' }}>
        Thêm mới
      </Button>
      <Table 
        dataSource={artStories} 
        columns={columns} 
        rowKey="_id" 
        pagination={{ pageSize: 5 }} // Giới hạn số lượng hiển thị trên mỗi trang
        scroll={{ x: 'max-content' }} // Đảm bảo bảng có thể cuộn ngang nếu cần
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Bắt sự kiện click vào hàng
        })}
      />
    </div>
  );
};

export default NewArtStory;
