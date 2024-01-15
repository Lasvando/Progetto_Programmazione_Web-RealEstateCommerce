import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  properties: Property[] | undefined = undefined 
  routeAlert: string | undefined = undefined

  constructor(private propertyService : PropertyService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.routeAlert = params['routeAlert'];
    });
    this.getAll();
  }

  getAll(){
    this.propertyService.getAll().subscribe({
      next: properties => this.properties = properties,
      error: err => console.log(err)
    })
  }
}
