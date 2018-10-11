import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaterialService } from '../services/material.service';
import { MaterialsService } from '../services/materials.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.scss']
})
export class NewMaterialComponent implements OnInit {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: MaterialService,
    private materialsService: MaterialsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.service.createMaterial(this.form.value).tap(() => this.materialsService.getMaterials());
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
