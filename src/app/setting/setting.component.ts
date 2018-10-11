import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  form:FormGroup;
  defaultValues:any;

  constructor(
    formBuilder: FormBuilder,
    public globalService: AppService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      printer_path: [null],
      printer_cpl: [null]
    });
  }

  ngOnInit() {
    this.defaultValues = this.globalService.loadClientSettings();
    this.form.patchValue(this.defaultValues);
  }

  submit() {
    this.globalService.saveClientSettings(this.form.value);
    if (this.form.value.printer_path) {
      this.globalService.sendToIpc('init-printer', this.form.value.printer_path);
    }
    this.router.navigate(['/']);
  }

  testPrinterPath() {
    this.globalService.sendToIpc('test-printer', {
      printerPath: this.form.value.printer_path,
      test: 'Tes printer berhasil.'
    });
  }

}
