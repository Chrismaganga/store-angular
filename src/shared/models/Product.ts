export interface Product {
  id: number;
  title: string;
  name: string;
  price: number;
  previousPrice?: number;
  description: string;
  category: string;
  image: string;
  imageUrl?: string;
  isNew: boolean;
  brand: string;
  quantity: number;
}
