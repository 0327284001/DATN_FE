import mongoose, { Document } from "mongoose";
import { Icategory } from "./category"; // Đảm bảo rằng bạn đã khai báo ICategory đúng

// Interface mô tả sản phẩm đầy đủ
export interface Iproduct extends Document {
    _id: string;                             // ID mặc định của MongoDB
    owerId: mongoose.Schema.Types.ObjectId; // ID chủ sở hữu (đã sửa lại từ owerId)
    statusPro?: boolean;                     // Trạng thái sản phẩm (Còn hàng hay hết hàng)
    price: number;                           // Giá
    desPro?: string;                         // Mô tả sản phẩm
    creatDatePro?: string;                   // Ngày tạo
    quantity: number;                        // Số lượng
    listPro?: string;                        // Danh mục phân loại (có thể là tên hoặc ID của danh mục)
    imgPro?: string[];       // imgPro có thể là chuỗi, mảng chuỗi hoặc null                      // Hình ảnh sản phẩm (danh sách URL)
    namePro: string;                         // Tên sản phẩm
    cateId: mongoose.Schema.Types.ObjectId;  // ID danh mục
    brand?: string;                          // Thương hiệu
}

// Đối với kiểu IProductLite, chỉ lấy những trường cần thiết
export type IProductLite = Pick<Iproduct, 'namePro' | 'imgPro' | 'price' | 'cateId'>;
