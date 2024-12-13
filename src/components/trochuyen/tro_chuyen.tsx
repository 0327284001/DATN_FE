import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TroChuyen.css';

interface Chat {
  userId: string;
  cusId: string;
  message: string;
  chatType: 'Văn bản' | 'Hình ảnh' | 'Video';
  timestamp: string;
  chatStatus: 'Đã gửi' | 'Đã nhận' | 'Đã đọc';
}

const TroChuyen: React.FC = () => {
  const [cusList, setCusList] = useState<string[]>([]); // Danh sách cusId
  const [selectedCusId, setSelectedCusId] = useState<string | null>(null); // cusId được chọn
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userId] = useState<string>('user1'); // ID của người gửi (giả định)

  // Lấy danh sách khách hàng (cusId) khi component load
  useEffect(() => {
    const fetchCusList = async () => {
      try {
        // const response = await axios.get('http://localhost:28017/messages'); 
        // console.log('Danh sách khách hàng:', response.data);
        // setCusList(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khách hàng:", error);
      }
    };

    fetchCusList();
  }, []);

  // Lấy danh sách tin nhắn theo cusId được chọn
  useEffect(() => {
    if (!selectedCusId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messages/${selectedCusId}`); // Dùng :cusId thay vì query string
        setMessages(response.data);
      } catch (error) {
        console.error("Lỗi khi tải tin nhắn:", error);
      }
    };


    fetchMessages();
  }, [selectedCusId]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMessage || !selectedCusId) return;

    try {
      const messageData = {
        userId,
        cusId: selectedCusId,
        message: newMessage,
        chatType: 'Văn bản',
        chatStatus: 'Đã gửi',
      };

      // const response = await axios.post('/chats', messageData);
      // setMessages([...messages, response.data]); 
      // setNewMessage(''); 
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  return (
    <div className="container">

      <div className="cusList">
        {cusList.map((cus) => (
          <div
            key={cus}
            className={`cusItem ${cus === selectedCusId ? 'selected' : ''}`}
            onClick={() => setSelectedCusId(cus)}
          >
            {cus}
          </div>
        ))}
      </div>

      {/* Khu vực chat */}
      <div className="chatContainer">
        {selectedCusId ? (
          <>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.userId === userId ? 'sent' : 'received'}`}
                >
                  {/* Render chỉ thông điệp */}
                  <p>{msg.message}</p>
                  {/* Hiển thị thời gian tin nhắn */}
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>


            <div className="inputContainer">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn"
                className="textarea"
              ></textarea>
              <button onClick={sendMessage} className="button">
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className="placeholder">Chọn một khách hàng để bắt đầu trò chuyện</div>
        )}
      </div>
    </div>
  );

};



export default TroChuyen;
