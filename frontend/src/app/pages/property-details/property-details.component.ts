import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { AuthService } from 'src/app/service/auth.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  id: number = 0;
  property: Property | undefined = undefined;

  constructor(
    private propertyService: PropertyService,
    private routeActive: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeActive.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.propertyService.get(this.id).subscribe({
      next: (property) => (this.property = property),
      error: (err) => console.log(err),
    });
  }

  book(){
    if(!this.authService.isLoggedIn()) this.router.navigateByUrl('/login')
  }
}
