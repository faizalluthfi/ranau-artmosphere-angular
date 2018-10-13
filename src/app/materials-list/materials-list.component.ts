import { Component, OnInit } from '@angular/core';
import { Material } from '../classes/material';
import { MaterialsService } from '../services/materials.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
  materials: Material[];
  subscriptions: Subscription[] = [];

  constructor(private materialsService: MaterialsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.materialsService.materials.subscribe(materials => {
        this.materials = materials;
      })
    ]);
    this.materialsService.getMaterials();
  }

}
