import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  transactions: Transaction[] | undefined = undefined
  
  constructor(private paymentService: PaymentService){}

  ngOnInit(): void {
    this.paymentService.findAll().subscribe({
      next: val => {
        this.transactions = val
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
