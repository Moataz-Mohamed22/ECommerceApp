import { v4 as uuidv4 } from 'uuid';

export interface ICart {
  id: string;
  cartItems: ICartItem[];
}

export interface ICartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
  description:string;
}

export class Cart implements ICart {
  id: string = uuidv4();
  cartItems: ICartItem[] = [];
}
