import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { QuitComponent } from './shared/quit/quit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ServicesInputsComponent } from './services-inputs/services-inputs.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PaddingPipe } from './pipes/padding.pipe';
import { TransactionNoteComponent } from './transaction-note/transaction-note.component';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { DailyUsesListComponent } from './daily-uses-list/daily-uses-list.component';
import { DailyUseFormComponent } from './daily-use-form/daily-use-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BusinessReportComponent } from './business-report/business-report.component';
import { BackupAndRestoreComponent } from './backup-and-restore/backup-and-restore.component';
import { AgGridModule } from 'ag-grid-angular';
import { NotificationComponent } from './shared/notification/notification.component';
import { ListAutoHeightDirective } from './directives/list-auto-height.directive';
import { FormAutoHeightDirective } from './directives/form-auto-height.directive';
import { TransactionFormAutoHeightDirective } from './directives/transaction-form-auto-height.directive';

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    QuitComponent,
    CategoriesListComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ServicesInputsComponent,
    NewMaterialComponent,
    EditMaterialComponent,
    MaterialsListComponent,
    SettingComponent,
    TransactionsListComponent,
    TransactionComponent,
    PaddingPipe,
    TransactionNoteComponent,
    DailyUsesListComponent,
    DailyUseFormComponent,
    BusinessReportComponent,
    BackupAndRestoreComponent,
    NotificationComponent,
    ListAutoHeightDirective,
    FormAutoHeightDirective,
    TransactionFormAutoHeightDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'id'
    },
    DatePipe,
    DecimalPipe,
    PaddingPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
