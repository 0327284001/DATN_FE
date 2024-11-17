import React, { useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface AddMessageProps {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (message: string) => void;
}

const AddMessage: React.FC<AddMessageProps> = ({ messageInput, setMessageInput, handleSendMessage }) => {
  // Hàm gửi tin nhắn
  const onSendMessage = useCallback(() => {
    console.log("Button pressed");
    if (messageInput.trim() !== "") {
      console.log("Sending message:", messageInput);
      handleSendMessage(messageInput);  // Gọi hàm gửi tin nhắn từ component cha
      setMessageInput("");  // Xóa trường nhập sau khi gửi tin nhắn
    } else {
      alert("Vui lòng nhập tin nhắn trước khi gửi!");  // Thông báo nếu người dùng chưa nhập tin nhắn
    }
  }, [messageInput, handleSendMessage, setMessageInput]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.messageInput}
        placeholder="Nhập tin nhắn..."
        value={messageInput}
        onChangeText={(text) => {
          console.log("Input changed:", text);
          setMessageInput(text);  // Cập nhật giá trị tin nhắn khi người dùng thay đổi
        }}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
        <Text style={styles.sendText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMessage;
