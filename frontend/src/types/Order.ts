//one item 
export interface IOrderItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}
//whole cart
export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  total: number;
  address: string;
}