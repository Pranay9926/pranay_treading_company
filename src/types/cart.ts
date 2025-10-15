import { type Shoe } from '@/lib/data';

export interface CartItem extends Shoe {
  quantity: number;
}
