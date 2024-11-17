import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { EyeIcon } from '@heroicons/react/solid';
import AddMessage from './AddMessage';
import { styles } from './styles';

const TroChuyen = () => {
  // Tạo dữ liệu khách hàng và tin nhắn fix cứng tạm thời
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { id: 1, customerName: 'Khách hàng 1', text: 'Sản phẩm ABC này có gì đặc biệt?', isUser: false, isRead: false },
    { id: 2, customerName: 'Khách hàng 2', text: 'Mình muốn hỏi về sản phẩm XYZ.', isUser: false, isRead: false },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [lastSentMessageId, setLastSentMessageId] = useState<number | null>(null);

  // Danh sách tin nhắn chưa đọc
  const unreadMessages = messages.filter((message) => !message.isUser && !message.isRead);

  // Lọc tin nhắn theo tên khách hàng
  const filteredMessages = messages.filter((message) =>
    message.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // Xử lý khi chọn khách hàng
  function handleCustomerSelect(customerName: string): void {
    console.log(`Khách hàng được chọn: ${customerName}`);
    setSelectedCustomer(customerName);

    // Đánh dấu tất cả tin nhắn chưa đọc của khách hàng đã chọn là đã đọc
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.customerName === customerName && !message.isUser) {
          console.log(`Đánh dấu tin nhắn của khách hàng ${customerName} là đã đọc.`);
          return { ...message, isRead: true };
        }
        return message;
      })
    );
  }

  // Gửi tin nhắn từ admin
  function handleSendMessage(message: string) {
    if (message && selectedCustomer) {
      console.log(`Gửi tin nhắn: "${message}" cho khách hàng: ${selectedCustomer}`);

      // Thêm tin nhắn từ admin
      const newMessage = {
        id: messages.length + 1,
        customerName: selectedCustomer,
        text: message,
        isUser: true,
        isRead: false,
      };

      console.log('Tin nhắn từ admin:', newMessage);

      // Thêm tin nhắn của admin vào mảng
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Cập nhật ID tin nhắn cuối cùng đã gửi
      setLastSentMessageId(newMessage.id);

      // Phản hồi tự động từ khách hàng nếu chưa có phản hồi
      if (lastSentMessageId !== newMessage.id) {
        const customerReply = {
          id: messages.length + 2,
          customerName: selectedCustomer,
          text: `Cho tôi xin giá sản phẩm ${message} này.`,
          isUser: false,
          isRead: false,
        };

        console.log('Phản hồi từ khách hàng:', customerReply);

        // Thêm phản hồi từ khách hàng vào mảng
        setMessages((prevMessages) => [...prevMessages, customerReply]);
      }

      setMessageInput('');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm khách hàng..."
          value={search}
          onChangeText={setSearch}
        />

        {/* Icon thông báo tin nhắn chờ */}
        <View style={styles.messageIconContainer}>
          <TouchableOpacity style={styles.messageIcon}>
            <EyeIcon width={20} height={20} color="#fff" />
          </TouchableOpacity>
          {unreadMessages.length > 0 && (
            <View style={styles.unreadMessageContainer}>
              <Text style={styles.unreadMessageText}>{unreadMessages.length} tin nhắn chờ</Text>
            </View>
          )}
        </View>

        {/* Danh sách khách hàng */}
        <FlatList
          data={filteredMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerItem}
              onPress={() => handleCustomerSelect(item.customerName)}
            >
              <Text style={styles.customerName}>{item.customerName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Khu vực trò chuyện bên phải */}
      {selectedCustomer && (
        <View style={styles.rightPanel}>
          <Text style={styles.chatHeader}>Trò chuyện với {selectedCustomer}</Text>
          <FlatList
            data={messages.filter((message) => message.customerName === selectedCustomer)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.systemMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />
          <AddMessage
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSendMessage={handleSendMessage}
          />
        </View>
      )}
    </View>
  );
};

export default TroChuyen;
