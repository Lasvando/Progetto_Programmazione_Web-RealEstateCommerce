import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css'],
})
export class PropertyCreateComponent {
  files: File[] | null = null;
  checkFiles: boolean = true;

  propertyCreateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(private propertyService: PropertyService, private router: Router) {}

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

  getFiles(event: any){
    this.files = event.target.files
  }

  create() {
    if(this.propertyCreateForm.invalid){
      alert("Inserire i dati richiesti")
      return;
    }

    if(this.files == undefined){
      this.checkFiles = false
      return
    }

    if(this.files != undefined && this.files.length <= 0){
      this.checkFiles = false
      return
    }

    this.propertyService.create(this.title?.value, this.description?.value, this.price?.value, this.address?.value, this.files).subscribe({
      next: (result) => this.router.navigateByUrl('/'),
      error: err => console.log(err)
    })
  }
}
