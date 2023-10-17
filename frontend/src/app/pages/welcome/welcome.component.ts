import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  properties: Property[] | undefined = undefined

  constructor(private propertyService : PropertyService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.propertyService.getAll().subscribe({
      next: properties => this.properties = properties,
      error: err => console.log(err)
    })
  }
}
