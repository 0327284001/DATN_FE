import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigate } from 'react-router-dom';

const FeedbackMenu: React.FC = () => {
    const navigate = useNavigate();
  const handleAPP = () => {
    navigate('/admin/FeedbackApp');
  };

  // Hàm điều hướng đến màn hình FeedbackKH
  const handleKH = () => {
    navigate('/admin/FeedbackKH');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn loại phản hồi</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleKH} // Sử dụng handleAPP để điều hướng
      >
        <Text style={styles.buttonText}>Phản hồi từ khách hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAPP} // Sử dụng handleKH để điều hướng
      >
        <Text style={styles.buttonText}>Phản hồi từ hệ thống</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeedbackMenu;
