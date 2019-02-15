import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from '../../classes/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import { MaterialsService } from '../../services/materials.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class EditMaterialComponent implements OnInit {
  material: Material;
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: MaterialService,
    private materialsService: MaterialsService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getMaterial(params.id).then(material => {
        this.material = material;
        this.form.patchValue(this.material);
        this.form.markAsPristine();
      });
    });
  }

  submit() {
    this.service.updateMaterial(this.material.id, this.form.value).tap(() => {
      this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
      this.materialsService.getMaterials();
    this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

  delete() {
    if (window.confirm('Apakah anda yakin akan menghapus bahan ini?')) {
      this.service.deleteMaterial(this.material.id).tap(() => {
        this.notificationService.setNotification('Kategori berhasil dihapus.', 'success');
        this.materialsService.getMaterials();
        this.router.navigate(['..'], {relativeTo: this.route});
      });
    }
  }

}
