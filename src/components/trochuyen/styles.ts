import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Đặt bố cục ngang cho phần tìm kiếm và trò chuyện
  },
  leftPanel: {
    flex: 3, // Phần bên trái chiếm 3 phần không gian
    padding: 10,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ddd', // Viền bên phải để phân tách phần tìm kiếm và trò chuyện
  },
  rightPanel: {
    flex: 7, // Phần bên phải chiếm 7 phần không gian
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    marginBottom: 20, // Thêm khoảng cách cho phần tìm kiếm
  },
  searchInput: {
    width: '100%',
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333', // Màu chữ tối để dễ đọc
  },
  customerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 15, // Bo góc mượt mà
    marginBottom: 12, // Tạo khoảng cách giữa các mục
    shadowColor: '#000', // Thêm bóng đổ nhẹ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Màu chữ tối
  },
  chatHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15, // Khoảng cách giữa tiêu đề và tin nhắn
    color: '#0078FF', // Màu tiêu đề
  },
  messageBubble: {
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    maxWidth: '80%',
    minWidth: 50,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  systemMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },

  // Chỉnh lại icon con mắt
  messageIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  messageIcon: {
    marginRight: 10,
    backgroundColor: '#0078FF',
    padding: 8, // Giảm kích thước của icon con mắt
    borderRadius: 50, // Bo góc hoàn toàn cho icon
    elevation: 2, // Thêm hiệu ứng bóng nhẹ cho icon
  },
  
  // Cập nhật tin nhắn chờ với nền trắng và bóng nhẹ
  unreadMessageContainer: {
    backgroundColor: '#fff', // Nền trắng cho tin nhắn chờ
    borderRadius: 12, // Bo góc nhẹ cho khung
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 10, // Khoảng cách giữa icon và text
    shadowColor: '#000', // Thêm bóng nhẹ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  unreadMessageText: {
    fontSize: 14,
    color: '#FF5733', // Màu chữ đỏ cam cho tin nhắn chờ
    fontWeight: 'bold',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  messageInput: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginRight: 15,
    fontSize: 16,
    color: '#333', // Màu chữ cho nhập liệu
  },
  sendButton: {
    backgroundColor: '#0078FF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3, // Thêm hiệu ứng bóng cho nút gửi
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
