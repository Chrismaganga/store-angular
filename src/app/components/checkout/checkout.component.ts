// src/app/components/checkout/checkout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
    imports: [FormsModule],
})
export class CheckoutComponent {
  name: string = '';
  address: string = '';
  payment: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Process the checkout form (e.g., validate, store, etc.)
    // Navigate to the order confirmation page
    this.router.navigate(['/order-confirmation'], {
      state: { name: this.name, address: this.address }
    });
  }
}
