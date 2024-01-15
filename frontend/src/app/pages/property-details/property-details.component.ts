import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { AuthService } from 'src/app/service/auth.service';
import { PaymentService } from 'src/app/service/payment.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  id: number = 0;
  property: Property | undefined = undefined;
  logged: boolean = false;
  depositAmount: number | undefined = undefined;
  alreadyBooked: boolean = false;
  myProperty: boolean = false;

  constructor(
    private propertyService: PropertyService,
    private routeActive: ActivatedRoute,
    private authService: AuthService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeActive.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.propertyService.get(this.id).subscribe({
      next: (property) => {
        this.property = property;
        if (this.property?.price)
          this.depositAmount = this.property?.price * 0.001;
        else this.depositAmount = 100;

        this.logged = this.authService.isLoggedIn();

        if(this.logged){
          this.paymentService.find(this.id).subscribe({
            next: (value) => {
              console.log(value);
              if(value)
                this.alreadyBooked = true;
            },
            error: (err) => {
              console.log(err)
            },
          });
          
          var userId = +localStorage['userId'];
          console.log(this.property?.user.id, userId)
          if(this.property?.user.id == userId){
            this.myProperty = true;
          }
        }
      },
      error: (err) => console.log(err),
    });
  }

  delete(){
    if(confirm("Are you sure?")){
      this.propertyService.delete(this.id).subscribe({
        next: (value) => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
