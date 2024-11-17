export interface Product {
_id: any;
name: string;
imageUrl: any;
  id: number;            // Unique identifier for the product
  title: string;         // Title of the product
  price: number;         // Current price of the product
  previousPrice?: number; // Previous price of the product (optional)
  description: string;   // Description of the product
  category: string;      // Category of the product (e.g., phone)
  image: string;         // URL of the product image
  isNew: boolean;        // Indicates if the product is new
  brand: string;         // Brand of the product
  quantity: number;
 
}


