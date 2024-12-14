import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  cusId: string;
  userId: string;
  message: string;
  chatType: string;
  timestamp: string;
  chatStatus: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Khởi tạo là mảng trống
  const [newMessage, setNewMessage] = useState<string>(''); // Tin nhắn mới
  const [currentCusId, setCurrentCusId] = useState<string>(''); // ID khách hàng hiện tại
  const [selectedId, setSelectedId] = useState<string>(''); // ID tin nhắn được chọn
  const [currentUserId] = useState<string>('admin'); // ID của admin

  // Fetch danh sách tin nhắn
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:28017/chats');
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Dữ liệu trả về không phải mảng:', response.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tin nhắn:', error);
      }
    };
    fetchMessages();
  }, []);

  // Fetch tin nhắn theo khách hàng khi chọn
  const fetchMessagesByCusId = async (cusId: string) => {
    try {
      const response = await axios.get(`http://localhost:28017/chats/cus/${cusId}`);
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        console.error('Dữ liệu trả về không phải mảng:', response.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tin nhắn theo cusId:', error);
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMessage || !currentCusId || !currentUserId) return;

    const messageData = {
      cusId: currentCusId,
      userId: currentUserId,
      message: newMessage,
      chatType: 'Văn bản',
      chatStatus: 'Đã gửi',
    };

    try {
      await axios.post(`http://localhost:28017/messages`, messageData);
      setNewMessage('');

      // Cập nhật tin nhắn trong UI mà không cần gọi lại API
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, _id: new Date().toISOString(), timestamp: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  };

  // Khi nhấn vào khách hàng, hiển thị tin nhắn của họ
  const handleCustomerClick = (id: string) => {
    setSelectedId(id); // Chỉ chọn tin nhắn hiện tại
    fetchMessagesByCusId(id);
  };

  // Xóa cuộc trò chuyện khi nhấn lâu
  const handleLongPress = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      try {
        // Gọi API để xóa cuộc trò chuyện theo _id
        await axios.delete(`http://localhost:28017/messages/${id}`);
    
        // Cập nhật lại danh sách tin nhắn sau khi xóa
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== id) // Xóa tin nhắn dựa trên _id
        );
      } catch (error) {
        console.error('Lỗi khi xóa cuộc trò chuyện:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Danh sách tin nhắn */}
      <div style={{
        width: '25%',
        borderRight: '1px solid #ccc',
        padding: '16px',
        overflowY: 'auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#007bff',
          borderBottom: '2px solid #007bff',
          paddingBottom: '8px',
          marginBottom: '16px',
        }}>Danh sách tin nhắn</h2>
        {messages.map((msg) => (
          <div
            key={msg._id}
            onClick={() => handleCustomerClick(msg._id)} // Sử dụng _id thay vì cusId
            onContextMenu={(e) => {
              e.preventDefault(); // Ngừng hành động mặc định (chuột phải)
              handleLongPress(msg._id); // Xử lý sự kiện nhấn lâu (long press)
            }}
            style={{
              padding: '8px',
              margin: '8px 0',
              cursor: 'pointer',
              backgroundColor: selectedId === msg._id ? '#007bff' : '#f9f9f9', // Chỉ mục được chọn sáng lên
              color: selectedId === msg._id ? 'white' : 'black',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {msg.message} <br />
            <span style={{ fontSize: '0.9em', color: '#777' }}>Khách hàng ID: {msg.cusId}</span>
          </div>
        ))}
      </div>

      {/* Khu vực chat */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#007bff',
          borderBottom: '2px solid #007bff',
          paddingBottom: '8px',
          marginBottom: '16px',
        }}>Chăm sóc khách hàng</h2>

        {/* Tin nhắn */}
        <div style={{
          flex: '1',
          overflowY: 'auto',
          marginBottom: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
        }}>
          {messages.filter(msg => msg._id === selectedId).map((msg) => (
            <div
              key={msg._id}
              style={{
                marginBottom: '12px',
                padding: '8px',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                justifyContent: msg.userId === 'admin' ? 'flex-end' : 'flex-start', // Căn lề so le
              }}
            >
              <div style={{
                maxWidth: '80%',
                backgroundColor: msg.userId === 'admin' ? '#007bff' : '#f1f1f1',
                color: msg.userId === 'admin' ? 'white' : 'black',
                padding: '8px',
                borderRadius: '8px',
              }}>
                <div style={{
                  marginBottom: '4px',
                  fontWeight: 'bold',
                  color: msg.userId === 'admin' ? 'white' : '#007bff',
                }}>
                  {msg.userId} ({new Date(msg.timestamp).toLocaleString()}):
                </div>
                <p style={{
                  margin: '0 0 8px',
                  color: '#333',
                }}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gửi tin nhắn mới */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <textarea
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{
              flex: '1',
              marginRight: '8px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none',
              height: '50px',
            }}
          ></textarea>
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
