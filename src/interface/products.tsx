
import { Icategory } from "./category";

// Interface mô tả sản phẩm đầy đủ
export interface Iproduct {
    _id: string;          // ID mặc định của MongoDB
    owerId: number;       // ID chủ sở hữu
    statusPro?: boolean;  // Trạng thái sản phẩm
    price: number;        // Giá
    desPro?: string;      // Mô tả sản phẩm
    creatDatePro?: string; // Ngày tạo
    quantity: number;     // Số lượng
    listPro?: string;     // Danh mục phân loại
    imgPro?: string[];    // Hình ảnh
    namePro?: string;     // Tên sản phẩm
    cateId: number;       // ID danh mục
    brand?: string;       // Thương hiệu
}

// Đối với kiểu IProductLite, chỉ lấy những trường cần thiết
export type IProductLite = Pick<Iproduct, 'namePro' | 'imgPro' | 'price' | 'cateId'>;
