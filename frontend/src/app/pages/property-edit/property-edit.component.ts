import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
  id: number = 0;
  files: File[] | null = null;
  imagesId: number[] | undefined = undefined
  checkFiles: boolean = true;
  property: Property | undefined = undefined;
  propertyCreateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  oldImageIds: number[] = [];

  constructor(private propertyService: PropertyService, private routeActive: ActivatedRoute, private router: Router) {}
  
  get title() {
    return this.propertyCreateForm.get('title');
  }
  get description() {
    return this.propertyCreateForm.get('description');
  }
  get address() {
    return this.propertyCreateForm.get('address');
  }
  get price() {
    return this.propertyCreateForm.get('price');
  }

  ngOnInit(): void {
    this.routeActive.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.propertyService.get(this.id).subscribe({
      next: (property) => {
        this.property = property;
        
        property.property_images.forEach(image => {
          this.oldImageIds?.push(image.id)
        });

        var userId = +localStorage['userId'];
        
        if(this.property?.user.id != userId){
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => console.log(err),
    });
  }

  getFiles(event: any){
    this.files = event.target.files
  }

  edit(){
    this.propertyService.update(
      this.property?.id,
      this.title?.value,
      this.description?.value,
      this.price?.value,
      this.address?.value,
      this.files,
      this.oldImageIds
    ).subscribe({
      next: (value) => {
        this.router.navigateByUrl('/property-details/' + this.property?.id);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeImage(id: number){
    if(this.property?.property_images && this.oldImageIds){
      this.property.property_images = this.property?.property_images.filter((image) => {
        return image.id !== id;
      })

      this.oldImageIds = this.oldImageIds.filter((oldId) => {
        return oldId !== id;
      })

    }
  }
}
