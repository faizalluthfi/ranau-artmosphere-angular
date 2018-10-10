import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-services-inputs',
  templateUrl: './services-inputs.component.html',
  styleUrls: ['./services-inputs.component.scss']
})
export class ServicesInputsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() id: number;

  notDeletedAccount: number = 0;
  deletedCount: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.countServices();
  }

  addService() {
    (<FormArray>this.form.controls.services).push(
      this.formBuilder.group({
        id: [null],
        name: [null, Validators.required],
        deleted: [null]
      })
    );
    this.countServices();
    console.log(this.form);
  }

  removeService(i: number) {
    let services: FormArray = <FormArray>this.form.controls.services;

    if (this.id) {
      (<FormGroup>services.controls[i]).controls.deleted.setValue(true);
    } else {
      services.removeAt(i);
    }

    this.countServices()
  }

  countServices() {
    this.deletedCount = 0;
    const controls = (<FormArray>this.form.controls.services).controls;
    controls.forEach(group => this.deletedCount += group.value.deleted ? 1 : 0);
    this.notDeletedAccount = controls.length - this.deletedCount;
  }

}
