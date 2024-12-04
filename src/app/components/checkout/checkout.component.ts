// src/app/components/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
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
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  totalAmount: number;
  orderId: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  loading = false;
  error = '';
  totalAmount = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      shippingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
      }),
      paymentInfo: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
      })
    });
  }

  ngOnInit(): void {
    // Subscribe to cart items to get total amount
    this.cartService.getCartItems().subscribe(items => {
      this.totalAmount = items.reduce((total, item) => 
        total + (item.product.price * item.quantity), 0);
      
      // Redirect to cart if empty
      if (this.totalAmount === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.invalid) {
      this.markFormGroupTouched(this.checkoutForm);
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      // Process payment
      await this.simulatePayment();

      // Create order details
      const orderDetails: OrderDetails = {
        ...this.checkoutForm.value,
        totalAmount: this.totalAmount,
        orderId: this.generateOrderId()
      };

      // Clear cart
      await this.cartService.clearCart();

      // Show success message
      alert('Order placed successfully! Thank you for your purchase.');
      
      // Redirect to home page
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Checkout error:', err);
      this.error = 'An error occurred during checkout. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private simulatePayment(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Payment failed'));
        }
      }, 2000);
    });
  }

  private generateOrderId(): string {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 9).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  getErrorMessage(controlName: string, groupName?: string): string {
    const control = groupName 
      ? this.checkoutForm.get(`${groupName}.${controlName}`)
      : this.checkoutForm.get(controlName);

    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) {
      switch (controlName) {
        case 'zipCode': return 'Please enter a valid ZIP code';
        case 'cardNumber': return 'Please enter a valid 16-digit card number';
        case 'expiryDate': return 'Please enter a valid expiry date (MM/YY)';
        case 'cvv': return 'Please enter a valid CVV';
        default: return 'Invalid format';
      }
    }
    return 'Invalid value';
  }
}
