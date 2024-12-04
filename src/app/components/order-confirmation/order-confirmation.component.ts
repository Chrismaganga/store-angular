// src/app/components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface OrderDetails {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  totalAmount: number;
  orderId: string;
}

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: OrderDetails | null = null;
  error = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { orderDetails: OrderDetails } | undefined;

    if (state?.orderDetails) {
      this.orderDetails = state.orderDetails;
    } else {
      this.error = 'No order details found';
      setTimeout(() => this.router.navigate(['/cart']), 3000);
    }
  }

  continueShopping(): void {
    this.router.navigate(['/product-list']);
  }

  formatAddress(): string {
    if (!this.orderDetails) return '';
    const addr = this.orderDetails.shippingAddress;
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}`;
  }

  getEstimatedDelivery(): string {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 5));
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
