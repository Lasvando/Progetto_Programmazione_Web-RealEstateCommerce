import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {

  @Input() amount: number | undefined;
  @Input() propertyId: number | undefined;

  constructor(private paymentService: PaymentService, private router: Router ) {}

  ngOnInit(): void {
    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        tagline: false
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount?.toString(),
                currency_code: 'EUR'
              }
            }
          ]
        })
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log(details)
          this.paymentService.create(details.id, this.propertyId).subscribe({
            next: (obj) => {
              this.router.navigate(['payment-confirmation'], { queryParams: { paymentId: details.id } });
            },
            error: (err) => {
              console.log(err)
            }
          });
        })
      },
      onError: (error: any) => {
        console.log(error)
      }
    }
    ).render(this.paymentRef.nativeElement)
  }

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
}
