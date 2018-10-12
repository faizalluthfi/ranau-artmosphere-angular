import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Transaction } from '../classes/transaction';
import { TransactionService } from '../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../classes/category';
import { CategoriesWithServicesService } from '../services/categories-with-services.service';
import { Subscription } from 'rxjs';
import { Service } from '../classes/service';
import { TransactionItem } from '../classes/transaction-item';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  transaction: Transaction;
  items: FormArray;
  itemsServicesIds: number[] = [];
  category: Category;
  categories: Category[];
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: TransactionService,
    private categoriesWithServicesService: CategoriesWithServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transaction = new Transaction();
    
    this.form = formBuilder.group({
      items: formBuilder.array([])
    });
    this.items = <FormArray>this.form.controls.items;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.categoriesWithServicesService.categories.subscribe(categories => {
        if (categories.length > 0) this.category = categories[0];
        this.categories = categories
      })
    );
    this.route.params.subscribe(params => {
      this.itemsServicesIds = [];
      while (this.items.length > 0) this.items.removeAt(0);
      this.form.reset();

      if (params.id) {
        this.service.getTransaction(params.id).then(transaction => {
          transaction.items.forEach(item => {
            this.itemsServicesIds.push(item.id);
            this.items.push(this.formBuilder.group({
              id: [item.id],
              service_id: [null, Validators.required],
              nominal: [null, Validators.compose([Validators.required, Validators.min(1)])],
              deleted: [item.deleted]
            }));
          });
          this.form.patchValue(transaction);
          this.transaction = transaction;
        });
      } else {
        this.transaction = new Transaction();
      }
    });
    this.categoriesWithServicesService.loadCategories();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addItem(service: Service) {
    if (!this.itemsServicesIds.includes(service.id)) {
      let item = new TransactionItem();
      item.service = service;
      this.transaction.items.push(item);
      this.items.push(this.formBuilder.group({
        service_id: [service.id, Validators.required],
        nominal: [service.price, Validators.required],
        deleted: [null]
      }));
    }
  }

  removeItem(i: number) {
    if (window.confirm('Apakah anda yakin ingin menghapus item ini?')) {
      if (this.transaction.items[i].id) {
        (<FormGroup>this.items.controls[i]).controls.deleted.setValue(true);
      } else {
        this.transaction.items.splice(i, 1);
        this.itemsServicesIds.splice(i, 1);
        this.items.removeAt(i);
      }
    }
  }

  submit() {
    if (this.transaction.id) {
      this.service.updateTransaction(this.transaction.id, this.form.value)
        .tap(() => this.router.navigate(['..'], {relativeTo: this.route}));
    } else {
      this.service.createTransaction(this.form.value)
        .tap(() => this.router.navigate(['..'], {relativeTo: this.route}));
    }
  }

}
