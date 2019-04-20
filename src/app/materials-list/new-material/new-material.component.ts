import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import { MaterialsService } from '../../services/materials.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.scss']
})
export class NewMaterialComponent implements OnInit {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private appService: AppService,
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
  }

  submit() {
    this.service.createMaterial(this.form.value).tap(() => {
      this.appService.sendToIpc('backup');
      this.notificationService.setNotification('Kategori berhasil disimpan.', 'success');
      this.materialsService.getMaterials();
      this.router.navigate(['..'], {relativeTo: this.route});
    });
  }

}
