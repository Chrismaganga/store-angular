// src/app/components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent implements OnInit {
  name: string = '';
  address: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { name: string; address: string };
    this.name = state?.name ?? 'Customer';
    this.address = state?.address ?? 'your provided address';
  }
}

