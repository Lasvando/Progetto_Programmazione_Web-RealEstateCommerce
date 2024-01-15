import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymant-confirmation',
  templateUrl: './paymant-confirmation.component.html',
  styleUrls: ['./paymant-confirmation.component.css']
})
export class PaymantConfirmationComponent implements OnInit {
  paymentId: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'];
      console.log(this.paymentId);
    });
  }
}
