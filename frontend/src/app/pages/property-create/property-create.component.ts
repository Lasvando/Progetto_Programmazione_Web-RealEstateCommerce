import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

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
    if(this.files == undefined){
      this.checkFiles = false
      return
    }

    if(this.files != undefined && this.files.length <= 0){
      this.checkFiles = false
      return
    }
    console.log(this.files)
  }
}
