import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { useNavigate } from 'react-router-dom';

// Định nghĩa RootStackParamList




const AddVoucher = () => {
  const [priceReduced, setPriceReduced] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [quantityVoucher, setQuantityVoucher] = useState('');

  const [priceError, setPriceError] = useState('');
  const [discountCodeError, setDiscountCodeError] = useState('');
  const [quantityVoucherError, setQuantityVoucherError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    setPriceError('');
    setDiscountCodeError('');
    setQuantityVoucherError('');
    
    let isValid = true;

    if (!priceReduced || isNaN(Number(priceReduced)) || Number(priceReduced) <= 0) {
      setPriceError('Giá giảm phải là số dương.');
      isValid = false;
    }

    if (!discountCode.trim()) {
      setDiscountCodeError('Mã giảm giá không được để trống.');
      isValid = false;
    }

    if (!quantityVoucher) {
      setQuantityVoucherError('Vui lòng chọn loại voucher.');
      isValid = false;
    }

    if (!isValid) return;

    // Dữ liệu gửi tới API
    const newVoucher = {
      price_reduced: Number(priceReduced),
      discount_code: discountCode.trim(),
      quantity_voucher: quantityVoucher,
    };
    
    try {
      const response = await fetch('http://localhost:28017/vouchers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVoucher),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Thêm voucher thành công');
        clearForm();
        navigate("/admin/voucher");
      } else {
        throw new Error(data.message || 'Có lỗi xảy ra khi thêm voucher');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra');
      }
    }
  };

  const clearForm = () => {
    setPriceReduced('');
    setDiscountCode('');
    setQuantityVoucher('');
    navigate("/admin/voucher");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm Voucher</Text>

      <Text style={styles.label}>Giá giảm (VNĐ):</Text>
      <TextInput
        style={[styles.input, priceError ? styles.inputError : null]}
        keyboardType="numeric"
        value={priceReduced}
        onChangeText={setPriceReduced}
        placeholder="Nhập giá giảm"
      />
      {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}

      <Text style={styles.label}>Mã giảm giá:</Text>
      <TextInput
        style={[styles.input, discountCodeError ? styles.inputError : null]}
        value={discountCode}
        onChangeText={setDiscountCode}
        placeholder="Nhập mã giảm giá"
      />
      {discountCodeError ? <Text style={styles.errorText}>{discountCodeError}</Text> : null}

      <Text style={styles.label}>Loại voucher:</Text>
      <Picker
        selectedValue={quantityVoucher}
        style={[styles.picker, quantityVoucherError ? styles.inputError : null]}
        onValueChange={(itemValue: string) => setQuantityVoucher(itemValue)}
      >
        <Picker.Item label="Chọn loại voucher" value="" />
        <Picker.Item label="Giảm giá vận chuyển" value="Giảm giá vận chuyển" />
        <Picker.Item label="Giảm giá sản phẩm" value="Giảm giá sản phẩm" />
      </Picker>
      {quantityVoucherError ? <Text style={styles.errorText}>{quantityVoucherError}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Thêm" onPress={handleSubmit} color="#28a745" />
        <Button title="Hủy" onPress={clearForm} color="#dc3545" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#495057',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc3545', // Màu đỏ khi có lỗi
  },
  picker: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#dc3545', // Màu đỏ cho thông báo lỗi
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

/// npm install @react-native-picker/picker

//npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context

export default AddVoucher;




