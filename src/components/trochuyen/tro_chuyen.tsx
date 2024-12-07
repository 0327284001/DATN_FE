import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Chat {
  senderId: string;
  receiverId: string;
  message: string;
  chatType: 'Văn bản' | 'Hình ảnh' | 'Video';
  timestamp: string;
  chatStatus: 'Đã gửi' | 'Đã nhận' | 'Đã đọc';
}

const TroChuyen: React.FC = () => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [senderId] = useState<string>('user1');  // ID của người gửi (giả định)
  const [receiverId] = useState<string>('user2');  // ID người nhận (giả định)

  // Lấy danh sách tin nhắn khi component load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/chats'); // Đảm bảo API đúng
        setMessages(response.data);
      } catch (error) {
        console.error("Lỗi khi tải tin nhắn:", error);
      }
    };

    fetchMessages();
  }, []);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMessage) return;

    try {
      const messageData = {
        senderId,
        receiverId,
        message: newMessage,
        chatType: 'Văn bản',  // Loại tin nhắn có thể thay đổi
        chatStatus: 'Đã gửi',
      };

      const response = await axios.post('/chats', messageData); // API gửi tin nhắn
      setMessages([...messages, response.data]);  // Thêm tin nhắn vào danh sách
      setNewMessage('');  // Xóa trường nhập sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.senderId === senderId ? styles.sent : styles.received),
            }}
          >
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn"
          style={styles.textarea as React.CSSProperties} // Ép kiểu đây
        ></textarea>
        <button onClick={sendMessage} style={styles.button}>
          Gửi
        </button>
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles: { [key: string]: React.CSSProperties } = {
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messages: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '15px',
  },
  message: {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '15px',
    maxWidth: '80%',
    position: 'relative',
  },
  sent: {
    backgroundColor: '#d1f7d1',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  received: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  textarea: {
    width: '100%',
    maxWidth: '100%',
    height: '50px',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    resize: 'none',
    boxSizing: 'border-box', // Đây là nguyên nhân gây lỗi ban đầu
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default TroChuyen;
