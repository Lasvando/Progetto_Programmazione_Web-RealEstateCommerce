import { Component, Input, OnInit } from '@angular/core';
import { PropertyImage } from 'src/app/models/PropertyImage';

@Component({
  selector: 'app-property-image-carousel',
  templateUrl: './property-image-carousel.component.html',
  styleUrls: ['./property-image-carousel.component.css'],
})
export class PropertyImageCarouselComponent implements OnInit {
  @Input({ alias: 'property-id' }) propertyId: number | undefined = undefined;
  @Input({ alias: 'property-link' }) propertyImageLink: PropertyImage[] | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}
}
