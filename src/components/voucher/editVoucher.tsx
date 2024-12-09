import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate, useParams } from 'react-router-dom';

const EditVoucher = () => {
  const { id } = useParams();  // Lấy ID voucher từ URL
  const [priceReduced, setPriceReduced] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [quantityVoucher, setQuantityVoucher] = useState('');
  
  const [priceError, setPriceError] = useState('');
  const [discountCodeError, setDiscountCodeError] = useState('');
  const [quantityVoucherError, setQuantityVoucherError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Hàm tải dữ liệu voucher từ API
    const fetchVoucher = async () => {
      try {
        const response = await fetch(`http://localhost:28017/vouchers/${id}`);
        console.log(id);
        const data = await response.json();
        console.log(data);  // Log dữ liệu trả về từ API
        if (response.ok) {
          setPriceReduced(data.price_reduced.toString());
          setDiscountCode(data.discount_code);
          setQuantityVoucher(data.quantity_voucher);
        } else {
          throw new Error('Không thể tải dữ liệu voucher');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra khi tải voucher');
        } else {
          Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải voucher');
        }
      }
    };
    
    fetchVoucher();
  }, [id]);

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

    // Dữ liệu gửi tới API để cập nhật voucher
    const updatedVoucher = {
      price_reduced: Number(priceReduced),
      discount_code: discountCode.trim(),
      quantity_voucher: quantityVoucher,
    };
    
    try {
      const response = await fetch(`http://localhost:28017/vouchers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVoucher),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Cập nhật voucher thành công');
        navigate("/admin/voucher");  // Quay lại danh sách voucher
      } else {
        throw new Error(data.message || 'Có lỗi xảy ra khi cập nhật voucher');
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
    navigate("/admin/voucher");  // Quay lại danh sách voucher
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chỉnh Sửa Voucher</Text>

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
        <Button title="Lưu" onPress={handleSubmit} color="#28a745" />
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
    borderColor: '#dc3545',
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
    color: '#dc3545',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default EditVoucher;
