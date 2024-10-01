import { Icategory } from "./category";



export interface Iproduct{
    _id: string,
    name: string,
    img: string,
    price: number,
    category: Icategory,
}
export type IProductLite = Pick<Iproduct,'name'| 'img' | 'price'|'category' >